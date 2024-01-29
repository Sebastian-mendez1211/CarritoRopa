    
    let total = 0;

    function agregarProducto(precio) {
      total += precio;
      actualizarTotal();
    }

    
    function actualizarTotal() {
      
      const totalElemento = document.getElementById("total");

      
      totalElemento.textContent = total;
    }

    function terminarCompra() {
      
      alert("¡Compra realizada! Total: $" + total);

      // Reiniciar el código para una nueva compra
      total = 0;
      actualizarTotal();
    }