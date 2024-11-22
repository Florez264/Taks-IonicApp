import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TareasComponent } from './modules/tareas/tareas.component';
import { CategoriasComponent } from './modules/categorias/categorias.component';
import { FiltrosComponent } from './modules/filtros/filtros.component';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/tasks',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'tasks',
        component: TareasComponent,
      },
      {
        path: 'categories',
        component: CategoriasComponent,
      },
      {
        path: 'filters',
        component: FiltrosComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/tabs/tasks',
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
