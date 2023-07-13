class itemFactura{
    id;
    nombre;
    precio;
    imagen;
    alt;

    constructor(id, nombre, precio, imagen, alt){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio,
        this.imagen = imagen
        this.alt = alt
    }
}

let arrayCarrito = [];

function inicio(){
    document.addEventListener('DOMContentLoaded', traerCarrito);
    mostrarCatalogo();
}


 function traerCarrito(){
    arrayCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    mostrarCarrito();
}

function carritoAlStorage(){
    localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
}


function mostrarCarrito() {
    let tabla = document.getElementById('tablaBody');
    tabla.innerHTML = '';
    arrayCarrito.forEach((producto) => {
        filaTabla(producto, tabla);

    })

    const filaTotal = document.createElement('tr');
    filaTotal.classList.add('itemTicket', 'filaTotal');

    let thTotal = document.createElement('th');
    thTotal.colSpan = 2;
    thTotal.classList.add('totalTexto');
    thTotal.textContent = 'Total:';
    filaTotal.appendChild(thTotal);

    let tdTotal = document.createElement('td');
    tdTotal.classList.add('precioColumna')
    tdTotal.innerHTML = `$ ${(arrayCarrito.reduce((total, producto) => total + (producto.precio*producto.cantidad), 0)).toLocaleString()}`;
    filaTotal.appendChild(tdTotal);

    tabla.appendChild(filaTotal);

    let botonLimpiar = document.createElement('button');
    botonLimpiar.className = 'borrarCarrito';
    botonLimpiar.innerText = 'Limpiar';
    tabla.appendChild(botonLimpiar);
    botonLimpiar.addEventListener('click', () => {limpiarCarrito()})
}
function filaTabla(producto, tabla){
    const fila = document.createElement('tr');
    fila.classList.add('itemTicket');
    
    let dato = document.createElement('td');
    dato.innerHTML = `<div class="itemEnTabla"><img class="imgCarrito" src="./img/productos/${producto.imagen}" alt="${producto.alt}"><p class="nombreEnTabla">${producto.nombre}</p></div>`;
    fila.appendChild(dato);
    
    dato = document.createElement('td');
    dato.classList.add('tdCantidad')
    dato.innerHTML = `    <div class="celdaCantidad">
                            <button id="restar-${producto.id}">-</button>
                            <p class="cantidadTicket">${producto.cantidad}</p>
                            <button id="sumar-${producto.id}">+</button>
                        </div>`
    fila.appendChild(dato);
    
    dato = document.createElement('td');
    dato.classList.add('precioColumna');
    dato.innerHTML = `$ ${(producto.precio*producto.cantidad).toLocaleString()}`;
    fila.appendChild(dato);
    
    tabla.appendChild(fila);
    const botonResta = document.getElementById(`restar-${producto.id}`);
    botonResta.addEventListener('click', () => {decrementarProducto(producto)});
    const botonSuma = document.getElementById(`sumar-${producto.id}`);
    botonSuma.addEventListener('click', () => {agregarCarrito(producto)});

}

function limpiarCarrito (){
    arrayCarrito.splice(0,arrayCarrito.length);
    arrayCarrito = [];
    carritoAlStorage()
    mostrarCarrito()
}

function mostrarCatalogo (){
    let seccionProductos = document.getElementById('divDestacados');
    seccionProductos.innerHTML = '';
    catalogo.forEach((elemento) => {
        tarjeta(elemento, seccionProductos);
    });
}

function agregarCarrito (eleccion){
    let indice = arrayCarrito.findIndex((el) => el.id === eleccion.id);
    if(indice !== -1){
        arrayCarrito[indice].cantidad++;
    }else{
        let nuevoItem = new ItemFactura(eleccion.id, eleccion.nombre, eleccion.precio, 1, eleccion.imagen, eleccion.alternativo);
        arrayCarrito.push(nuevoItem);
    }
    carritoAlStorage();
    mostrarCarrito();
}


function decrementarProducto(eleccion){
    let indice = arrayCarrito.findIndex((el) => el.id === eleccion.id);
    if (arrayCarrito[indice].cantidad == 1){
        arrayCarrito.splice([indice],1);
    }else{
        arrayCarrito[indice].cantidad--;
    }
    carritoAlStorage();
    mostrarCarrito();
}


function tarjeta(producto, seccion){
    let {id, nombre, precio, imagen, alt} = producto;
    let card = document.createElement('div');
    card.classList.add('d-flex', 'justify-content-center');

    let figure = document.createElement('figure');
    figure.classList.add('producto');
    figure.innerHTML = `<div><img src="./img/${imagen}" alt="${alt}"></div>
                        <div class="info-producto">
                            <figcaption><p>${nombre}</p></figcaption>
                            <p>$ ${precio.toLocaleString()}</p>
                            <button id="agregar-${id}">Agregar al carrito</button>
                        </div>`;
    card.appendChild(figure);
    seccion.appendChild(card);
    const botonAgregar = document.getElementById(`agregar-${id}`);
    botonAgregar.onclick = () => {agregarCarrito(producto)};
}



//INICIO DEL PROGRAMA
inicio()