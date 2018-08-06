import { RouterModule, Routes } from '@angular/router'
import { MarcasComponent } from './components/marcas/marcas.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { MedidasComponent } from './components/medidas/medidas.component';
import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';

// definir rutas
const appRoutes: Routes = [
    {path:'marcas', component: MarcasComponent},
    {path:'categorias', component: CategoriasComponent},
    {path:'medidas', component: MedidasComponent},
    {path: '**', component: NopagefoundComponent}
];

// exportamos el router para importar en otro servicio
export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true} );
