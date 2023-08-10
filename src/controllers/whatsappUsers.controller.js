import { agregarUser, eliminarUser, exportarfun } from './plusUserWhatsapp.js';
import { v4 as uuidv4 } from 'uuid';

const nuevoEliminar = (id, unico) => {
    let uniqueId = '';
    unico === undefined ? uniqueId = uuidv4() : uniqueId = unico

    let nuevo = `
/* ------------------ CLIENTE${id} ------------------*/

export const client${id} = new Client({
    authStrategy: new LocalAuth({ clientId: "client-${uniqueId}" }),
    puppeteer: {
        headless: "new",
        args: [
            "--disable-setuid-sandbox",
            "--unhandled-rejections=strict",
        ],
    },
});

console.log('cliente${id} Creado')

client${id}.on('qr', (qr) => {
    app.get('/qr${id}', async (req, res) => {
        try {
            res.json({qr:qr});
            await console.log('QR cliente-${id} : ' + qr)
        } catch (error) {
            res.json({ errorqr: error.message });
        }          
    });
});

client${id}.on('ready', () => {
    console.log('Client${id} Listo..!');

    app.post('/send${id}', async (req, res) => {
        try {
            const { phone, message } = req.body;
            let chatId = "";
            phone.length > 12 ?
            chatId = ""+phone+"@g.us"
            :
            chatId = ""+phone+"@c.us"

            client${id}.sendMessage(chatId, message).then(() => {
                res.json({ success: 'Message sent successfully' });
            }).catch((error) => {
                res.json({ errorp: 'Error sending message' + error });
            });

            await console.log({ De: client${id}, Para: chatId, Message: message, Fecha: Date() });
        } catch (error) {                
            res.json({ errorsms: error.message });                
        }           
    });
});

client${id}.on('message', message => {
    if(message.body === '!Intelho') {
        const grup = message.id.remote
        const numbers = str.match(/\d+/g);
        client${id}.sendMessage(message.from, 'pong');
        console.log(numbers)
    }
});
 

client${id}.initialize();
    `
    return { template: nuevo, id: uniqueId };
}

const newUserWhatsapp = (req, res) => {
    try {
        const { id } = req.params
        const nuevo = nuevoEliminar(id, undefined);
        const respuesta = agregarUser('hojadePrueba.js', nuevo.template);
        if (respuesta) {
            res.json({ idUW: nuevo.id, cliente: true })
        } else {
            res.json({ idUW: '00-00-00-00', cliente: false })
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const eliminarUserWhatsapp = async (req, res) => {
    try {
        const { user, uniq } = req.params
        const nuevo = nuevoEliminar(user, uniq);
        const respuesta = eliminarUser('hojadePrueba.js', '', nuevo.template, nuevo.id)
        if (respuesta) {
            res.json({ respuesta: respuesta })
        } else {
            res.json({ respuesta: false })
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    newUserWhatsapp,
    eliminarUserWhatsapp
};




