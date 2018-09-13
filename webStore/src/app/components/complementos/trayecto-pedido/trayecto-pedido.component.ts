import { Component, OnInit, Input, Output } from '@angular/core';
import { WebstoreProductosService } from '../../../services/webstore-productos.service';

@Component({
  selector: 'app-trayecto-pedido',
  templateUrl: './trayecto-pedido.component.html',
  styleUrls: ['./trayecto-pedido.component.css']
})
export class TrayectoPedidoComponent implements OnInit {
  pedido: any = [
    {caption: 'Paso 1', date: '10/09/2018', selected: false},
    {caption: 'Paso 2', date: '11/09/2018', selected: false},
    {caption: 'paso 3', date: '12/09/2018', selected: false},
    {caption: 'Paso 4', date: '13/09/2018', selected: false},
    {caption: 'Paso 5', date: '14/09/2018', selected: false}
  ];
  pedidos: any = [];
  trayectoPedido: any = {
    pedidoNumero: 125389,
    shipping: 'as21831',
    estado: 'Calamidad',
    fecha: '12/09/2018'
  };

  constructor(private svrPedido: WebstoreProductosService) {
    this.pedidos = this.svrPedido.getPedidos()
   }

  ngOnInit() {
  }

  verEvento () {
    alert('en construccion');
  }

}
