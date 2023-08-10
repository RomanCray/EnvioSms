import { Router } from "express";
import { methods as whatsappUsersController } from "../controllers/whatsappUsers.controller.js";

const router = Router();

router.get("/agregar/:id", whatsappUsersController.newUserWhatsapp);
router.get("/eliminar/:user/:uniq", whatsappUsersController.eliminarUserWhatsapp);

export default router;