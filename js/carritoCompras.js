let carritoCompras = [];

function actualizarCarrito() {

    console.table(carritoCompras);

    guardarCarritoEnLocalStorage();

}

function guardarCarritoEnLocalStorage() {

    const carritoFormatoJson = JSON.stringify(carritoCompras);

    localStorage.setItem("carritoCompras", carritoFormatoJson);
}

export function agregarProductoAlCarrito(producto) {
    const existeProductoEnCarrito = carritoCompras.some((productoCarrito) => {
        return productoCarrito.id === producto.id;
    });

    if (existeProductoEnCarrito) {
        const productoExistente = carritoCompras.find((productoCarrito) => {
            return productoCarrito.id === producto.id;
        });

        productoExistente.cantidad++;

    } else {
        const productoCarrito = {
            ...producto,
            cantidad: 1
        };

        carritoCompras.push(productoCarrito);
    }

    actualizarCarrito();
}

export function inicializarCarrito() {
    const carritoFormatoJson = localStorage.getItem("carritoCompras");

    if (carritoFormatoJson) {
        carritoCompras = JSON.parse(carritoFormatoJson);
    }

    console.log(carritoCompras);
}