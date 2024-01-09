import app from "../app.js";
import fs from 'fs';
import pkg from 'whatsapp-web.js';
import path from 'path';
import qrcode from 'qrcode-terminal';
import { deleteClient } from './client.controllers.js';
import { methods as whatsappUsersController } from "../controllers/whatsappUsers.controller.js";
import { eliminarUser, eliminarCarpetaUser } from './plusUserWhatsapp.js';
const { Client, LocalAuth } = pkg;

console.log("\n********** Clientes Creados **********")