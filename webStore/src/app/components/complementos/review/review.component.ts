import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input('obj1') public compra:any=[]
  constructor(private router: Router) {
   }

  ngOnInit() {
  }
  editarCarrito() {
    this.router.navigate(['/carrito']);
  } 

}
