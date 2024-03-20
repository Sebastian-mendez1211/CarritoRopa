let total = 0;
const contadorPrendas = {
  camiseta: 0,
  camisa: 0,
  pantalon: 0,
  pantaloneta: 0,
  medias: 0
};

async function cargarDatosDesdeLocalStorage() {
    try {
        await cargarDatosDesdeJSON();
        total = parseInt(localStorage.getItem('total')) || 0;
        const prendasGuardadas = JSON.parse(localStorage.getItem('contadorPrendas')) || {};
        for (const prenda in prendasGuardadas) {
            contadorPrendas[prenda] = prendasGuardadas[prenda];
            actualizarContador(prenda);
        }
        actualizarTotal();
    } catch (error) {
        console.error('Error al cargar datos desde el almacenamiento local:', error);
    }
}

function guardarDatosEnLocalStorage() {
    localStorage.setItem('total', total);
    localStorage.setItem('contadorPrendas', JSON.stringify(contadorPrendas));
}

async function cargarDatosDesdeJSON() {
    try {
        const respuesta = await fetch('productos.json');
        const productosJSON = await respuesta.json();
        localStorage.setItem('productos', JSON.stringify(productosJSON));
    } catch (error) {
        console.error('Error al cargar datos desde el archivo JSON:', error);
    }
}

async function agregarProducto(nombrePrenda) {
    try {
        const productosJSON = JSON.parse(localStorage.getItem('productos')) || [];
        const producto = productosJSON.find(producto => producto.nombre === nombrePrenda);
        if (producto) {
            total += producto.precio;
            actualizarTotal();
            contadorPrendas[nombrePrenda]++;
            actualizarContador(nombrePrenda);
            guardarDatosEnLocalStorage();
        } else {
            console.error('El producto no se encontró en el archivo JSON.');
        }
    } catch (error) {
        console.error('Error al agregar producto:', error);
    }
}

async function quitarProducto(nombrePrenda) {
    try {
        const productosJSON = JSON.parse(localStorage.getItem('productos')) || [];
        const producto = productosJSON.find(producto => producto.nombre === nombrePrenda);
        if (producto && contadorPrendas[nombrePrenda] > 0) {
            total -= producto.precio;
            contadorPrendas[nombrePrenda]--;
            actualizarTotal();
            actualizarContador(nombrePrenda);
            guardarDatosEnLocalStorage(); 
        } else {
            console.error('El producto no se encontró en el archivo JSON o no hay existencias.');
        }
    } catch (error) {
        console.error('Error al quitar producto:', error);
    }
}

function actualizarTotal() {
  const totalElemento = document.getElementById("total");
  totalElemento.textContent = total;
}

function actualizarContador(nombrePrenda) {
  const contadorElemento = document.getElementById("contador-" + nombrePrenda);
  contadorElemento.textContent = contadorPrendas[nombrePrenda];
}

function reiniciarCompra() {
  total = 0;
  for (const prenda in contadorPrendas) {
    contadorPrendas[prenda] = 0;
    actualizarContador(prenda);
  }
  actualizarTotal();

}


window.addEventListener('load', () => {
  cargarDatosDesdeLocalStorage();
});

const productos = document.querySelectorAll("#productos li");
productos.forEach(producto => {
  const nombrePrenda = producto.id;
  const masButton = producto.querySelector(".mas");
  const menosButton = producto.querySelector(".menos");

  masButton.addEventListener("click", () => {
    agregarProducto(nombrePrenda);
  });

  menosButton.addEventListener("click", () => {
    quitarProducto(nombrePrenda);
  });
});

const finalizarCompraButton = document.getElementById("finalizar-compra");
finalizarCompraButton.addEventListener("click", () => {
  console.log("Total de la compra: $" + total);
  console.log("Número de prendas compradas:");
  for (const prenda in contadorPrendas) {
    console.log(prenda + ": " + contadorPrendas[prenda]);
  }
  reiniciarCompra();
});

const btnUno = document.getElementById('finalizar-compra');

 btnUno.addEventListener('click', ()=>{
    Swal.fire({
        title: "Compra finalizada",
        
        text: "Muchas gracias por comprar con nosotros.",

        imageUrl: "./img/lista-de-verificacion.png",
        confirmButtonText:"aceptar"


    })
  })
