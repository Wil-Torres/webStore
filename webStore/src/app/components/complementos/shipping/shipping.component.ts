import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  @Input('obj1') public objeto:any={}
  @Output() obj: EventEmitter<any> = new EventEmitter();
  constructor() { 
    this.procesoFacturacion().subscribe(res => {
      this.obj.emit(this.objeto);
    })
  }

  ngOnInit() {
  }
  procesoFacturacion(): Observable<{}> {
    let obs = new Observable(observer => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        this.obj.emit(this.objeto);
        observer.next(contador)
        if (contador === 5) {
          clearInterval(intervalo);
          observer.complete();
        }
      }, 1000)

    });
    return obs;
  }

}
