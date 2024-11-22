import { Component, OnInit } from '@angular/core';

interface Categoria {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent  implements OnInit {

  categorias: Categoria[] = [];
  nuevaCategoria: string = '';

  ngOnInit() {
    // Datos de prueba
    this.categorias = [
      { id: 1, nombre: 'Trabajo' },
      { id: 2, nombre: 'Personal' },
      { id: 3, nombre: 'Otros' }
    ];
  }

  agregarCategoria() {
    if (this.nuevaCategoria.trim()) {
      const nueva: Categoria = {
        id: Date.now(),
        nombre: this.nuevaCategoria
      };
      this.categorias.push(nueva);
      this.nuevaCategoria = '';
    }
  }

  eliminarCategoria(id: number) {
    this.categorias = this.categorias.filter(categoria => categoria.id !== id);
  }

}
