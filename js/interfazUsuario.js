const contenedorProductos = document.getElementById("contenedorProductos");

export function mostrarProductos(listaProductos) {

    let tarjetasProductos = "";

    listaProductos.forEach((producto) => {
        const tarjetaProducto = `
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="card h-100 shadow-sm">
                    <img
                        src="${producto.image}"
                        class="card-img-top p-3"
                        alt="${producto.title}"
                        style="height:250px; object-fit:contain;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">
                            ${producto.title}
                        </h5>
                        <p class="fw-bold text-success">
                            $${producto.price}
                        </p>
                        <button class="btn btn-primary mt-auto">
                            Ver detalles
                        </button>
                    </div>
                </div>
            </div>    
        `;
        
        tarjetasProductos += tarjetaProducto;

    });

    contenedorProductos.innerHTML = tarjetasProductos;
}