
function productosAJSON(productos) {
  return JSON.stringify(productos);
}

const PRODUCTOS = [
  {
    nombre: "camiseta",
    precio: 35
  },
  {
    nombre: "camisa",
    precio: 30
  },
  {
    nombre: "pantalon",
    precio: 40
  },
  {
    nombre: "pantaloneta",
    precio: 20
  },
  {
    nombre: "medias",
    precio: 15
  }
];

let total = 0;
const contadorPrendas = {
  camiseta: 0,
  camisa: 0,
  pantalon: 0,
  pantaloneta: 0,
  medias: 0
};


function guardarDatosEnLocalStorage() {
  localStorage.setItem('total', total);
  localStorage.setItem('contadorPrendas', JSON.stringify(contadorPrendas));
  localStorage.setItem('productos', productosAJSON(PRODUCTOS));
}


function cargarDatosDesdeLocalStorage() {
  total = parseInt(localStorage.getItem('total')) || 0;
  const prendasGuardadas = JSON.parse(localStorage.getItem('contadorPrendas')) || {};
  for (const prenda in prendasGuardadas) {
    contadorPrendas[prenda] = prendasGuardadas[prenda];
    actualizarContador(prenda);
  }
  actualizarTotal();
}


window.addEventListener('load', () => {
  cargarDatosDesdeLocalStorage();
});

function agregarProducto(nombrePrenda) {
  const producto = PRODUCTOS.find(producto => producto.nombre === nombrePrenda);
  total += producto.precio;
  actualizarTotal();
  contadorPrendas[nombrePrenda]++;
  actualizarContador(nombrePrenda);
  guardarDatosEnLocalStorage(); 
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
  localStorage.clear(); // 
}

const productos = document.querySelectorAll("#productos li");
productos.forEach(producto => {
  producto.addEventListener("click", () => {
    const nombrePrenda = producto.id;
    agregarProducto(nombrePrenda);
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

