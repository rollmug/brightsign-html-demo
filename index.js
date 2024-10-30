const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/js"));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/udp/:command', (req, res) => {
    const command = req.params.command;
    const destination = process.env.UDP_SERVER;
    const port = process.env.UDP_PORT;

    try {
        client.send(command, port, destination, (err) => {
            if (err) {
                console.error(err);
                res.json({ message: 'UDP message failed' });
                return;
            }

            console.log('Message sent!');
            res.json({ message: `UDP message sent successfully with command: ${command}` });
        });
    } catch (error) {
        console.error(error);
        res.json({ message: `An error occurred while sending the UDP message: ${error.message}` });
        // res.json({ message: 'An error occurred while sending the UDP message' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
