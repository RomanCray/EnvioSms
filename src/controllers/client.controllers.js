// import fs from 'fs';
import fs from 'fs/promises';


export const initFile = async () => {
  try {
    await fs.access('clientes.txt');
    return { success: true, resultCli: 'Existe el archivo.' };
  } catch (error) {
    await fs.writeFile('clientes.txt', '');
    return { success: true, resultCli: ' Archivo creado.' };
  }
};

export const createClient = async (id) => {
  try {
    const contenido = await fs.readFile('clientes.txt', 'utf-8');
    await fs.writeFile('clientes.txt', `${contenido}${contenido ? ',\n' : ''}${id}`);
    return { success: true, resultCli: 'Cliente creado exitosamente.' };
  } catch (error) {
    return { success: false, resultCli: 'Error al crear el cliente.' };
  }
};

export const deleteClient = async (id) => {
  try {
    let contenido = await fs.readFile('clientes.txt', 'utf-8');
    
    // Modifica la expresión regular para manejar el caso del primer cliente
    contenido = contenido.replace(new RegExp(`(^|,)${id}(,|$)`, 'gm'), '');

    await fs.writeFile('clientes.txt', contenido.trim());
    return { success: true, resultCli: 'Cliente eliminado exitosamente.' };
  } catch (error) {
    return { success: false, resultCli: 'Error al eliminar el cliente.' };
  }
};


export const listClients = async () => {
  try {
    const contenido = await fs.readFile('clientes.txt', 'utf-8');
    const clients = contenido.split(',\n').filter(Boolean);
    return { success: true, clients };
  } catch (error) {
    return { success: false, error: 'Error al obtener la lista de clientes.' };
  }
};

// module.exports = { initFile, createClient, deleteClient, listClients };
