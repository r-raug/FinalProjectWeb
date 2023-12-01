var quizAnswers = JSON.parse(window.sessionStorage.getItem("quizAnswers")) || {};

$(document).ready(function() {
    $('#homePageLoginLink').on('click', function(event) {
        event.preventDefault();
        $('#loginForm').show();
    });

    $('#cancelLoginHomePage').on('click', function() {
        $('#loginForm').hide();
        window.location.href = 'index.html';
    });

    $('#aboutUsLoginLink').on('click', function(event) {
        event.preventDefault();
        $('#aboutUsContent').hide();
        $('#aboutUsLoginForm').show();
    });

    $('#cancelLogin').on('click', function() {
        $('#aboutUsLoginForm').hide();
        $('#aboutUsContent').show();
    });

    $('#logout').on('click', function() {
        sessionStorage.removeItem('authenticated');
        window.location.href = '../index.html';
    });
});

function handleSubmit(event) {
    event.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val();

    if (username === 'user1' && password === 'passAdmin01#') {
        window.location.href = 'file:///E:/DEV/FinalProjectWeb1/Content/questionnaire.html';
    } else {
        $('#errorMessage').text('Invalid Username or Password!');
    }
}

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

window.onload = function() {
    validateRadioSelection();
};

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

function fillUpTable() {
    var somaA = 0;
    var somaB = 0;
    var somaC = 0;
    var somaD = 0;

    for (var i = 1; i <= Object.keys(quizAnswers).length; i++) {
        var answersPage = quizAnswers['q' + i];

        if (answersPage) {
            var answerA = answersPage[0];
            somaA += answerA || 0;

            var answerB = answersPage[1];
            somaB += answerB || 0;

            var answerC = answersPage[2];
            somaC += answerC || 0;

            var answerD = answersPage[3];
            somaD += answerD || 0;

            document.getElementById('varA' + i).textContent = answerA || '-';
            document.getElementById('varB' + i).textContent = answerB || '-';
            document.getElementById('varC' + i).textContent = answerC || '-';
            document.getElementById('varD' + i).textContent = answerD || '-';
        }
    }

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

    pageSums.sort(function(a, b) { return b.sum - a.sum; });

    var topPages = pageSums.slice(0, 2);

    for (var i = 0; i < topPages.length; i++) {
        var pageName = topPages[i].page;
        var color = pageName.split('_')[1].split('.')[0];
        var linkText = 'Your ' + (i === 0 ? 'first' : 'second') + ' color is ' + color.charAt(0).toUpperCase() + color.slice(1);
        var link = '<a href="' + pageName + '">' + linkText + '</a><br><br>';

        document.getElementById('topColors').innerHTML += link;
    }
}

$(document).ready(function() {
    if (window.location.pathname.includes('results.html')) {
        fillUpTable();
    }
});
