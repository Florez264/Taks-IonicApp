import { Component, OnInit } from '@angular/core';

interface Categoria {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent  implements OnInit {

  categorias: Categoria[] = [];
  categoriaSeleccionada: number | null = null;

  ngOnInit() {
    // Datos de prueba
    this.categorias = [
      { id: 1, nombre: 'Trabajo' },
      { id: 2, nombre: 'Personal' },
      { id: 3, nombre: 'Otros' }
    ];
  }

  aplicarFiltro() {
    console.log('Filtro aplicado:', this.categoriaSeleccionada);
  }

}
