import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebstoreService } from '../../../services/webstore.service';

@Component({
  selector: 'app-cart-shopping',
  templateUrl: './cart-shopping.component.html',
  styleUrls: ['./cart-shopping.component.css']
})
export class CartShoppingComponent implements OnInit {
  compra: any = [];
  totales: number = 0;

  constructor(private router: Router,private servicioMaestro: WebstoreService) {
    this.compra = (JSON.parse(localStorage.getItem('cartShop'))).carrito;
    if (this.compra) {
      this.actualizarTotal();
    }

  }

  ngOnInit() {
  }
  procesarCompra() {
    this.router.navigate(['/procesar']);
  }
  alcambiarCantidad(indice, item) {
    if (!item.cantidad || item.cantidad < 0) {
      console.warn('debe definir una cantidad ')
      return
    }
    this.compra[indice].subTotal = this.compra[indice].precio * this.compra[indice].cantidad;
    this.compra[indice].desc = this.compra[indice].descuento * this.compra[indice].subTotal / 100;
    this.compra[indice].total = this.compra[indice].subTotal - this.compra[indice].desc;
    this.actualizarTotal();
    window.localStorage.setItem('cartShop', JSON.stringify({ carrito: this.compra }));
  }
  actualizarTotal () {
    this.totales = 0;
    this.compra.forEach(element => {
      this.totales += element.total;
    });
  }
  borrarCompra(item){
    this.servicioMaestro.removeItemCart(item).subscribe(res => {
      this.compra = (JSON.parse(localStorage.getItem('cartShop'))).carrito;
      this.actualizarTotal();
    })
  }

}
