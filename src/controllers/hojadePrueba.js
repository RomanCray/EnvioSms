import app from "../app.js";
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;



/* ------------------ CLIENTE1 ------------------*/

export const client1 = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {        
        headless: true,
        args: [
          "--disable-setuid-sandbox",
          "--unhandled-rejections=strict",
        ],
    },
});

console.log('cliente1 Creado')

client1.on('qr', (qr) => {
    app.get('/qr1', async (req, res) => {
        try {
            res.json({qr:qr});
            await console.log('QR cliente-1 : ' + qr)
        } catch (error) {
            res.json({ errorqr: error.message });
        }          
    });
});

client1.on('ready', () => {
    console.log('Client1 Listo..!');

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

            await console.log({ De: client1, Para: chatId, Message: message, Fecha: Date() });
        } catch (error) {                
            res.json({ errorsms: error.message });                
        }           
    });
});

client1.on('message', message => {
    if(message.body === '!Intelho') {
        const grup = message.id.remote
        const numbers = str.match(/d+/g);
        client1.sendMessage(message.from, 'pong');
        console.log(numbers)
    }
});
 

client1.initialize();
    

/* ------------------ CLIENTE2 ------------------*/

export const client2 = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {        
        headless: true,
        args: [
          "--disable-setuid-sandbox",
          "--unhandled-rejections=strict",
        ],
    },
});

console.log('cliente2 Creado')

client2.on('qr', (qr) => {
    app.get('/qr2', async (req, res) => {
        try {
            res.json({qr:qr});
            await console.log('QR cliente-2 : ' + qr)
        } catch (error) {
            res.json({ errorqr: error.message });
        }          
    });
});

client2.on('ready', () => {
    console.log('Client2 Listo..!');

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

            await console.log({ De: client2, Para: chatId, Message: message, Fecha: Date() });
        } catch (error) {                
            res.json({ errorsms: error.message });                
        }           
    });
});

client2.on('message', message => {
    if(message.body === '!Intelho') {
        const grup = message.id.remote
        const numbers = str.match(/d+/g);
        client2.sendMessage(message.from, 'pong');
        console.log(numbers)
    }
});
 

client2.initialize();
    

/* ------------------ CLIENTE3 ------------------*/

export const client3 = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {        
        headless: true,
        args: [
          "--disable-setuid-sandbox",
          "--unhandled-rejections=strict",
        ],
    },
});

console.log('cliente3 Creado')

client3.on('qr', (qr) => {
    app.get('/qr3', async (req, res) => {
        try {
            res.json({qr:qr});
            await console.log('QR cliente-3 : ' + qr)
        } catch (error) {
            res.json({ errorqr: error.message });
        }          
    });
});

client3.on('ready', () => {
    console.log('Client3 Listo..!');

    app.post('/send3', async (req, res) => {
        try {
            const { phone, message } = req.body;
            let chatId = "";
            phone.length > 12 ?
            chatId = ""+phone+"@g.us"
            :
            chatId = ""+phone+"@c.us"

            client3.sendMessage(chatId, message).then(() => {
                res.json({ success: 'Message sent successfully' });
            }).catch((error) => {
                res.json({ errorp: 'Error sending message' + error });
            });

            await console.log({ De: client3, Para: chatId, Message: message, Fecha: Date() });
        } catch (error) {                
            res.json({ errorsms: error.message });                
        }           
    });
});

client3.on('message', message => {
    if(message.body === '!Intelho') {
        const grup = message.id.remote
        const numbers = str.match(/d+/g);
        client3.sendMessage(message.from, 'pong');
        console.log(numbers)
    }
});
 

client3.initialize();
    