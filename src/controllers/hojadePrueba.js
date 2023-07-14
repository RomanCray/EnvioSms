import app from "../app";
import { Client, LocalAuth ,RemoteAuth } from 'whatsapp-web.js';


/* ------------------ CLIENTE1 ------------------*/

    export const client1 = new Client({
        authStrategy: new LocalAuth({ clientId: "client-429d2cf9-c639-4baa-bbdc-5070046ed695" })
    });

    console.log('cliente1 Creado')

    client1.on('qr', (qr) => {
        app.get('/qr1', async (req, res) => {
            try {
                res.json({qr:qr});
                await console.log('llego: cliente-1')
            } catch (error) {
                res.json({ errorqr: error.message });
            }          
        });
    });

    client1.on('ready', () => {
        console.log('Client1 is ready!');

        app.post('/send1', async (req, res) => {
            try {
                const { phone, message } = req.body;
                let chatId = "";
                phone.length > 12 ?
                chatId = ""+phone+"@g.us"
                :
                chatId = ""+phone+"@c.us"
    
                client1.sendMessage(chatId, message).then(() => {
                    res.json({ success: 'Message sent successfully' });
                }).catch((error) => {
                    res.json({ errorp: 'Error sending message' + error });
                });
    
                await console.log({ chatId: chatId, message: message });
            } catch (error) {                
                res.json({ errorsms: error.message });                
            }           
        });
    });

    client1.initialize();
    


/* ------------------ CLIENTE2 ------------------*/

    export const client2 = new Client({
        authStrategy: new LocalAuth({ clientId: "client-facb88d5-41d8-4638-bda0-d31b9c34d865" })
    });

    console.log('cliente2 Creado')

    client2.on('qr', (qr) => {
        app.get('/qr2', async (req, res) => {
            try {
                res.json({qr:qr});
                await console.log('llego: cliente-2')
            } catch (error) {
                res.json({ errorqr: error.message });
            }          
        });
    });

    client2.on('ready', () => {
        console.log('Client2 is ready!');

        app.post('/send2', async (req, res) => {
            try {
                const { phone, message } = req.body;
                let chatId = "";
                phone.length > 12 ?
                chatId = ""+phone+"@g.us"
                :
                chatId = ""+phone+"@c.us"
    
                client2.sendMessage(chatId, message).then(() => {
                    res.json({ success: 'Message sent successfully' });
                }).catch((error) => {
                    res.json({ errorp: 'Error sending message' + error });
                });
    
                await console.log({ chatId: chatId, message: message });
            } catch (error) {                
                res.json({ errorsms: error.message });                
            }           
        });
    });

    client2.initialize();
    