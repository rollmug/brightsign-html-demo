import './styles.css';

const result = document.getElementById('result');
const elements = document.querySelectorAll(".udp-sender");

elements.forEach(element => {
    const command = element.getAttribute('data-command');
    element.addEventListener('click', (e) => {
        fetch(`/udp/${command}`)
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
});