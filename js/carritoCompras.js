let carritoCompras = [];

const badgeCantidadCarrito = document.getElementById("badgeCantidadCarrito");

const contenedorProductosCarrito = document.getElementById("contenedorProductosCarrito");
contenedorProductosCarrito.addEventListener(
    "click",
    manejarClickCarrito
);

const textoTotalCarrito = document.getElementById("textoTotalCarrito");
const botonFinalizarCompra = document.getElementById("botonFinalizarCompra");

function actualizarCarrito() {

    guardarCarritoEnLocalStorage();

    actualizarBadgeCarrito();

    actualizarTotalCarrito();

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

function actualizarTotalCarrito() {

    const totalCarrito = carritoCompras.reduce((total, producto) => {

        return total + (producto.price * producto.cantidad);

    }, 0);

    textoTotalCarrito.textContent =
        `$${totalCarrito.toFixed(2)}`;
}

function crearTarjetaProductoCarrito({id, title, price, image, cantidad}) {

    return `
        <div class="card mb-3">

            <div class="row g-0">
                <div class="col-4">
                    <img
                        src="${image}"
                        class="img-fluid rounded-start p-2"
                        alt="${title}">
                </div>

                <div class="col-8">
                    <div class="card-body">
                        <h6 class="card-title">
                            ${title}
                        </h6>

                        <p class="text-success fw-bold mb-1">
                            $${price}
                        </p>

                        <div class="d-flex align-items-center gap-2 mt-2">
                            <button
                                class="btn btn-sm btn-outline-secondary botonDisminuirCantidad"
                                data-id="${id}">

                                <i class="bi bi-dash"></i>
                            </button>

                            <span class="fw-bold">
                                ${cantidad}
                            </span>

                            <button
                                class="btn btn-sm btn-outline-secondary botonAumentarCantidad"
                                data-id="${id}">

                                <i class="bi bi-plus"></i>
                            </button>

                            <button
                                class="btn btn-sm btn-outline-danger ms-auto botonEliminarProducto"
                                data-id="${id}">

                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function manejarClickCarrito(evento) {

    const boton = evento.target.closest("button");

    if (!boton) {
        return;
    }

    const idProducto = Number(boton.dataset.id);

    if (boton.classList.contains("botonAumentarCantidad")) {
        aumentarCantidadProducto(idProducto);
    }

    if (boton.classList.contains("botonDisminuirCantidad")) {
        disminuirCantidadProducto(idProducto);
    }

    if (boton.classList.contains("botonEliminarProducto")) {
        eliminarProductoCarrito(idProducto);
    }
}

function mostrarProductosCarrito() {
    if (carritoCompras.length === 0) {

        contenedorProductosCarrito.innerHTML = `
            <p class="text-center text-muted">
                El carrito está vacío.
            </p>
        `;

        return;

    }

    let htmlProductosCarrito = "";

    carritoCompras.forEach((producto) => {

        htmlProductosCarrito +=
            crearTarjetaProductoCarrito(producto);

    });

    contenedorProductosCarrito.innerHTML = htmlProductosCarrito;

    contenedorProductosCarrito.addEventListener(
        "click",
        manejarClickCarrito
    );


}

function aumentarCantidadProducto(idProducto) {

    const producto = carritoCompras.find((productoCarrito) => {
        return productoCarrito.id === idProducto;
    });

    producto.cantidad++;

    actualizarCarrito();
}

function disminuirCantidadProducto(idProducto) {

    const producto = carritoCompras.find((productoCarrito) => {
        return productoCarrito.id === idProducto;
    });

    if (producto.cantidad > 1) {
        producto.cantidad--;
    } else {
        eliminarProductoCarrito(idProducto);
        return;
    }

    actualizarCarrito();
}

function eliminarProductoCarrito(idProducto) {

    carritoCompras = carritoCompras.filter((productoCarrito) => {
        return productoCarrito.id !== idProducto;
    });

    actualizarCarrito();
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