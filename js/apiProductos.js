const URL_API_PRODUCTOS = "https://fakestoreapi.com/products";

export async function obtenerProductos() {

    const respuesta = await fetch(URL_API_PRODUCTOS);

    if (!respuesta.ok) {

        throw new Error("No fue posible obtener los productos.");

    }

    const listaProductos = await respuesta.json();

    return listaProductos;
}