const express = require('express');
const { Client } = require('whatsapp-web.js');
const bodyParser = require('body-parser');
import cors from "cors";

const app = express();
app.use(cors());
const port = 4000;

app.use(bodyParser.json());

const client = new Client();

client.on('qr', (qr) => {
    
    app.get('/qr', (req, res) => {
        res.send(qr);
    });
});


client.on('ready', () => {
    console.log('Client is ready!');

    app.post('/send', async (req, res) => {
        const { phone, message } = req.body;
        const chatId = `${phone}@c.us`;

        console.log({ chatId: chatId, message: message });

        client.sendMessage(chatId, message).then(() => {
            res.json({ success: 'Message sent successfully' });
        }).catch((error) => {
            res.json({ errorp: 'Error sending message' + error });
        });
    });
});

client.initialize();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
