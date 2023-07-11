import app from "../app";
import { Client, RemoteAuth } from 'whatsapp-web.js';
// import { MongoStore } from 'wwebjs-mongo';
// import mongoose from 'mongoose';
import bodyParser from 'body-parser';

console.log('estoy')

const client = new Client();

// Configure bodyParser to parse JSON
// app.use(bodyParser.json());

// Require database
// mongoose.connect('mongodb://127.0.0.1:27017/whatsappApi').then(() => {
//     const store = new MongoStore({ mongoose: mongoose });
//     const client = new Client({
//         authStrategy: new RemoteAuth({
//             store: store,
//             backupSyncIntervalMs: 300000
//         })
//     });

client.on('qr', (qr) => {
    // Handle QR code generation and sending
    app.get('/qr', (req, res) => {
        res.json({qr: qr});
    });
});
// client.on('authenticated', (session) => {
//     console.log('Authenticated');
//     // Save session data to the database
//     store.save(session);
// });

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

// export default client;