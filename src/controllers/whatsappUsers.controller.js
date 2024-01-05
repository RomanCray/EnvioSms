import { agregarUser, eliminarUser, captureUsers, listUsers, eliminarCarpetaUser } from './plusUserWhatsapp.js';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

const nuevoEliminar = (id, unico) => {

    unico === undefined ? unico = id + "-" + uuidv4() : unico

    let nuevo = `
/* ------------------ CLIENTE${id} ------------------*/

export const client${id} = new Client({
    authStrategy: new LocalAuth({ clientId: "client-${unico}" }),
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
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2334.12.html',
    },
});

console.log('cliente${id} Preparado')

client${id}.on('qr', (qr) => {
    let oldQr = qr;
    app.get('/qr${id}', async (req, res) => {        
        try {      
            qrcode.generate(oldQr, { small: true });      
            res.json({ result: true, answer: oldQr });
            await console.log('QR client${id} : ' + oldQr)
        } catch (error) {
            res.status(500);
            res.json({ result: false, errorsms: error.message });
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

            await client${id}.sendMessage(chatId, message)
                .then(() => {
                    res.json({ result: true, success: 'Message sent successfully' });
                })
                .catch((error) => {
                    res.status(500);
                    res.json({ result: false, errorsms: 'Error sending message: ' + error });
                });

                console.log({
                    De: "client${id}",
                    Para: chatId,
                    Message: message,
                    Fecha: Date()
                });
        } catch (error) {      
            res.status(500);          
            res.json({ result: false, errorsms: error.message });                
        }           
    });
});

app.get('/estatus${id}', async (req, res) => {
    try {
        await res.json({
            result: true,
            orginalName: client${id}.info.pushname,
            phoneUser: client${id}.info.wid.user,
        });

        console.log({
            De: "${unico}",
            orginalName: client${id}.info.pushname,
            phoneUser: client${id}.info.wid.user,
            Fecha: Date()
        });
    } catch (error) {
        res.status(500);
        res.json({ result: false, errorsms: error.message });
    }
});

app.get('/cerrar${id}', async (req, res) => {
    try {
        client${id}.pupBrowser.close();
        await res.json({ resp: true });
        console.log('-------- client${id} Cerrado --------')                
    } catch (error) {
        res.status(500);
        res.json({ errorsms: error.message, resp: false });
    }
});

client${id}.on('message', message => {
    if(message.body === 'pong') {
        const grup = message.id.remote
        const numbers = str.match(/\d+/g);
        client${id}.sendMessage(message.from, 'pong');
        console.log(numbers)
    }
});


client${id}.on('disconnected', (reason) => {
    console.log('Client${id} desconectado desde: ', reason);
});
 

client${id}.initialize();
    `
    return { template: nuevo, id: `${unico}` };
}

const newUserWhatsapp = (req, res) => {
    try {
        const { id } = req.params
        const nuevo = nuevoEliminar(id, undefined);

        listUsers('client.txt')
            .then(users => {

                if (users.includes(parseInt(id))) {
                    console.log("EXISTE")
                    const respuesta = agregarUser('hojadePrueba.js', nuevo.template);
                    if (respuesta) {
                        res.json({ idUW: nuevo.id, cliente: true })
                    } else {
                        res.status(500);
                        res.json({ idUW: '00-00-00-00', cliente: false })
                    }
                } else {
                    captureUsers('client.txt', id)
                        .then(result => {
                            console.log(result)
                            if (result) {
                                console.log("NUEVO")
                                const respuesta = agregarUser('hojadePrueba.js', nuevo.template);
                                if (respuesta) {
                                    res.json({ idUW: nuevo.id, cliente: true })
                                } else {
                                    res.status(500);
                                    res.json({ idUW: '00-00-00-00', cliente: false })
                                }
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            res.json({ errorsms: error })
                        });
                }

            })
            .catch(error => {
                console.error(error);
            });

    } catch (error) {
        res.status(500);
        res.send({ respuesta: false, errorsms: error.message });
    }
};

const eliminarUserWhatsapp = async (req, res) => {
    try {
        const { user, uniq } = req.params;
        const nuevo = nuevoEliminar(user, uniq);
        const resp = await eliminarUser('hojadePrueba.js', '', nuevo.template, nuevo.id);

        if (resp.result) {
            console.log({ respuesta: resp.result, ruta: resp.carpeta })
            res.json({ respuesta: resp.result, ruta: resp.carpeta });
        } else {
            res.status(500);
            res.json({ respuesta: resp.result });
        }
    } catch (error) {
        res.status(500);
        res.send({ respuesta: false, errorsms: error.message });
    }
};

const eliminarCarpetaUserWhatsapp = async (req, res) => {
    try {
        const { ruta } = req.body;

        const resp = eliminarCarpetaUser(ruta);

        console.log(resp);

        if (resp.result) {
            console.log({ respuesta: resp.result })
            res.json({ respuesta: true });
        } else {
            res.status(500);
            res.json({ respuesta: resp.result });
        }
    } catch (error) {
        res.status(500);
        res.send({ respuesta: false, errorsms: error.message });
    }
};

export const methods = {
    newUserWhatsapp,
    eliminarUserWhatsapp,
    eliminarCarpetaUserWhatsapp
};




