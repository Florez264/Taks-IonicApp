import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../categorias/categorias.component';


interface Categoria {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent {

  @Input() categories: Category[] = [];
  @Output() filterByCategory = new EventEmitter<number | undefined>();

  selectedCategoryId?: number; // Para rastrear la categoría seleccionada

  selectCategory(categoryId?: number) {
    this.selectedCategoryId = categoryId;
    this.filterByCategory.emit(categoryId);
  }

}
