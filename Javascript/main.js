/////////////////////////////////////////////// Login Script ///////////////////////////////////////////////
// Function to login.
$(document).ready(function()
{
    // Home page
    $('#homePageLoginLink').on('click', function(event)
    {
        event.preventDefault();
        console.log('Login link clicked');
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

function handleSubmit(event)
{
    event.preventDefault(); // Prevent the form from submitting

    var username = $('#username').val();
    var password = $('#password').val();

    if (username === 'user1' && password === 'passAdmin01#')
    {
        window.location.href = 'file:///E:/DEV/FinalProjectWeb1/Content/questionnaire.html';
    }
    else
    {
        $('#errorMessage').text('Invalid Username or Password!');
    }
}

//Logout function
$(document).ready(function()
{
    $('#logout').on('click', function()
    {
        console.log('Logout link clicked');
        sessionStorage.removeItem('authenticated');
        window.location.href = '../index.html'; 
    });
});





/////////////////////////////////////////////// Questionnaire Script ///////////////////////////////////////////////

// Validation for the radio buttons
function validateRadioSelection()
{
    document.querySelectorAll('input[type="radio"]').forEach(function(input)
    {
        input.addEventListener('change', function()
        {
            var currentValue = input.value;
            document.querySelectorAll('input[type="radio"]').forEach(function(otherInput)
            {
                if (otherInput !== input && otherInput.value === currentValue)
                {
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

function user_input(pageNumber)
{
    //using JQuery instead of document.querySelector
    var selectedOptions = [];
    var opt_a = $('input[name="opt_a"]:checked').val();
    var opt_b = $('input[name="opt_b"]:checked').val();
    var opt_c = $('input[name="opt_c"]:checked').val();
    var opt_d = $('input[name="opt_d"]:checked').val();

    if (opt_a && opt_b && opt_c && opt_d)
    {
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
    }
    else
    {
        alert('Please select an option for all questions.');
        return false;
    }
}

// Function to advance to the next page.
function goForward(pageNumber)
{
    if (user_input(pageNumber))
    {
        // Redirects to the next page.
        var nextPage = pageNumber + 1;
        if(nextPage == 12)
        {
            window.location.href = 'results.html'
        }
        else
        {
        window.location.href = 'q' + nextPage + '.html'; 
        }
    }
}




/////////////////////////////////////////////// Results Script ///////////////////////////////////////////////
// Script for Result page by Diego

var cache = window.sessionStorage;
var quizAnswers = JSON.parse(cache.getItem("quizAnswers"));

var somaA = 0;
var somaB = 0;
var somaC = 0;
var somaD = 0;


//fillUpTable();

document.getElementById('totalA').textContent = somaA;
document.getElementById('totalB').textContent = somaB;
document.getElementById('totalC').textContent = somaC;
document.getElementById('totalD').textContent = somaD;

document.getElementById("somaAId").textContent = "a. Orange: " + somaA;
document.getElementById("somaBId").textContent = "b. Green: " + somaB;
document.getElementById("somaCId").textContent = "c. Blue: " + somaC;
document.getElementById("somaDId").textContent = "d. Gold: " + somaD;


// ... (seu código existente para calcular os resultados)

// Obter as células da última linha
var totalAElement = document.getElementById("totalA");
var totalBElement = document.getElementById("totalB");
var totalCElement = document.getElementById("totalC");
var totalDElement = document.getElementById("totalD");

// Criar um array para armazenar os valores das células
var resultados = [
    { label: "A", value: somaA },
    { label: "B", value: somaB },
    { label: "C", value: somaC },
    { label: "D", value: somaD }
];

// Ordenar o array de resultados em ordem decrescente
resultados.sort(function(a, b) {return b.value - a.value;});

// Destacar as duas colunas com os maiores resultados
for (var i = 0; i < resultados.length; i++)
{
    var label = resultados[i].label;
    var value = resultados[i].value;

    // Adicionar uma classe de destaque às duas colunas com os maiores resultados
    if (i < 2)
    {
        document.getElementById('var' + label + '1').classList.add('destaque');
    }

    // Atualizar os valores na última linha da tabela
    document.getElementById('total' + label).textContent = value;
}

// Adicionar uma classe de destaque às células da última linha
totalAElement.classList.add('destaque');
totalBElement.classList.add('destaque');
totalCElement.classList.add('destaque');
totalDElement.classList.add('destaque');



	fillUpTable()
	{
		for (var i = 1; i <= Object.keys(quizAnswers).length; i++) 
		{
			// Acessando as respostas da página i
			var answersPage = quizAnswers['q' + i];

			// Associando cada resposta a uma variável
			var answerA = answersPage[0];
			somaA = somaA + answerA;

			var answerB = answersPage[1];
			somaB = somaB + answerB;

			var answerC = answersPage[2];
			somaC = somaC + answerC;

			var answerD = answersPage[3];
			somaD = somaD + answerD;

			// T
	
			document.getElementById('varA' + i).textContent = answerA;
			document.getElementById('varB' + i).textContent = answerB;
			document.getElementById('varC' + i).textContent = answerC;
			document.getElementById('varD' + i).textContent = answerD;
		}

	}

   
   