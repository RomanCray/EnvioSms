import { Router } from "express";
import { methods as whatsappUsersController } from "../controllers/whatsappUsers.controller";

const router = Router();

router.get("/agregar/:id", whatsappUsersController.newUserWhatsapp);
router.get("/eliminar/:user", whatsappUsersController.eliminarUserWhatsapp);

export default router;