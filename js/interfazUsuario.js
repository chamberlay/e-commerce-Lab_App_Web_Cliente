import { agregarProductoAlCarrito } from "./carritoCompras.js";

const contenedorProductos = document.getElementById("contenedorProductos");
const campoBusquedaProductos = document.getElementById("campoBusquedaProductos");
const selectorCategoriaProductos = document.getElementById("selectorCategoriaProductos");
const imagenProductoModal = document.getElementById("imagenProductoModal");
const nombreProductoModal = document.getElementById("nombreProductoModal");
const precioProductoModal = document.getElementById("precioProductoModal");
const categoriaProductoModal = document.getElementById("categoriaProductoModal");
const descripcionProductoModal = document.getElementById("descripcionProductoModal");
const botonAgregarCarritoModal = document.getElementById("botonAgregarCarritoModal");

const elementoModalProducto = document.getElementById("modalProducto");
const modalProducto = new bootstrap.Modal(elementoModalProducto);

botonAgregarCarritoModal.addEventListener(
    "click",
    manejarClickAgregarCarrito
);

campoBusquedaProductos.addEventListener(
    "input",
    manejarBusquedaProductos
);

selectorCategoriaProductos.addEventListener(
    "change",
    manejarCambioCategoria
);

let listaProductosOriginal = [];

let productoSeleccionado = null;

function crearTarjetaProducto({id, title, price, image}) {

    return `
        <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="card h-100 shadow-sm">

                <img
                    src="${image}"
                    class="card-img-top p-3 imagenProducto"
                    alt="${title}">

                <div class="card-body d-flex flex-column">

                    <h5 class="card-title">
                        ${title}
                    </h5>

                    <p class="fw-bold text-success">
                        $${price}
                    </p>

                <button
                    class="btn btn-primary mt-auto botonVerDetalles"
                    data-id="${id}">
                    Ver detalles
                </button>

                </div>

            </div>
        </div>
    `;

}

function manejarClickVerDetalles(evento) {

    const idProducto = Number(evento.target.dataset.id);

    const producto = listaProductosOriginal.find((producto) => {
        return producto.id === idProducto;
    });

    mostrarModalProducto(producto);
}

function mostrarModalProducto(producto) {
    productoSeleccionado = producto;

    const { title, price, image, category, description } = producto;

    imagenProductoModal.src = image;
    nombreProductoModal.textContent = title;
    precioProductoModal.textContent = `$${price}`;
    categoriaProductoModal.textContent = category;
    descripcionProductoModal.textContent = description;

    modalProducto.show();
}

function manejarClickAgregarCarrito() {

    agregarProductoAlCarrito(productoSeleccionado);
    modalProducto.hide();

    Swal.fire({
        icon: "success",
        title: "Producto agregado",
        text: "El producto fue agregado al carrito.",
        timer: 1500,
        showConfirmButton: false
    });
}

function manejarBusquedaProductos() {

    const textoBusqueda =
        campoBusquedaProductos.value.toLowerCase();

    const productosFiltrados =
        listaProductosOriginal.filter((producto) => {
            return producto.title
                .toLowerCase()
                .includes(textoBusqueda);
        });

    mostrarProductos(productosFiltrados);
}

function manejarCambioCategoria() {

    const categoriaSeleccionada =
        selectorCategoriaProductos.value;

    if (categoriaSeleccionada === "todas") {
        mostrarProductos(listaProductosOriginal);
        return;
    }

    const productosFiltrados =
        listaProductosOriginal.filter((producto) => {
            return producto.category === categoriaSeleccionada;
        });

    mostrarProductos(productosFiltrados);
}

export function mostrarProductos(listaProductos) {
    if (listaProductosOriginal.length === 0) {
        listaProductosOriginal = [...listaProductos];
    }

    let htmlTarjetasProductos = "";
    listaProductos.forEach((producto) => {
        htmlTarjetasProductos += crearTarjetaProducto(producto);
    });
    contenedorProductos.innerHTML = htmlTarjetasProductos;
    
    const botonesVerDetalles =
    contenedorProductos.querySelectorAll(".botonVerDetalles");
    botonesVerDetalles.forEach((boton) => {
        boton.addEventListener("click", manejarClickVerDetalles);
    });
}

