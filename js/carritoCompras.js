let carritoCompras = [];

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

    console.table(carritoCompras);
}