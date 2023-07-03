import app from "../app";
import { Client, LocalAuth ,RemoteAuth } from 'whatsapp-web.js';

/* ------------------ CLIENTE24 ------------------*/
    
    export const client24 = new Client({
        authStrategy: new LocalAuth({ clientId: "client-928be46b-d302-4925-9dbe-913135e41fd5" })
    });

    client24.on('qr', (qr) => {
        app.get('/qr24', (req, res) => {
            console.log('llego: cliente-24')
            res.json({qr:qr});
        });
    });

    client24.on('ready', () => {
        console.log('Client24 is ready!');
    
        app.post('/send24', async (req, res) => {
            const { phone, message } = req.body;
            const chatId = ""+phone+"@c.us";
    
            console.log({ chatId: chatId, message: message });
    
            client24.sendMessage(chatId, message).then(() => {
                res.json({ success: 'Message sent successfully' });
            }).catch((error) => {
                res.json({ errorp: 'Error sending message' + error });
            });
        });
    });

    client24.initialize();
    

/* ------------------ CLIENTE25 ------------------*/
    
    export const client25 = new Client({
        authStrategy: new LocalAuth({ clientId: "client-f3de958f-ffb7-4065-8a1d-4d6ec2e58f66" })
    });

    client25.on('qr', (qr) => {
        app.get('/qr25', (req, res) => {
            console.log('llego: cliente-25')
            res.json({qr:qr});
        });
    });

    client25.on('ready', () => {
        console.log('Client25 is ready!');
    
        app.post('/send25', async (req, res) => {
            const { phone, message } = req.body;
            const chatId = ""+phone+"@c.us";
    
            console.log({ chatId: chatId, message: message });
    
            client25.sendMessage(chatId, message).then(() => {
                res.json({ success: 'Message sent successfully' });
            }).catch((error) => {
                res.json({ errorp: 'Error sending message' + error });
            });
        });
    });

    client25.initialize();
    

/* ------------------ CLIENTE26 ------------------*/
    
    export const client26 = new Client({
        authStrategy: new LocalAuth({ clientId: "client-4d879386-8bcb-411a-8594-9e68b7d80ec6" })
    });

    client26.on('qr', (qr) => {
        app.get('/qr26', (req, res) => {
            console.log('llego: cliente-26')
            res.json({qr:qr});
        });
    });

    client26.on('ready', () => {
        console.log('Client26 is ready!');
    
        app.post('/send26', async (req, res) => {
            const { phone, message } = req.body;
            const chatId = ""+phone+"@c.us";
    
            console.log({ chatId: chatId, message: message });
    
            client26.sendMessage(chatId, message).then(() => {
                res.json({ success: 'Message sent successfully' });
            }).catch((error) => {
                res.json({ errorp: 'Error sending message' + error });
            });
        });
    });

    client26.initialize();
    

/* ------------------ CLIENTE27 ------------------*/
    
    export const client27 = new Client({
        authStrategy: new LocalAuth({ clientId: "client-3dc306d7-215a-4ebf-88f8-cf6708699b4e" })
    });

    client27.on('qr', (qr) => {
        app.get('/qr27', (req, res) => {
            console.log('llego: cliente-27')
            res.json({qr:qr});
        });
    });

    client27.on('ready', () => {
        console.log('Client27 is ready!');
    
        app.post('/send27', async (req, res) => {
            const { phone, message } = req.body;
            const chatId = ""+phone+"@c.us";
    
            console.log({ chatId: chatId, message: message });
    
            client27.sendMessage(chatId, message).then(() => {
                res.json({ success: 'Message sent successfully' });
            }).catch((error) => {
                res.json({ errorp: 'Error sending message' + error });
            });
        });
    });

    client27.initialize();
    