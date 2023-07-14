import { methods as apiWhatsap } from './apiWhatsapp'
import { agregarUser, eliminarUser, exportarfun } from './plusUserWhatsapp';
const { v4: uuidv4 } = require('uuid');


const nuevoEliminar = (id, unico) => {
    let uniqueId = '';
    unico === undefined ? uniqueId = uuidv4() : uniqueId = unico

    let nuevo = `
/* ------------------ CLIENTE${id} ------------------*/

    export const client${id} = new Client({
        authStrategy: new LocalAuth({ clientId: "client-${uniqueId}" })
    });

    console.log('cliente${id} Creado')

    client${id}.on('qr', (qr) => {
        app.get('/qr${id}', async (req, res) => {
            try {
                res.json({qr:qr});
                await console.log('llego: cliente-${id}')
            } catch (error) {
                res.json({ errorqr: error.message });
            }          
        });
    });

    client${id}.on('ready', () => {
        console.log('Client${id} is ready!');

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
    
                await console.log({ chatId: chatId, message: message });
            } catch (error) {                
                res.json({ errorsms: error.message });                
            }           
        });
    });

    client.on('message', message => {
        if(message.body === '!ping') {
            client.sendMessage(message.from, 'pong');
            console.log(message)
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