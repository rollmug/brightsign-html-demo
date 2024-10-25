import './styles.css';

const button = document.getElementById('test-button');
const result = document.getElementById('result');

button.addEventListener('click', () => {
    fetch('/', {
        method: 'POST', // Or 'GET' depending on your needs
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            console.log(data);
            result.innerHTML = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
            result.innerHTML = 'An error occurred';
        });
});