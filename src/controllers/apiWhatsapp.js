import app from "../app.js";
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import { v4 as uuidv4 } from 'uuid';

// import puppeteer from 'puppeteer';

console.log('estoy')

/* ----- SOLO FUNCIONA CON LAS ESTARAS LegacySessionAuth Y RemoteAuth  */
// client2.on('authenticated', session => {
//     console.log('Authenticated: ',session );    
// });

export const client2 = new Client({
    authStrategy: new LocalAuth({ clientId: "client2" }),
    puppeteer: {
        headless: "new",
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--unhandled-rejections=strict",
        ],
    },
});

console.log('* client2 Preparado')

client2.on('qr', (qr) => {
    let oldQr = qr;

    app.get('/qr2', async (req, res) => {
        console.log("holi")
        try {
            qrcode.generate(oldQr, { small: true });
            res.json({ qr: oldQr });
            await console.log('QR client2 : ' + oldQr)
        } catch (error) {
            res.status(500);
            res.json({ errorqr: error.message });
        }
    });
});

client2.on('ready', () => {
    console.log('client2 Listo..!');

    app.post('/send2', async (req, res) => {
        try {
            const { phone, message } = req.body;
            let chatId = "";
            phone.length > 12 ?
                chatId = "" + phone + "@g.us"
                :
                chatId = "" + phone + "@c.us"

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
            res.status(500);
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
            De: "client2",
            orginalName: client2.info.pushname,
            phoneUser: client2.info.wid.user,
            Fecha: Date()
        });
    } catch (error) {
        res.status(500);
        res.json({ errorsms: error.message });
    }
});

app.get('/closeChromiun', async (req, res) => {
    try {
        await puppeteer.browser.close();        
    } catch (error) {
        res.status(500);
        res.json({ errorsms: error.message });
    }
});

client2.on('message', message => {
    if (message.body === 'pong') {
        client.sendMessage(message.from, 'pong');
        // const grup = message.id.remote
        // const numbers = str.match(/\d+/g);
        // console.log(numbers)
    }
});


client2.on('disconnected', (reason) => {
    console.log('client2 desconectado desde: ', reason);
});


client2.initialize();

// export default client2;
