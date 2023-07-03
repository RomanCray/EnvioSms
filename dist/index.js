"use strict";

var _app = _interopRequireDefault(require("./app"));
require("./controllers/hojadePrueba");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import client from "./controllers/apiWhatsapp";

var main = function main() {
  _app["default"].listen(_app["default"].get("port"));
  console.log("Server on port ".concat(_app["default"].get("port")));
};
main();