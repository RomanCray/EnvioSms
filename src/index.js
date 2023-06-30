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
    
    app.get('/qr',async (req, res) => {
        try {
            await res.send(qr);   
        } catch (error) {
            console.log('qr: ' + error)
        }        
    });
});

client.on('ready', () => {
    console.log('Client is ready!');

    app.post('/send', async (req, res) => {
        try {
            const { phone, message } = req.body;
            const chatId = `${phone}@c.us`;       
    
            client.sendMessage(chatId, message).then(() => {
                res.json({ success: 'Message sent successfully' });
            }).catch((error) => {
                res.json({ errorp: 'Error sending message' + error });
            });
    
            await console.log({ chatId: chatId, message: message });
        } catch (error) {
            console.log('envio: ' + error)
        }
      
    });
});

client.initialize();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
