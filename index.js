const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;
const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const fs = require('fs').promises;

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.set('views', './views');

app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        let dataJSON = await fs.readFile('./public/data.json');
        const data = JSON.parse(dataJSON);
        res.render('index', { title: 'Node Express App', items: data.items });
    } catch (error) {
        console.error(error);
        res.status(500).send(`An error occurred while reading the JSON data: ${error.message}`);
    }
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
