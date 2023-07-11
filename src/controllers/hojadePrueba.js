import app from "../app";
import { Client, LocalAuth, RemoteAuth } from 'whatsapp-web.js';

/* ------------------ CLIENTE1 ------------------*/

export const client1 = new Client({
    authStrategy: new LocalAuth({ clientId: "client-b1963991-e141-4249-8bf6-c19b4da013b3" })
});

console.log('cliente1 Creado')

client1.on('qr', (qr) => {
    app.get('/qr1', async (req, res) => {
        res.json({ qr: qr });
        await console.log('llego: cliente-1')
    });
});

client1.on('ready', () => {
    console.log('Client1 is ready!');

    app.post('/send1', async (req, res) => {
        const { phone, message } = req.body;
        const chatId = "" + phone + "@c.us";

        client1.sendMessage(chatId, message).then(() => {
            res.json({ success: 'Message sent successfully' });
        }).catch((error) => {
            res.json({ errorp: 'Error sending message' + error });
        });

        await console.log({ chatId: chatId, message: message });
    });
});

client1.initialize();
