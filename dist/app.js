"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _whatsappUsers = _interopRequireDefault(require("./routes/whatsappUsers.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import express from "express";
// import morgan from "morgan";
// import cors from "cors";
// // Routes
// // import router from "./routes/whatsapp.routes";

// const app = express();
// app.use(cors());

// // Settings
// app.set("port", 4000);

// // Middlewares
// app.use(morgan("dev"));
// app.use(express.json());

// const { Client, RemoteAuth } = require('whatsapp-web.js');
// const { MongoStore } = require('wwebjs-mongo');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// // Configure bodyParser to parse JSON
// app.use(bodyParser.json());

// const client = new Client();

// // Require database
// // mongoose.connect('mongodb://127.0.0.1:27017/whatsappApi').then(() => {
// //     const store = new MongoStore({ mongoose: mongoose });
// //     const client = new Client({
// //         authStrategy: new RemoteAuth({
// //             store: store,
// //             backupSyncIntervalMs: 300000
// //         })
// //     });

// client.on('qr', (qr) => {
//     // Handle QR code generation and sending
//     app.get('/qr', (req, res) => {
//         res.send(qr);
//     });
// });

// // client.on('authenticated', (session) => {
// //     console.log('Authenticated');
// //     // Save session data to the database
// //     store.save(session);
// // });

// client.on('ready', () => {
//     console.log('Client is ready!');

//     app.post('/send', async (req, res) => {
//         const { phone, message } = req.body;
//         const chatId = `${phone}@c.us`;

//         console.log({ chatId: chatId, message: message });

//         client.sendMessage(chatId, message).then(() => {
//             res.json({ success: 'Message sent successfully' });
//         }).catch((error) => {
//             res.json({ errorp: 'Error sending message' + error });
//         });
//     });
// });

// client.initialize();

// // Routes
// // app.use("/My_Whatsapp_Api", router);

// export default app; 

var app = (0, _express["default"])();
app.use((0, _cors["default"])());

// Settings
app.set("port", 4000);

// Middlewares
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());

// Routes
app.use("/newUser", _whatsappUsers["default"]);
var _default = app;
exports["default"] = _default;