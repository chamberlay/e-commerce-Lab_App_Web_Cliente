const contenedorProductos = document.getElementById("contenedorProductos");

const imagenProductoModal = document.getElementById("imagenProductoModal");
const nombreProductoModal = document.getElementById("nombreProductoModal");
const precioProductoModal = document.getElementById("precioProductoModal");
const categoriaProductoModal = document.getElementById("categoriaProductoModal");
const descripcionProductoModal = document.getElementById("descripcionProductoModal");

const elementoModalProducto = document.getElementById("modalProducto");
const modalProducto = new bootstrap.Modal(elementoModalProducto);

let listaProductosDisponibles = [];

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

    const producto = listaProductosDisponibles.find((producto) => {
        return producto.id === idProducto;
    });

    mostrarModalProducto(producto);
}

function mostrarModalProducto({title, price, image, category, description}) {

    imagenProductoModal.src = image;
    nombreProductoModal.textContent = title;
    precioProductoModal.textContent = `$${price}`;
    categoriaProductoModal.textContent = category;
    descripcionProductoModal.textContent = description;

    modalProducto.show();
}

export function mostrarProductos(listaProductos) {
    listaProductosDisponibles = listaProductos;

    let tarjetasProductos = "";
    listaProductos.forEach((producto) => {
        tarjetasProductos += crearTarjetaProducto(producto);
    });
    contenedorProductos.innerHTML = tarjetasProductos;
    
    const botonesVerDetalles =
    document.querySelectorAll(".botonVerDetalles");
    botonesVerDetalles.forEach((boton) => {
        boton.addEventListener("click", manejarClickVerDetalles);
    });
}

