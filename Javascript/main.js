
// Function to login.
$(document).ready(function()
{
    // Home page
    $('#homePageLoginLink').on('click', function(event)
    {
        event.preventDefault();
        $('#loginForm').show();
    });
    $('#cancelLoginHomePage').on('click', function()
    {
        $('#loginForm').hide(); // Hide the login form
        window.location.href = 'index.html'; // Redirect to the home page
    });

    // About us page
    $('#aboutUsLoginLink').on('click', function(event)
    {
        event.preventDefault();
        $('#aboutUsContent').hide();// Hide the about us content
        $('#aboutUsLoginForm').show();// Show the login form
    });
    $('#cancelLogin').on('click', function()
    {
        $('#aboutUsLoginForm').hide(); // Hide the login form
        $('#aboutUsContent').show(); // Show the about us content
    });
});


$('#loginForm').on('submit', function(e)
{
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        if (username === 'user1' && password === 'passAdmin01#')
        {
            sessionStorage.setItem('authenticated', 'true');
            window.location.href = 'questionnaire.html';
        } else
        {
            $('#errorMessage').text('Invalid username or password!');
        }
    });
    
    $('#logout').on('click', function()
    {
        sessionStorage.removeItem('authenticated');
        window.location.href = 'index.html';
    });

    var quizAnswers = {};

function validateRadioSelection() {
    document.querySelectorAll('input[type="radio"]').forEach(function(input) {
        input.addEventListener('change', function() {
            var currentValue = input.value;
            document.querySelectorAll('input[type="radio"]').forEach(function(otherInput)
            {
                if (otherInput !== input && otherInput.value === currentValue) {
                    otherInput.checked = false;
                }
            });
        });
    });
}

window.onload = function() {
    validateRadioSelection();
};

function user_input(pageNumber) {
    

    //using JQuery instead of document.querySelector
    var selectedOptions = [];
    var opt_a = $('input[name="opt_a"]:checked').val();
    var opt_b = $('input[name="opt_b"]:checked').val();
    var opt_c = $('input[name="opt_c"]:checked').val();
    var opt_d = $('input[name="opt_d"]:checked').val();

    if (opt_a && opt_b && opt_c && opt_d) {
        selectedOptions.push(opt_a);
        selectedOptions.push(opt_b);
        selectedOptions.push(opt_c);
        selectedOptions.push(opt_d);

        quizAnswers['q' + pageNumber] = selectedOptions;

        var cache = window.sessionStorage;
        var existingAnswers = JSON.parse(cache.getItem("quizAnswers")) || {};
        var mergedAnswers = { ...existingAnswers, ...quizAnswers };
        cache.setItem("quizAnswers", JSON.stringify(mergedAnswers));
        return true;
    } else {
        alert('Please select an option for all questions.');
        return false;
    }
}

// Function to advance to the next page.
function goForward(pageNumber) {
    if (user_input(pageNumber)) {
        // Redirects to the next page.
        var nextPage = pageNumber + 1;
        if(nextPage == 12){
            window.location.href = 'results.html'
        }
        else{
        window.location.href = 'q' + nextPage + '.html'; 
        }
    }
}
