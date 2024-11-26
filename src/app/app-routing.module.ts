import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
     path: 'tasks', 
     loadComponent: () => import('./modules/tareas/tareas.component').then(m => m.TareasComponent), 
  },
  { 
    path: 'categories', 
    loadComponent: () => import('./modules/categorias/categorias.component').then(m => m.CategoriasComponent), 
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
