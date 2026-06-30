import { obtenerProductos } from "./apiProductos.js";

async function iniciarAplicacion() {

    try {

        const listaProductos = await obtenerProductos();

        console.log(listaProductos);

    } catch (error) {

        console.error("No fue posible obtener los productos.", error);

    }

}

iniciarAplicacion();