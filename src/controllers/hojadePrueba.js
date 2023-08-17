import app from "../app.js";
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';

console.log("\n********** Clientes Creados **********")

/* ------------------ CLIENTE1 ------------------*/

export const client1 = new Client({
    authStrategy: new LocalAuth({ clientId: "client-11f6c758a-cf8e-4e4f-9799-e790fbf67b26" }),
    puppeteer: {
        headless: "new",
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--unhandled-rejections=strict",
            "--disable-extensions",
            "--disable-infobars",
            "--disable-session-crashed-bubble"
        ],
    },
});

console.log('cliente1 Preparado')

client1.on('qr', (qr) => {
    let oldQr = qr;
    app.get('/qr1', async (req, res) => {
        console.log(client1)
        try {      
            qrcode.generate(oldQr, { small: true });      
            res.json({ qr: oldQr });
            await console.log('QR client1 : ' + oldQr)
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

            await client1.sendMessage(chatId, message)
                .then(() => {
                    res.json({ success: 'Message sent successfully' });
                })
                .catch((error) => {
                    res.json({ errorp: 'Error sending message' + error });
                });

                console.log({
                    De: "client1",
                    Para: chatId,
                    Message: message,
                    Fecha: Date()
                });
        } catch (error) {                
            res.json({ errorsms: error.message });                
        }           
    });
});

app.get('/estatus1', async (req, res) => {
    try {
        await res.json({
            orginalName: client1.info.pushname,
            phoneUser: client1.info.wid.user,
        });

        console.log({
            De: "11f6c758a-cf8e-4e4f-9799-e790fbf67b26",
            orginalName: client1.info.pushname,
            phoneUser: client1.info.wid.user,
            Fecha: Date()
        });
    } catch (error) {
        res.status(500);
        res.json({ errorsms: error.message });
    }
});

app.get('/cerrar1', async (req, res) => {
    try {
        client1.pupBrowser.close();
        await res.json({ resp: true });
        console.log('-------- client1 Cerrado --------')                
    } catch (error) {
        res.status(500);
        res.json({ errorsms: error.message, resp: false });
    }
});

client1.on('message', message => {
    if(message.body === 'pong') {
        const grup = message.id.remote
        const numbers = str.match(/d+/g);
        client1.sendMessage(message.from, 'pong');
        console.log(numbers)
    }
});


client1.on('disconnected', (reason) => {
    console.log('Client1 desconectado desde: ', reason);
});
 

client1.initialize();
    

/* ------------------ CLIENTE2 ------------------*/

export const client2 = new Client({
    authStrategy: new LocalAuth({ clientId: "client-2b068c0b5-0152-4eff-92f3-5eea4d25ba48" }),
    puppeteer: {
        headless: "new",
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--unhandled-rejections=strict",
            "--disable-extensions",
            "--disable-infobars",
            "--disable-session-crashed-bubble"
        ],
    },
});

console.log('cliente2 Preparado')

client2.on('qr', (qr) => {
    let oldQr = qr;
    app.get('/qr2', async (req, res) => {
        console.log(client2)
        try {      
            qrcode.generate(oldQr, { small: true });      
            res.json({ qr: oldQr });
            await console.log('QR client2 : ' + oldQr)
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

            await client2.sendMessage(chatId, message)
                .then(() => {
                    res.json({ success: 'Message sent successfully' });
                })
                .catch((error) => {
                    res.json({ errorp: 'Error sending message' + error });
                });

                console.log({
                    De: "client2",
                    Para: chatId,
                    Message: message,
                    Fecha: Date()
                });
        } catch (error) {                
            res.json({ errorsms: error.message });                
        }           
    });
});

app.get('/estatus2', async (req, res) => {
    try {
        await res.json({
            orginalName: client2.info.pushname,
            phoneUser: client2.info.wid.user,
        });

        console.log({
            De: "2b068c0b5-0152-4eff-92f3-5eea4d25ba48",
            orginalName: client2.info.pushname,
            phoneUser: client2.info.wid.user,
            Fecha: Date()
        });
    } catch (error) {
        res.status(500);
        res.json({ errorsms: error.message });
    }
});

app.get('/cerrar2', async (req, res) => {
    try {
        client2.pupBrowser.close();
        await res.json({ resp: true });
        console.log('-------- client2 Cerrado --------')                
    } catch (error) {
        res.status(500);
        res.json({ errorsms: error.message, resp: false });
    }
});

client2.on('message', message => {
    if(message.body === 'pong') {
        const grup = message.id.remote
        const numbers = str.match(/d+/g);
        client2.sendMessage(message.from, 'pong');
        console.log(numbers)
    }
});


client2.on('disconnected', (reason) => {
    console.log('Client2 desconectado desde: ', reason);
});
 

client2.initialize();
    