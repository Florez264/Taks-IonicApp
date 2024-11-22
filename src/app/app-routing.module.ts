import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TareasComponent } from './modules/tareas/tareas.component';
import { CategoriasComponent } from './modules/categorias/categorias.component';
import { FiltrosComponent } from './modules/filtros/filtros.component';

const routes: Routes = [
  { path: '', redirectTo: 'tareas', pathMatch: 'full' },
  { path: 'tareas', component: TareasComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'filtros', component: FiltrosComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
