/////////////////////////////////////////////// Login Script ///////////////////////////////////////////////

var quizAnswers = JSON.parse(window.sessionStorage.getItem("quizAnswers")) || {};

// Script for handling login
$(document).ready(function() {
    // Event handler for login link on home page
    $('#homePageLoginLink').on('click', function(event) {
        event.preventDefault();
        $('#loginForm').show();
    });

    // Event handler for cancel login on home page
    $('#cancelLoginHomePage').on('click', function() {
        $('#loginForm').hide();
        window.location.href = 'index.html';
    });

    // Event handler for login link on about us page
    $('#aboutUsLoginLink').on('click', function(event) {
        event.preventDefault();
        $('#aboutUsContent').hide();
        $('#aboutUsLoginForm').show();
    });

    // Event handler for cancel login on about us page
    $('#cancelLogin').on('click', function() {
        $('#aboutUsLoginForm').hide();
        $('#aboutUsContent').show();
    });

    // Event handler for logout
    $('#logout').on('click', function() {
        sessionStorage.removeItem('authenticated');
        window.location.href = '../index.html';
    });
});

// Function for handling login submission
function handleSubmit(event) {
    event.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val();

    if (username === 'user1' && password === 'passAdmin01#') {
        window.location.href = 'Content/questionnaire.html'; // Link alterado do 
    } else {
        $('#errorMessage').text('Invalid Username or Password!');
    }
}


/////////////////////////////////////////////// Questionnaire Script ///////////////////////////////////////////////

// Function to validate radio buttons
function validateRadioSelection() {
    document.querySelectorAll('input[type="radio"]').forEach(function(input) {
        input.addEventListener('change', function() {
            var currentValue = input.value;
            document.querySelectorAll('input[type="radio"]').forEach(function(otherInput) {
                if (otherInput !== input && otherInput.value === currentValue) {
                    otherInput.checked = false;
                }
            });
        });
    });
}

window.onload = function() 
{
    validateRadioSelection();
};

// Function for handling user input for the questionnaire
function user_input(pageNumber) {
    var selectedOptions = [];
    var opt_a = $('input[name="opt_a"]:checked').val();
    var opt_b = $('input[name="opt_b"]:checked').val();
    var opt_c = $('input[name="opt_c"]:checked').val();
    var opt_d = $('input[name="opt_d"]:checked').val();

    if (opt_a && opt_b && opt_c && opt_d) {
        selectedOptions.push(parseInt(opt_a, 10));
        selectedOptions.push(parseInt(opt_b, 10));
        selectedOptions.push(parseInt(opt_c, 10));
        selectedOptions.push(parseInt(opt_d, 10));

        var cache = window.sessionStorage;
        var existingAnswers = JSON.parse(cache.getItem("quizAnswers")) || {};
        existingAnswers['q' + pageNumber] = selectedOptions;
        cache.setItem("quizAnswers", JSON.stringify(existingAnswers));
        return true;
    } else {
        alert('Please select an option for all questions.');
        return false;
    }
}

// Function to advance to the next page of the questionnaire
function goForward(pageNumber) {
    if (user_input(pageNumber)) {
        var nextPage = pageNumber + 1;
        if (nextPage == 12) {
            window.location.href = 'results.html';
        } else {
            window.location.href = 'q' + nextPage + '.html';
        }
    }
}


/////////////////////////////////////////////// Result Script ///////////////////////////////////////////////

// Function to apply color to links
function applyColorToLinks() {
    var links = document.querySelectorAll('#topColors a');
    links.forEach(function(link) {
        var colorWord = link.textContent.match(/is (\w+)/)[1];
        switch (colorWord.toLowerCase()) {
            case 'orange':
                link.style.color = 'orange';
                break;
            case 'green':
                link.style.color = 'green';
                break;
            case 'blue':
                link.style.color = 'blue';
                break;
            case 'gold':
                link.style.color = 'gold';
                break;
        }
    });
}

// Function to fill up the results table
function fillUpTable() {
    var somaA = 0;
    var somaB = 0;
    var somaC = 0;
    var somaD = 0;

    // Loop through quizAnswers and calculate the sums
    for (var i = 1; i <= Object.keys(quizAnswers).length; i++) {
        // Acessando as respostas da página i
        var answersPage = quizAnswers['q' + i];

        // Verifying if the answers exist
        if (answersPage) 
        {
            // Associating each answer to a variable
            var answerA = answersPage[0];
            somaA += answerA || 0;

            var answerB = answersPage[1];
            somaB += answerB || 0;

            var answerC = answersPage[2];
            somaC += answerC || 0;

            var answerD = answersPage[3];
            somaD += answerD || 0;

            // Updating table cells with individual answers
            document.getElementById('varA' + i).textContent = answerA || '-';
            document.getElementById('varB' + i).textContent = answerB || '-';
            document.getElementById('varC' + i).textContent = answerC || '-';
            document.getElementById('varD' + i).textContent = answerD || '-';
        }
    }

    // Fill the total values in the table
    document.getElementById('totalA').textContent = somaA;
    document.getElementById('totalB').textContent = somaB;
    document.getElementById('totalC').textContent = somaC;
    document.getElementById('totalD').textContent = somaD;


    var pageSums = [
        { page: 'A_blue.html', sum: somaC },
        { page: 'A_gold.html', sum: somaD },
        { page: 'A_green.html', sum: somaB },
        { page: 'A_orange.html', sum: somaA }
    ];

    // Sort the pageSums array in descending order based on sum values
    pageSums.sort(function(a, b) { return b.sum - a.sum; });

    var topPages = pageSums.slice(0, 2);

    // Display links to the two pages with the highest sum values
    for (var i = 0; i < topPages.length; i++) {
        var pageName = topPages[i].page;
        var color = pageName.split('_')[1].split('.')[0];
        var linkText = 'Your ' + (i === 0 ? 'first' : 'second') + ' color is ' + color.charAt(0).toUpperCase() + color.slice(1);
        var link = '<a href="' + pageName + '">' + linkText + '</a><br><br>';

        // Append the link to the specified element in result.html
        document.getElementById('topColors').innerHTML += link;
    }
    applyColorToLinks();
}

// Call the fillUpTable function when the results page is loaded
$(document).ready(function() {
    if (window.location.pathname.includes('results.html')) {
        fillUpTable();
    }

    $('#redoTest').click(function() {
        // clean up the session storage
        sessionStorage.removeItem('quizAnswers');
        // redirect to the first question
        window.location.href = 'q1.html';
    });
});
