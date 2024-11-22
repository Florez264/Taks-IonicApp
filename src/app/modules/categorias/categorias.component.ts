import { Component, OnInit } from '@angular/core';

export interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent  implements OnInit {
  categories: Category[] = [];
  newCategoryName: string = '';
  editingCategory?: Category; // Categoría que se está editando

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    const storedCategories = localStorage.getItem('categories');
    this.categories = storedCategories ? JSON.parse(storedCategories) : [];
  }

  saveCategories() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  addCategory() {
    if (this.newCategoryName.trim()) {
      this.categories.push({
        id: Date.now(),
        name: this.newCategoryName,
      });
      this.newCategoryName = '';
      this.saveCategories();
    }
  }

  editCategory(category: Category) {
    this.editingCategory = { ...category }; // Clonamos el objeto para evitar modificaciones directas
  }

  updateCategory() {
    if (this.editingCategory) {
      const index = this.categories.findIndex(
        (cat) => cat.id === this.editingCategory!.id
      );
      if (index !== -1) {
        this.categories[index] = this.editingCategory;
        this.saveCategories();
        this.cancelEdit();
      }
    }
  }

  cancelEdit() {
    this.editingCategory = undefined;
  }

  deleteCategory(categoryId: number) {
    this.categories = this.categories.filter((category) => category.id !== categoryId);
    this.saveCategories();
  }

}
