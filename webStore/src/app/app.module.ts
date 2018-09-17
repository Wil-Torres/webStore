import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importacion para notificaciones
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth'

// enviroments config
import { environment } from '../environments/environment';

// Components
import { TodoComponent } from './components/todo/todo.component';

// rutas
import { APP_ROUTES } from './app.routes';

// services
import { TodoService } from './services/todo.service';
import { MarcasComponent } from './components/marcas/marcas.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { MedidasComponent } from './components/medidas/medidas.component';
import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';
import { ProductosComponent } from './components/productos/productos.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { SalidasComponent } from './components/salidas/salidas.component';
import { KardexComponent } from './components/kardex/kardex.component';
import { LoginComponent } from './components/login/login.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { UploadDirective } from './directivas/upload.directive';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { PreviewProductoComponent } from './components/preview-producto/preview-producto.component';
import { ProductoNuevoComponent } from './components/producto-nuevo/producto-nuevo.component';
import { ProductoEdicionComponent } from './components/producto-nuevo/producto-edicion.component';
import { ProcesarCompraComponent } from './components/procesar-compra/procesar-compra.component';
import { DireccionComponent } from './components/complementos/direccion/direccion.component';
import { PaymentComponent } from './components/complementos/payment/payment.component';
import { ReviewComponent } from './components/complementos/review/review.component';
import { ShippingComponent } from './components/complementos/shipping/shipping.component';
import { CartShoppingComponent } from './components/complementos/cart-shopping/cart-shopping.component';
import { TrayectoPedidoComponent } from './components/complementos/trayecto-pedido/trayecto-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    MarcasComponent,
    CategoriasComponent,
    MedidasComponent,
    NopagefoundComponent,
    ProductosComponent,
    EntradasComponent,
    SalidasComponent,
    KardexComponent,
    LoginComponent,
    AjustesComponent,
    UploadDirective,
    FileUploadComponent,
    PreviewProductoComponent,
    ProductoNuevoComponent,
    ProductoEdicionComponent,
    ProcesarCompraComponent,
    DireccionComponent,
    PaymentComponent,
    ReviewComponent,
    ShippingComponent,
    CartShoppingComponent,
    TrayectoPedidoComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
