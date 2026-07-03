let carritoCompras = [];

const badgeCantidadCarrito = document.getElementById("badgeCantidadCarrito");

function actualizarCarrito() {

    guardarCarritoEnLocalStorage();

    actualizarBadgeCarrito();

    mostrarProductosCarrito();
}

function guardarCarritoEnLocalStorage() {

    const carritoFormatoJson = JSON.stringify(carritoCompras);

    localStorage.setItem("carritoCompras", carritoFormatoJson);
}

function actualizarBadgeCarrito() {

    const cantidadProductos = carritoCompras.reduce((total, producto) => {

        return total + producto.cantidad;

    }, 0);

    badgeCantidadCarrito.textContent = cantidadProductos;

    badgeCantidadCarrito.classList.toggle(
        "d-none",
        cantidadProductos === 0
    );
}

function mostrarProductosCarrito() {

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

    actualizarCarrito();
}