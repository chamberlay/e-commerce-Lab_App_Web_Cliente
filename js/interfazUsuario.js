const contenedorProductos = document.getElementById("contenedorProductos");

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

export function mostrarProductos(listaProductos) {

    let tarjetasProductos = "";

    listaProductos.forEach((producto) => {

        tarjetasProductos += crearTarjetaProducto(producto);

    });

    contenedorProductos.innerHTML = tarjetasProductos;

}