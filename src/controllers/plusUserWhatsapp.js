import fs from 'fs';
import path from 'path';

export const agregarUser = (rutaArchivo, codigoAgregar) => {

  const currentModulePath = new URL(import.meta.url).pathname;
  const currentDirectory = path.dirname(currentModulePath);
  const rutaalter = path.join(currentDirectory, rutaArchivo);
  const PATH_ROUTES = rutaalter.slice(1);

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

  const currentModulePath = new URL(import.meta.url).pathname;
  const currentDirectory = path.dirname(currentModulePath);
  const rutaalter = path.join(currentDirectory, rutaArchivo);
  const PATH_ROUTES = rutaalter.slice(1);

  try {
    fs.readFile(PATH_ROUTES, 'utf8', (error, contenido) => {

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

  fs.readdirSync(ruta, { withFileTypes: true }).forEach((archivo) => {
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
}