import {} from './controllers/hojadePrueba.js';
import app from "./app.js";
// const app = require("./app").default;    
// import client from "./controllers/apiWhatsapp";

const main = () => {
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
};

main();