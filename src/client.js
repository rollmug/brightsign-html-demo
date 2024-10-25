import './styles.css';

const result = document.getElementById('result');
const elements = document.querySelectorAll(".udp-sender");

for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', (e) => {
        const command = e.target.dataset.command;
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
}