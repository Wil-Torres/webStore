import { Component, OnInit } from '@angular/core';
import { WebstoreService } from '../../services/webstore.service';
import { WebstoreProductosService } from '../../services/webstore-productos.service';

@Component({
  selector: 'app-procesar-compra',
  templateUrl: './procesar-compra.component.html',
  styleUrls: ['./procesar-compra.component.css']
})
export class ProcesarCompraComponent implements OnInit {
  currentTab = 0; // Current tab is set to be the first tab (0)
  confirmacion = {}
  compra: any = [];
  constructor(private srvProducto: WebstoreService, private srvAux: WebstoreProductosService) { 
    this.confirmacion = JSON.parse(sessionStorage.getItem('confirmShop'));
    this.compra = (JSON.parse(localStorage.getItem('cartShop'))).carrito;
  }

  ngOnInit() {
    this.showTab(this.currentTab); // Display the crurrent tab
  }
  
showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n]['style'].display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Comprar";
  } else {
    document.getElementById("nextBtn").innerHTML = "Siguiente";
  }
  //... and run a function that will display the correct step indicator:
  this.fixStepIndicator(n)
}

nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !this.validateForm()) return false;
  // Hide the current tab:
  x[this.currentTab]['style'].display = "none";
  // Increase or decrease the current tab by 1:
  this.currentTab = this.currentTab + n;
  // if you have reached the end of the form...
  if (this.currentTab >= x.length) {
    // ... the form gets submitted:
    this.compraVerificada();
    this.currentTab = 0;
    this.showTab(this.currentTab);
    return false;
  }
  // Otherwise, display the correct tab:
  this.showTab(this.currentTab);
}

validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[this.currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[this.currentTab].className += " finish";
  }
  return valid; // return the valid status
}

fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  this.actualizarConfirmacion();
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

actualizarConfirmacion () {
  sessionStorage.setItem('confirmShop', JSON.stringify(this.confirmacion));
}
consulta () {
  console.log(this.confirmacion);
}
compraVerificada(){
  let pedido = {
    pedidoNumero: null,
    fecha: new Date(),
    estado: 1,
    monto: 150,
    confirmacionPago: this.confirmacion,
    detalle: this.compra,
    uidCompra: 1
  }
  this.srvAux.addPedido(null, pedido).then(pedidoNuevo => {
    console.log(pedidoNuevo.id);
    pedidoNuevo.update({pedidoNumero: pedidoNuevo.id}).then(actualizado => {
      alert('pedido creado y actualizado');
    })
    
  })
}

}
