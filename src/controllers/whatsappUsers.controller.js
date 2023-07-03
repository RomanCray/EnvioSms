import { methods as apiWhatsap } from './apiWhatsapp'
import { agregarUser, eliminarUser, exportarfun } from './plusUserWhatsapp';
const { v4: uuidv4 } = require('uuid');


const nuevoEliminar = (id) => {
    const uniqueId = uuidv4();
    let nuevo = `
/* ------------------ CLIENTE${id} ------------------*/
    
    export const client${id} = new Client({
        authStrategy: new LocalAuth({ clientId: "client-${uniqueId}" })
    });

    client${id}.on('qr', (qr) => {
        app.get('/qr${id}', (req, res) => {
            console.log('llego: cliente-${id}')
            res.json({qr:qr});
        });
    });

    client${id}.on('ready', () => {
        console.log('Client${id} is ready!');
    
        app.post('/send${id}', async (req, res) => {
            const { phone, message } = req.body;
            const chatId = ""+phone+"@c.us";
    
            console.log({ chatId: chatId, message: message });
    
            client${id}.sendMessage(chatId, message).then(() => {
                res.json({ success: 'Message sent successfully' });
            }).catch((error) => {
                res.json({ errorp: 'Error sending message' + error });
            });
        });
    });

    client${id}.initialize();
    `
    return {template: nuevo, id: uniqueId};
}

const newUserWhatsapp = (req, res) => {
    try {

        const { id } = req.params
        const nuevo = nuevoEliminar(id);
        const respuesta = agregarUser('hojadePrueba.js', nuevo.template);
        console.log(nuevo.id)
        res.json({ idUW: nuevo.id })
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const eliminarUserWhatsapp = async (req, res) => {
    try {
        const { user } = req.params
        const nuevo = nuevoEliminar(user);
        const respuesta = eliminarUser('hojadePrueba.js', nuevo, '')
        res.json({ Qr: respuesta })
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    newUserWhatsapp,
    eliminarUserWhatsapp
};