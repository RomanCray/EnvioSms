import app from "./app";
import {} from './controllers/hojadePrueba';
// import client from "./controllers/apiWhatsapp";

const main = () => {
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
};

main();