"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportarfun = exports.eliminarUser = exports.agregarUser = void 0;
var fs = require('fs');
var path = require('path');
var agregarUser = function agregarUser(rutaArchivo, codigoAgregar) {
  var PATH_ROUTES = "".concat(__dirname, "\\").concat(rutaArchivo);
  try {
    var contenido = fs.readFileSync(PATH_ROUTES, 'utf8');

    // Concatenar el código a agregar al contenido existente
    var nuevoContenido = contenido + '\n' + codigoAgregar;

    // Escribir el nuevo contenido en el archivo
    fs.writeFileSync(PATH_ROUTES, nuevoContenido, 'utf8');
    console.log('Código agregado exitosamente al archivo.');
  } catch (error) {
    console.error('Error al leer o escribir en el archivo:', error);
    return;
  }
  return 'Nuevo User Creado';
};
exports.agregarUser = agregarUser;
var eliminarUser = function eliminarUser(rutaArchivo, textoBusqueda, nuevoContenido) {
  var PATH_ROUTES = "".concat(__dirname, "\\").concat(rutaArchivo);
  fs.readFile(PATH_ROUTES, 'utf8', function (error, contenido) {
    if (error) {
      console.error('Error al leer el archivo:', error);
      return;
    }

    // Reemplazar el texto en el contenido del archivo
    var contenidoModificado = contenido.replace(textoBusqueda, nuevoContenido);

    // Escribir el contenido modificado en el archivo
    fs.writeFile(PATH_ROUTES, contenidoModificado, 'utf8', function (error) {
      if (error) {
        console.error('Error al escribir en el archivo:', error);
        return;
      }
      console.log('Contenido reemplazado exitosamente en el archivo.');
    });
  });
  return 'User Eliminado';
};
exports.eliminarUser = eliminarUser;
var exportarfun = function exportarfun(rutaArchivo) {
  // Obtener la ruta absoluta del directorio
  var directorio = "".concat(__dirname, "\\").concat(rutaArchivo);

  // Crear un contexto de requerimiento para el directorio
  var contexto = require.context(directorio, false, /\.js$/);

  // Objeto para almacenar todas las exportaciones
  var todasLasExportaciones = {};

  // Iterar sobre los módulos encontrados en el contexto
  contexto.keys().forEach(function (nombreArchivo) {
    // Obtener el módulo exportado
    var modulo = contexto(nombreArchivo);

    // Obtener las exportaciones del módulo
    var exportaciones = Object.keys(modulo).reduce(function (acumulador, clave) {
      acumulador[clave] = modulo[clave];
      return acumulador;
    }, {});

    // Fusionar las exportaciones con el objeto principal
    Object.assign(todasLasExportaciones, exportaciones);
  });

  // Exportar todas las exportaciones como un objeto
  // module.exports = todasLasExportaciones;

  return todasLasExportaciones;
};
exports.exportarfun = exportarfun;