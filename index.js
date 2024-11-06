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

const imagesData = {
    "items": [
        {
            "title": "Lorem ipsum dolor sit amet",
            "description": "Consectetur adipiscing elit",
            "fileName": "image-1.jpeg"
        },
        {
            "title": "Sed do eiusmod tempor",
            "description": "Incididunt ut labore et dolore",
            "fileName": "image-2.jpeg"
        },
        {
            "title": "Magna aliqua ut enim",
            "description": "Ad minim veniam quis nostrud",
            "fileName": "image-3.jpeg"
        },
        {
            "title": "Exercitation ullamco laboris",
            "description": "Nisi ut aliquip ex ea commodo",
            "fileName": "image-4.jpeg"
        },
        {
            "title": "Consequat duis aute irure",
            "description": "Dolor in reprehenderit in voluptate",
            "fileName": "image-5.jpeg"
        },
        {
            "title": "Velit esse cillum dolore",
            "description": "Eu fugiat nulla pariatur",
            "fileName": "image-6.jpeg"
        },
        {
            "title": "Excepteur sint occaecat",
            "description": "Cupidatat non proident sunt",
            "fileName": "image-7.jpeg"
        },
        {
            "title": "In culpa qui officia",
            "description": "Deserunt mollit anim id est",
            "fileName": "image-8.jpeg"
        },
        {
            "title": "Laborum sed ut perspiciatis",
            "description": "Unde omnis iste natus error",
            "fileName": "image-9.jpeg"
        },
        {
            "title": "Sit voluptatem accusantium",
            "description": "Doloremque laudantium totam",
            "fileName": "image-10.jpeg"
        },
        {
            "title": "Rem aperiam eaque ipsa",
            "description": "Quae ab illo inventore veritatis",
            "fileName": "image-11.jpeg"
        },
        {
            "title": "Et quasi architecto beatae",
            "description": "Vitae dicta sunt explicabo",
            "fileName": "image-12.jpeg"
        }
    ]
};

app.get('/', async (req, res) => {
    try {
        // let dataJSON = await fs.readFile('./public/data.json');
        // const data = JSON.parse(imagesData);
        const data = imagesData;
        res.render('index', { title: 'Node Express App', items: data.items });
    } catch (error) {
        console.error(error);
        res.status(400).render('error', { message: `An error occurred while reading the JSON data: ${error.message}` });
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
