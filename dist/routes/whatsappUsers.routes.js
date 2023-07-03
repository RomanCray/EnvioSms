"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _whatsappUsers = require("../controllers/whatsappUsers.controller");
var router = (0, _express.Router)();
router.get("/agregar/:id", _whatsappUsers.methods.newUserWhatsapp);
router.get("/eliminar/:user", _whatsappUsers.methods.eliminarUserWhatsapp);
var _default = router;
exports["default"] = _default;