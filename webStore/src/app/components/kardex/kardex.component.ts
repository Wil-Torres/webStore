import { Component, OnInit } from '@angular/core';
import { WebstoreService } from '../../services/webstore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit {
  objMovimientos: any = [];

  constructor(private movimientos: WebstoreService) { }

  ngOnInit() {
    this.objMovimientos = this.movimientos.getMovimientos();
    console.log(this.objMovimientos)
  }

}
