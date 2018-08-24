import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';

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
    KardexComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
