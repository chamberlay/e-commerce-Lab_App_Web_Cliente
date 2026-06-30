import { obtenerProductos } from "./apiProductos.js";
import { mostrarProductos } from "./interfazUsuario.js";

async function iniciarAplicacion() {

    try {

        const listaProductos = await obtenerProductos();

        mostrarProductos(listaProductos);

    } catch (error) {

        console.error("No fue posible obtener los productos.", error);

    }

}

iniciarAplicacion();

