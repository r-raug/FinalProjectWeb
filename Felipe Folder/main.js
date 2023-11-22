$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        
        if (username === 'user1' && password === 'passAdmin01#') {
            sessionStorage.setItem('authenticated', 'true');
            window.location.href = 'questionnaire.html';
        } else {
            $('#errorMessage').text('Invalid username or password!');
        }
    });
    
    $('#logout').on('click', function() {
        sessionStorage.removeItem('authenticated');
        window.location.href = 'index.html';
    });
});
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Para prevenir o recarregamento da página
    // Aqui você teria seu código para validar o login
});
document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        
        // Aqui você deveria verificar as credenciais do usuário
        if (username === 'user' && password === 'pass') { // Exemplo simples de verificação
            sessionStorage.setItem('authenticated', 'true');
            window.location.href = 'home.html'; // Redirecione para a página principal após o login
        } else {
            document.getElementById('errorMessage').textContent = 'Invalid username or password!';
        }
    });
});