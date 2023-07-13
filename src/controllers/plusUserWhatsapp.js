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

    console.log('Código agregado exitosamente.');
    return true;

  } catch (error) {
    console.error('Error al leer o escribir en el archivo:', error);
    return false;
  }
};

export const eliminarUser = (rutaArchivo, nuevoContenido, textoBusqueda, uniq) => {

  const PATH_ROUTES = `${__dirname}\\${rutaArchivo}`;

  try {
    fs.readFile(PATH_ROUTES, 'utf8', (error, contenido) => {

      // return contenido;
      if (error) {
        console.error('Error al leer el archivo:', error);
        return false;
      }

      // Reemplazar el texto en el contenido del archivo
      const contenidoModificado = contenido.replace(textoBusqueda, nuevoContenido);

      // Escribir el contenido modificado en el archivo
      fs.writeFile(PATH_ROUTES, contenidoModificado, 'utf8', (error) => {
        if (error) {
          console.error('Error al escribir en el archivo:', error);
          return false;
        }

        console.log('Contenido reemplazado exitosamente en el archivo.');
      });
    });

    let rutas = path.join(PATH_ROUTES, '..', '..', '..', '.wwebjs_auth', `session-client-${uniq}`)
    const resp = eliminarCarpetaUser(rutas);
    return resp;

  } catch (error) {
    return false;
  }
};

function eliminarCarpetaUser(ruta) {
  if (fs.existsSync(ruta)) {
    fs.readdirSync(ruta).forEach((archivo) => {
      const rutaCompleta = `${ruta}/${archivo}`;
      if (fs.lstatSync(rutaCompleta).isDirectory()) {
        eliminarCarpetaSync(rutaCompleta);
      } else {
        fs.unlinkSync(rutaCompleta);
      }
    });
    fs.rmdirSync(ruta);
    console.log(`Carpeta eliminada: ${ruta}`);
    return true;
  } else {
    console.log(`La carpeta no existe: ${ruta}`);
    return false
  }
}

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