import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TareasComponent } from './modules/tareas/tareas.component';
import { CategoriasComponent } from './modules/categorias/categorias.component';
import { FiltrosComponent } from './modules/filtros/filtros.component';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
     path: 'tasks', loadComponent: () => import('./modules/tareas/tareas.component').then(m => m.TareasComponent) 
  },
  { 
    path: 'categories', loadComponent: () => import('./modules/categorias/categorias.component').then(m => m.CategoriasComponent) 
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    IonicModule.forRoot(),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
