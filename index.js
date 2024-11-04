const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;
const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const fs = require('fs');

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.set('views', './views');

app.use(express.static(__dirname + "/public"));
app.use(express.json());

let dataJSON = fs.readFileSync('./public/data.json');
// console.log(JSON.parse(dataJSON));

app.get('/', (req, res) => {
    const data = JSON.parse(dataJSON);
    res.render('index', { title: 'My Express App', items: data.items });
});

app.get('/udp/:command', (req, res) => {
    const command = req.params.command;
    const destination = process.env.UDP_SERVER || 'localhost';
    const port = process.env.UDP_PORT || 5000;

    try {
        client.send(command, port, destination, (err) => {
            if (err) {
                console.error(err);
                res.json({ message: 'UDP message failed' });
                return;
            }

            console.log('Message sent!');
            res.json({ message: `UDP message sent successfully over port ${port} with command: ${command}` });
        });
    } catch (error) {
        console.error(error);
        res.json({ message: `An error occurred while sending the UDP message: ${error.message}` });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
