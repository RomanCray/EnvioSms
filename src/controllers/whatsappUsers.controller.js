import { agregarUser, eliminarUser, captureUsers, listUsers, eliminarCarpetaUser } from './plusUserWhatsapp.js';
import { createClient, listClients } from './client.controllers.js';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const nuevoEliminar = (id, unico) => {
    const currentModulePath = new URL(import.meta.url).pathname;
    const currentDirectory = decodeURIComponent(path.dirname(currentModulePath));
    const PATH_ROUTES = path.join(currentDirectory);
    /* ------------------ PRUEBAS ------------------------ */
    // const rutaalter = path.join(currentDirectory);
    // const PATH_ROUTES = rutaalter.slice(1);
    /* ------------------ FIN PRUEBAS ------------------------ */

    unico === undefined ? unico = id + "-" + uuidv4() : unico
    console.log(unico)
    
    console.log(PATH_ROUTES)
    const rutaCarpeta = path.join(PATH_ROUTES, '..', '..', '.wwebjs_auth', `session-client-${unico}`);
    const rutaArchivo = path.join(rutaCarpeta, 'SingletonLock');
    const totalRut = rutaArchivo.replace(/\\/g, '/');
    console.log(totalRut)


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

        app.get('/cerrar${id}/:pausa', async (req, res) => {
            try {
                await client${id}.pupBrowser.close()
                    .then(() => {
                        const { pausa } = req.params
                        if (pausa == 1 || pausa == '1') {
                            deleteClient('${unico}').then((deletes) => {
                                if (deletes.success) {
                                    console.log(deletes.resultCli)
                                    const rutaCarpetaEspecifica = path.join(rutaControllers(), '..', '..', '.wwebjs_auth', 'session-client-${unico}');
                                    const resp = eliminarCarpetaUser(rutaCarpetaEspecifica)
        
                                    if (resp.result) {
                                        const nuevo = whatsappUsersController.nuevoEliminar("${id}", "${unico}");
                                        console.log('-------- client${id} Cerrado --------')
                                        res.json({ result: true, success: 'client${id} Cerrado' });
                                        const other = eliminarUser('hojadePrueba.js', '', nuevo.template, nuevo.id);
                                    } else {
                                        res.status(500);
                                        res.json({ result: false, errorsms: 'Error client${id} no cerrado message.' });
                                    }
                                } else {
                                    console.log(deletes.resultCli)
                                }
                            });
                        } else {
                            res.json({ result: true, success: 'client${id} Pausado' });
                        }                
                    })
                    .catch((error) => {
                        res.status(500);
                        res.json({ result: false, errorsms: 'Error client${id} no cerrado message: ' + error });
                    });
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

    fs.promises.access('${totalRut}')
    .then(() => {
        // El archivo existe, así que intenta eliminarlo
        return fs.promises.unlink('${totalRut}');
    })
    .then(() => {
        console.log('El archivo ${totalRut} fue eliminado.');
                
        client${id}.initialize();
    })
    .catch ((error) => {
    if (error.code === 'ENOENT') {
        // El archivo no existe, no hay necesidad de eliminarlo
        console.log('El archivo ${totalRut} no existe.');
        client${id}.initialize();
    } else {
        // Otro error ocurrió durante la verificación o eliminación
        console.error('Error al verificar o eliminar el archivo ${totalRut}:', error);
    }
});
 `
    return { template: nuevo, id: `${unico}` };
}

const newUserWhatsapp = (req, res) => {
    try {
        const { id } = req.params
        const nuevo = nuevoEliminar(id, undefined);

        listClients().then((result) => {
            if (result.success) {
                if (result.clients.length > 0) {
                    console.log('+++ Lista de clientes +++');

                    let validador = false;
                    result.clients.forEach(element => {
                        const partes = element.split('-');
                        const cliente = partes[0];

                        if (id === cliente) {
                            validador = true;
                        }
                    });

                    if (!validador) {
                        console.log("NUEVO")
                        const respuesta = agregarUser('hojadePrueba.js', nuevo.template);
                        if (respuesta) {
                            createClient(nuevo.id).then((result) => {
                                console.log(result ? 'Cliente creado exitosamente' : 'Error al crear el cliente');
                                res.json({ idUW: nuevo.id, cliente: true })
                            });
                        } else {
                            res.status(500);
                            res.json({ idUW: '00-00-00-00', cliente: false })
                        }
                    } else {
                        res.status(409);
                        res.json({ idUW: '00-00-00-00', cliente: false })
                    }
                    console.log('+ Fin lista de clientes +');
                } else {
                    console.log("PRIMERO")
                    const respuesta = agregarUser('hojadePrueba.js', nuevo.template);
                    if (respuesta) {
                        createClient(nuevo.id).then((result) => {
                            console.log(result ? 'Cliente creado exitosamente' : 'Error al crear el cliente');
                        });
                        res.json({ idUW: nuevo.id, cliente: true })
                    } else {
                        res.status(500);
                        res.json({ idUW: '00-00-00-00', cliente: false })
                    }
                }
            } else {
                console.log('Error al obtener la lista de clientes:', result.error);
            }
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

const consultarclients = async (req, res) => {
    try {
        listClients().then((result) => {
            if (result.success) {
                if (result.clients.length > 0) {
                    res.json({ lista: result.clients, respuesta: true })
                } else {
                    res.json({ lista: 0, respuesta: true })
                }
                console.log("CLientes: " + result.clients.length)
            } else {
                res.status(500);
                res.send({ respuesta: false, errorsms: error.message });
            }
        });
    } catch (error) {
        res.status(500);
        res.send({ respuesta: false, errorsms: error.message });
    }
};

export const methods = {
    nuevoEliminar,
    newUserWhatsapp,
    consultarclients,
    eliminarUserWhatsapp,
    eliminarCarpetaUserWhatsapp
};




