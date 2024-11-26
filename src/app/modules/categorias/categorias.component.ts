import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import {NgClass, NgForOf, NgIf, NgStyle, SlicePipe} from "@angular/common";

export interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [NgForOf, CommonModule, FormsModule, IonicModule],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent  implements OnInit {
  categories: Category[] = [];
  newCategoryName: string = '';
  editingCategory: Category | null = null;

  ngOnInit(): void {
    this.loadCategories();
  }

  // Cargar categorías del almacenamiento local
  loadCategories() {
    const storedCategories = localStorage.getItem('categories');
    this.categories = storedCategories ? JSON.parse(storedCategories) : [];
  }

  // Guardar categorías en el almacenamiento local
  saveCategories() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  // Agregar una nueva categoría
  addCategory() {
    if (this.newCategoryName.trim()) {
      const exists = this.categories.some(
        category => category.name.toLowerCase() === this.newCategoryName.trim().toLowerCase()
      );
      if (exists) {
        alert('La categoría ya existe.');
        return;
      }
      this.categories.push({
        id: Date.now(),
        name: this.newCategoryName.trim()
      });
      this.newCategoryName = '';
      this.saveCategories();
    }
  }
  

  // Editar categoría
  editCategory(category: Category) {
    this.editingCategory = { ...category };
  }

  // Guardar cambios en la categoría editada
  saveCategory() {
    if (!this.editingCategory) return;
    const index = this.categories.findIndex(c => c.id === this.editingCategory?.id);
    if (index !== -1) {
      this.categories[index] = { ...this.editingCategory };
      this.saveCategories();
    }
    this.editingCategory = null;
  }
  

  // Cancelar edición
  cancelEdit() {
    this.editingCategory = null;
  }

  // Eliminar una categoría
  deleteCategory(categoryId: number) {
    this.categories = this.categories.filter(category => category.id !== categoryId);
    this.saveCategories();
  }

}
