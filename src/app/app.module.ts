import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriasComponent } from './modules/categorias/categorias.component';
import { FiltrosComponent } from './modules/filtros/filtros.component';
import { TareasComponent } from './modules/tareas/tareas.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    FiltrosComponent,
    TabsComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    TareasComponent,
    CategoriasComponent,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
