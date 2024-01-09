import { Router } from "express";
import { methods as whatsappUsersController } from "../controllers/whatsappUsers.controller.js";

const router = Router();

router.get("/agregar/:id", whatsappUsersController.newUserWhatsapp);
router.get("/consultarclients", whatsappUsersController.consultarclients);
router.get("/eliminarUsuario/:user/:uniq", whatsappUsersController.eliminarUserWhatsapp);
router.post("/eliminarCarpetaUser", whatsappUsersController.eliminarCarpetaUserWhatsapp);

export default router;