var quizAnswers = {};

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
    var opt_a = document.querySelector('input[name="opt_a"]:checked');
    var opt_b = document.querySelector('input[name="opt_b"]:checked');
    var opt_c = document.querySelector('input[name="opt_c"]:checked');
    var opt_d = document.querySelector('input[name="opt_d"]:checked');

    if (opt_a && opt_b && opt_c && opt_d) {
        selectedOptions.push(opt_a.value);
        selectedOptions.push(opt_b.value);
        selectedOptions.push(opt_c.value);
        selectedOptions.push(opt_d.value);

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
        window.location.href = 'q' + nextPage + '.html'; 
    }
}
