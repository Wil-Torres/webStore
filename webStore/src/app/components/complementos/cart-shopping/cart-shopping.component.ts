import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-shopping',
  templateUrl: './cart-shopping.component.html',
  styleUrls: ['./cart-shopping.component.css']
})
export class CartShoppingComponent implements OnInit {
  compra: any = [];

  constructor(private router: Router) {
    this.compra = (JSON.parse(localStorage.getItem('cartShop'))).carrito;
   }

  ngOnInit() {
  }
  procesarCompra () {
    this.router.navigate(['/procesar']);
  }

}
