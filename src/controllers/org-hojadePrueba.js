import app from "../app.js";
import pkg from 'whatsapp-web.js';
import path from 'path';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import { initFile, listClients, deleteClient } from './client.controllers.js';
import { methods as whatsappUsersController } from "../controllers/whatsappUsers.controller.js";
import { eliminarUser, eliminarCarpetaUser } from './plusUserWhatsapp.js';

const rutaControllers = () => {

    const currentModulePath = new URL(import.meta.url).pathname;
    const currentDirectory = path.dirname(currentModulePath);
    /* ------------------ PRUEBAS ------------------------ */
    const rutaalter = path.join(currentDirectory);
    const PATH_ROUTES = rutaalter.slice(1);
    /* ------------------ FIN PRUEBAS ------------------------ */

    return PATH_ROUTES;
}

initFile().then((result) => {
    console.log(result.success ? result.resultCli : 'Error al inicializar el archivo');
});

const production = true;

if (production) {
    listClients().then((result) => {
        if (result.success) {
            if (result.clients.length > 0) {
                console.log('--- Lista de clientes Inicio ---');
                result.clients.forEach(element => {
                    console.log(element)                    
                    const rutaCarpeta = path.join(rutaControllers(), '..', '..', '.wwebjs_auth', `session-client-${element}`);
                    const rutaArchivo = path.join(rutaCarpeta, 'SingletonLock');

                    console.log(rutaArchivo);
                    
                    /*fs.promises.access(rutaArchivo)
                        .then(() => {
                            // El archivo existe, así que intenta eliminarlo
                            return fs.promises.unlink(rutaArchivo);
                        })
                        .then(() => {
                            console.log(`El archivo ${rutaArchivo} fue eliminado.`);
                        })
                        .catch((error) => {
                            if (error.code === 'ENOENT') {
                                // El archivo no existe, no hay necesidad de eliminarlo
                                console.log(`El archivo ${rutaArchivo} no existe.`);
                            } else {
                                // Otro error ocurrió durante la verificación o eliminación
                                console.error(`Error al verificar o eliminar el archivo ${rutaArchivo}:`, error);
                            }
                        });*/
                });
                console.log('- Fin lista de clientes Inicio -');

            } else {
                console.log('La lista de clientes inicio está vacía.');
            }
        } else {
            console.log('Error al obtener la lista de clientes:', result.error);
        }
    });
}

console.log("\n********** Clientes Creados **********")