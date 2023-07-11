const fs = require('fs');
const path = require('path');

export const agregarUser = (rutaArchivo, codigoAgregar) => {
  const PATH_ROUTES = `${__dirname}/${rutaArchivo}`;

  try {
    const contenido = fs.readFileSync(PATH_ROUTES, 'utf8');

    // Concatenar el código a agregar al contenido existente
    const nuevoContenido = contenido + '\n' + codigoAgregar;

    // Escribir el nuevo contenido en el archivo
    fs.writeFileSync(PATH_ROUTES, nuevoContenido, 'utf8');

    console.log('Código agregado exitosamente al archivo.');
  } catch (error) {
    console.error('Error al leer o escribir en el archivo:', error);
    return;
  }

  return 'Nuevo User Creado';
};

export const eliminarUser = (rutaArchivo, textoBusqueda, nuevoContenido) => {

  const PATH_ROUTES = `${__dirname}\\${rutaArchivo}`;

  fs.readFile(PATH_ROUTES, 'utf8', (error, contenido) => {
    if (error) {
      console.error('Error al leer el archivo:', error);
      return;
    }

    // Reemplazar el texto en el contenido del archivo
    const contenidoModificado = contenido.replace(textoBusqueda, nuevoContenido);

    // Escribir el contenido modificado en el archivo
    fs.writeFile(PATH_ROUTES, contenidoModificado, 'utf8', (error) => {
      if (error) {
        console.error('Error al escribir en el archivo:', error);
        return;
      }

      console.log('Contenido reemplazado exitosamente en el archivo.');
    });
  });

  return 'User Eliminado';
};

export const exportarfun = (rutaArchivo) => {
  // Obtener la ruta absoluta del directorio
  const directorio = `${__dirname}\\${rutaArchivo}`;

  // Crear un contexto de requerimiento para el directorio
  const contexto = require.context(directorio, false, /\.js$/);

  // Objeto para almacenar todas las exportaciones
  const todasLasExportaciones = {};

  // Iterar sobre los módulos encontrados en el contexto
  contexto.keys().forEach((nombreArchivo) => {
    // Obtener el módulo exportado
    const modulo = contexto(nombreArchivo);

    // Obtener las exportaciones del módulo
    const exportaciones = Object.keys(modulo).reduce((acumulador, clave) => {
      acumulador[clave] = modulo[clave];
      return acumulador;
    }, {});

    // Fusionar las exportaciones con el objeto principal
    Object.assign(todasLasExportaciones, exportaciones);
  });

  // Exportar todas las exportaciones como un objeto
  // module.exports = todasLasExportaciones;

  return todasLasExportaciones;
}