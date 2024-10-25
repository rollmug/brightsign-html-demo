const express = require('express');
const app = express();
const port = 3000;

const dgram = require('node:dgram');
const client = dgram.createSocket('udp4');

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/js"));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/', (req, res) => {
    // Send a message to the UDP server
    const message="Button clicked on the client!";
    const destination = 'localhost';
    const port = 8080;

    client.send(message, port, destination, (err) => {
        if (err) {
            console.error(err);
            res.json({ message: 'UDP message failed' });
        }

        console.log('Message sent!');
        res.json({ message: 'UDP message sent successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
