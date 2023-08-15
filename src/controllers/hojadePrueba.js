import app from "../app.js";
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';

console.log("\n********** Clientes Creados **********")

/* ------------------ CLIENTE10 ------------------*/

export const client10 = new Client({
    authStrategy: new LocalAuth({ clientId: "client-109e4a2ea6-4f75-41e3-bf56-67133854afcc" }),
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

console.log('cliente10 Preparado')

client10.on('qr', (qr) => {
    let oldQr = qr;
    app.get('/qr10', async (req, res) => {
        console.log(client10)
        try {      
            qrcode.generate(oldQr, { small: true });      
            res.json({ qr: oldQr });
            await console.log('QR client10 : ' + oldQr)
        } catch (error) {
            res.json({ errorqr: error.message });
        }
    });
});

client10.on('ready', () => {
    console.log('Client10 Listo..!');

    app.post('/send10', async (req, res) => {
        try {
            const { phone, message } = req.body;
            let chatId = "";
            phone.length > 12 ?
            chatId = ""+phone+"@g.us"
            :
            chatId = ""+phone+"@c.us"

            await client10.sendMessage(chatId, message)
                .then(() => {
                    res.json({ success: 'Message sent successfully' });
                })
                .catch((error) => {
                    res.json({ errorp: 'Error sending message' + error });
                });

                console.log({
                    De: "client10",
                    Para: chatId,
                    Message: message,
                    Fecha: Date()
                });
        } catch (error) {                
            res.json({ errorsms: error.message });                
        }           
    });
});

app.get('/estatus10', async (req, res) => {
    try {
        await res.json({
            orginalName: client10.info.pushname,
            phoneUser: client10.info.wid.user,
        });

        console.log({
            De: "109e4a2ea6-4f75-41e3-bf56-67133854afcc",
            orginalName: client10.info.pushname,
            phoneUser: client10.info.wid.user,
            Fecha: Date()
        });
    } catch (error) {
        res.json({ errorsms: error.message });
    }
});

app.get('/cerrar10', async (req, res) => {
    try {
        await client10.pupBrowser.close();
        console.log('client10')
        res.json({ resp: 'cerrado' });
    } catch (error) {
        res.json({ errorsms: error.message });
    }
});

client10.on('message', message => {
    if(message.body === 'pong') {
        const grup = message.id.remote
        const numbers = str.match(/d+/g);
        client10.sendMessage(message.from, 'pong');
        console.log(numbers)
    }
});


client10.on('disconnected', (reason) => {
    console.log('Client10 desconectado desde: ', reason);
});
 

client10.initialize();
    

/* ------------------ CLIENTE11 ------------------*/

export const client11 = new Client({
    authStrategy: new LocalAuth({ clientId: "client-1186d24716-0838-46f0-89ed-b552e63ba4b3" }),
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

console.log('cliente11 Preparado')

client11.on('qr', (qr) => {
    let oldQr = qr;
    app.get('/qr11', async (req, res) => {
        console.log(client11)
        try {      
            qrcode.generate(oldQr, { small: true });      
            res.json({ qr: oldQr });
            await console.log('QR client11 : ' + oldQr)
        } catch (error) {
            res.json({ errorqr: error.message });
        }
    });
});

client11.on('ready', () => {
    console.log('Client11 Listo..!');

    app.post('/send11', async (req, res) => {
        try {
            const { phone, message } = req.body;
            let chatId = "";
            phone.length > 12 ?
            chatId = ""+phone+"@g.us"
            :
            chatId = ""+phone+"@c.us"

            await client11.sendMessage(chatId, message)
                .then(() => {
                    res.json({ success: 'Message sent successfully' });
                })
                .catch((error) => {
                    res.json({ errorp: 'Error sending message' + error });
                });

                console.log({
                    De: "client11",
                    Para: chatId,
                    Message: message,
                    Fecha: Date()
                });
        } catch (error) {                
            res.json({ errorsms: error.message });                
        }           
    });
});

app.get('/estatus11', async (req, res) => {
    try {
        await res.json({
            orginalName: client11.info.pushname,
            phoneUser: client11.info.wid.user,
        });

        console.log({
            De: "1186d24716-0838-46f0-89ed-b552e63ba4b3",
            orginalName: client11.info.pushname,
            phoneUser: client11.info.wid.user,
            Fecha: Date()
        });
    } catch (error) {
        res.json({ errorsms: error.message });
    }
});

app.get('/cerrar11', async (req, res) => {
    try {
        await client11.pupBrowser.close();
        console.log('client11')
        res.json({ resp: 'cerrado' });
    } catch (error) {
        res.json({ errorsms: error.message });
    }
});

client11.on('message', message => {
    if(message.body === 'pong') {
        const grup = message.id.remote
        const numbers = str.match(/d+/g);
        client11.sendMessage(message.from, 'pong');
        console.log(numbers)
    }
});


client11.on('disconnected', (reason) => {
    console.log('Client11 desconectado desde: ', reason);
});
 

client11.initialize();
    

/* ------------------ CLIENTE12 ------------------*/

export const client12 = new Client({
    authStrategy: new LocalAuth({ clientId: "client-12397df0c9-5c0a-4fd4-929b-5043eeddc5a5" }),
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

console.log('cliente12 Preparado')

client12.on('qr', (qr) => {
    let oldQr = qr;
    app.get('/qr12', async (req, res) => {
        console.log(client12)
        try {      
            qrcode.generate(oldQr, { small: true });      
            res.json({ qr: oldQr });
            await console.log('QR client12 : ' + oldQr)
        } catch (error) {
            res.json({ errorqr: error.message });
        }
    });
});

client12.on('ready', () => {
    console.log('Client12 Listo..!');

    app.post('/send12', async (req, res) => {
        try {
            const { phone, message } = req.body;
            let chatId = "";
            phone.length > 12 ?
            chatId = ""+phone+"@g.us"
            :
            chatId = ""+phone+"@c.us"

            await client12.sendMessage(chatId, message)
                .then(() => {
                    res.json({ success: 'Message sent successfully' });
                })
                .catch((error) => {
                    res.json({ errorp: 'Error sending message' + error });
                });

                console.log({
                    De: "client12",
                    Para: chatId,
                    Message: message,
                    Fecha: Date()
                });
        } catch (error) {                
            res.json({ errorsms: error.message });                
        }           
    });
});

app.get('/estatus12', async (req, res) => {
    try {
        await res.json({
            orginalName: client12.info.pushname,
            phoneUser: client12.info.wid.user,
        });

        console.log({
            De: "12397df0c9-5c0a-4fd4-929b-5043eeddc5a5",
            orginalName: client12.info.pushname,
            phoneUser: client12.info.wid.user,
            Fecha: Date()
        });
    } catch (error) {
        res.json({ errorsms: error.message });
    }
});

app.get('/cerrar12', async (req, res) => {
    try {
        await client12.pupBrowser.close();
        console.log('client12')
        res.json({ resp: 'cerrado' });
    } catch (error) {
        res.json({ errorsms: error.message });
    }
});

client12.on('message', message => {
    if(message.body === 'pong') {
        const grup = message.id.remote
        const numbers = str.match(/d+/g);
        client12.sendMessage(message.from, 'pong');
        console.log(numbers)
    }
});


client12.on('disconnected', (reason) => {
    console.log('Client12 desconectado desde: ', reason);
});
 

client12.initialize();
    