import { obtenerProductos } from "./apiProductos.js";
import { mostrarProductos } from "./interfazUsuario.js";
import { inicializarCarrito } from "./carritoCompras.js";

async function iniciarAplicacion() {
    inicializarCarrito();
    
    try {

        const listaProductos = await obtenerProductos();

        mostrarProductos(listaProductos);

    } catch (error) {

        console.error("No fue posible obtener los productos.", error);

    }

}

iniciarAplicacion();

