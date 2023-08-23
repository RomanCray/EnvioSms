import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const rutaControllers = (rutaArchivo) => {

  const currentModulePath = new URL(import.meta.url).pathname;
  const currentDirectory = path.dirname(currentModulePath);
  // const PATH_ROUTES = path.join(currentDirectory, rutaArchivo);
  const rutaalter = path.join(currentDirectory, rutaArchivo);
  const PATH_ROUTES = rutaalter.slice(1);

  return PATH_ROUTES;
}

export const agregarUser = (rutaArchivo, codigoAgregar) => {

  const PATH_ROUTES = rutaControllers(rutaArchivo);

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

// export const eliminarUser = (rutaArchivo, nuevoContenido, textoBusqueda, uniq) => {

//   const currentModulePath = new URL(import.meta.url).pathname;
//   const currentDirectory = path.dirname(currentModulePath);
//   // const PATH_ROUTES = path.join(currentDirectory, rutaArchivo);
//   const rutaalter = path.join(currentDirectory, rutaArchivo);
//   const PATH_ROUTES = rutaalter.slice(1);
//   let very = false

//   try {
//     fs.readFile(PATH_ROUTES, 'utf8', (error, contenido) => {

//       if (error) {
//         console.error('Error al leer el archivo:', error);
//         return false;
//       }

//       // Reemplazar el texto en el contenido del archivo
//       const contenidoModificado = contenido.replace(textoBusqueda, nuevoContenido);

//       // Escribir el contenido modificado en el archivo
//       fs.writeFile(PATH_ROUTES, contenidoModificado, 'utf8', (error) => {
//         if (error) {
//           console.error('Error al eliminar el archivo:', error);
//           return false;
//         }

//         console.log('Contenido elimnado exitosamente en el archivo.\n');
//       });

//       very = true;
//     });

//     if (very) {
//       const rutas = path.join(PATH_ROUTES, '..', '..', '..', '.wwebjs_auth', `session-client-${uniq}`)
//       const resp = eliminarCarpetaUser(rutas);
//       return resp;
//     } else {
//       return very;
//     }

//   } catch (error) {
//     return false;
//   }
// };

export const eliminarUser = async (rutaArchivo, nuevoContenido, textoBusqueda, uniq) => {
  const PATH_ROUTES = rutaControllers(rutaArchivo);

  try {
    const contenido = await promisify(fs.readFile)(PATH_ROUTES, 'utf8');

    const contenidoModificado = contenido.replace(textoBusqueda, nuevoContenido);

    await promisify(fs.writeFile)(PATH_ROUTES, contenidoModificado, 'utf8');
    console.log('Contenido eliminado exitosamente del archivo.\n');

    const rutas = path.join(PATH_ROUTES, '..', '..', '..', '.wwebjs_auth', `session-client-${uniq}`);

    return ({ result: true, carpeta: rutas });
  } catch (error) {
    console.error('Error:', error);
    return ({ result: false });
  }
};

export function eliminarCarpetaUser(ruta) {
  try {
    fs.readdirSync(ruta, { withFileTypes: true }).forEach((archivo) => {
      const rutaCompleta = `${ruta}/${archivo.name}`;
      if (archivo.isDirectory()) {
        eliminarCarpetaUser(rutaCompleta);
      } else {
        fs.unlinkSync(rutaCompleta);
      }
    });

    fs.rmdirSync(ruta);
    console.log(`Carpeta eliminada: ${ruta}`);
    return ({ result: true });
  } catch (error) {
    console.error(`Error al eliminar la carpeta ${ruta}: ${error.message}`);
    return ({ result: true });
  }
}

export const captureUsers = (rutaArchivo, user) => {
  const PATH_ROUTES = rutaControllers(rutaArchivo);

  return new Promise((resolve, reject) => {
    fs.appendFile(PATH_ROUTES, user + '\n', (err) => {
      if (err) {
        console.error('Error al escribir en el archivo:', err);
        reject(err);
      } else {
        console.log('User almacenado con éxito');
        resolve(true);
      }
    });
  });
};

export const listUsers = (rutaArchivo) => {
  const PATH_ROUTES = rutaControllers(rutaArchivo);

  return new Promise((resolve, reject) => {
    fs.readFile(PATH_ROUTES, 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo:', err);
        reject(err);
      } else {
        console.log("*-*-*-*-*-*")
        if (!data.trim()) {
          console.log('El archivo está vacío o contiene solo espacios en blanco.');
          resolve([null]);
        } else {
          const lines = data.trim().split('\n');
          const numbersArray = lines.map(line => {
            console.log("* " + line);
            return parseInt(line); // Debes devolver el resultado de parseInt
          });
          console.log("*-*-*-*-*-*")
          resolve(numbersArray);
        }
      }
    });
  });
};