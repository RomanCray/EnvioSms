import app from "../app.js";
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import { v4 as uuidv4 } from 'uuid';

// import puppeteer from 'puppeteer';

console.log('estoy')

// /* ----- SOLO FUNCIONA CON LAS ESTARAS LegacySessionAuth Y RemoteAuth  */
// // clientprueba2.on('authenticated', session => {
// //     console.log('Authenticated: ',session );    
// // });

export const clientprueba2 = new Client({
    authStrategy: new LocalAuth({ clientId: "clientprueba2" }),
    puppeteer: {
        headless: "new",
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--unhandled-rejections=strict",
        ],
    },
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2334.12.html',
    },
    
});

console.log('* clientprueba2 Preparado')

clientprueba2.on('qr', (qr) => {
    let oldQr = qr;

    app.get('/qr2', async (req, res) => {
        console.log("holi")
        try {
            qrcode.generate(oldQr, { small: true });
            res.json({ qr: oldQr });
            await console.log('QR clientprueba2 : ' + oldQr)
        } catch (error) {
            res.status(500);
            res.json({ errorqr: error.message });
        }
    });
});


clientprueba2.on('ready', () => {
    console.log('clientprueba2 Listo..!');

    app.post('/send2', async (req, res) => {
        try {
            const { phone, message } = req.body;
            let chatId = "";
            phone.length > 12 ?
                chatId = "" + phone + "@g.us"
                :
                chatId = "" + phone + "@c.us"

            await clientprueba2.sendMessage(chatId, message)
                .then(() => {
                    res.json({ success: 'Message sent successfully' });
                })
                .catch((error) => {
                    res.json({ errorp: 'Error sending message' + error });
                });

            console.log({
                De: "clientprueba2",
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
            orginalName: clientprueba2.info.pushname,
            phoneUser: clientprueba2.info.wid.user,
        });

        console.log({
            De: "clientprueba2",
            orginalName: clientprueba2.info.pushname,
            phoneUser: clientprueba2.info.wid.user,
            Fecha: Date()
        });
    } catch (error) {
        res.status(500);
        res.json({ errorsms: error.message });
    }
});


app.get('/cerrar2', async (req, res) => {
    try {
        clientprueba2.pupBrowser.close();
        await res.json({ resp: true });
        console.log('-------- clientprueba2 Cerrado --------')                
    } catch (error) {
        res.status(500);
        res.json({ errorsms: error.message, resp: false });
    }
});

clientprueba2.on('message', message => {
    if (message.body === 'pong') {
        client.sendMessage(message.from, 'pong');
        // const grup = message.id.remote
        // const numbers = str.match(/\d+/g);
        // console.log(numbers)
    }
});


clientprueba2.on('disconnected', (reason) => {
    console.log('clientprueba2 desconectado desde: ', reason);
});


clientprueba2.initialize();

export default clientprueba2;