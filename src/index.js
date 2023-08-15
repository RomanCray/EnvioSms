import {} from './controllers/hojadePrueba.js';
import app from "./app.js";
// import {} from "./controllers/apiWhatsapp.js";

const main = () => {
    app.listen(app.get("port"));
    console.log(`**** Puerto del servidor: ${app.get("port")} 🔥 ****`);
    console.log("********** Clientes Listos! **********")
};

main();