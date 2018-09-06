import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  compra: any = [];

  constructor() {
    this.compra = (JSON.parse(localStorage.getItem('cartShop'))).carrito;
   }

  ngOnInit() {
  }
  editarCarrito() {
    alert('En construccion');
  } 

}
