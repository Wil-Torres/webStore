import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  compra: any = [];

  constructor(private router: Router) {
    this.compra = (JSON.parse(localStorage.getItem('cartShop'))).carrito;
   }

  ngOnInit() {
  }
  editarCarrito() {
    this.router.navigate(['/carrito']);
  } 

}
