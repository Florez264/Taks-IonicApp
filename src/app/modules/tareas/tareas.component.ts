import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf, NgIf, NgStyle, SlicePipe} from "@angular/common";
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Category } from '../categorias/categorias.component';
import { IonModal } from '@ionic/angular';
import { TaskModalComponent } from 'src/app/modals/task-modal/task-modal.component';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  categoryId?: number; // Asociada a una categoría (opcional)
}

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [ NgForOf, IonicModule, CommonModule, FormsModule, TaskModalComponent ],
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss'],
})
export class TareasComponent  implements OnInit {

  tasks: Task[] = [];
  categories: Category[] = [];
  filteredTasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskCategoryId: number | null = null;
  filterCategoryId: number | null = null;
  filterStatus: boolean | null = null;
  isTaskModalOpen: boolean = false;

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadCategories();
    this.applyFilters();
  }

  // Gestión de Modal
  async openTaskModal() {
    const modal = await this.modalController.create({
      component: TaskModalComponent,
      componentProps: {
        newTaskTitle: '',
        newTaskCategoryId: null,
        categories: this.categories
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.saved) {
      this.tasks.push({
        id: Date.now(),
        title: data.taskData.title,
        completed: false,
        categoryId: data.taskData.categoryId,
      });
      this.saveTasks();
      this.applyFilters();
    }
  }

  closeTaskModal() {
    this.modalController.dismiss();
  }
  saveTask() {
    if (this.newTaskTitle.trim() && this.newTaskCategoryId !== null) {
      this.tasks.push({
        id: Date.now(),
        title: this.newTaskTitle,
        completed: false,
        categoryId: this.newTaskCategoryId,
      });
      this.saveTasks();
      this.applyFilters();
      this.closeTaskModal();
    }
  }

  // Cargar y guardar datos
  loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
    this.applyFilters();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadCategories() {
    const storedCategories = localStorage.getItem('categories');
    this.categories = storedCategories ? JSON.parse(storedCategories) : [];
  }

  // Operaciones con tareas
  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;
    this.saveTasks();
    this.applyFilters();
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
    this.applyFilters();
  }

  // Filtros
  applyFilters() {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesCategory =
        this.filterCategoryId === null || task.categoryId === this.filterCategoryId;
      const matchesStatus =
        this.filterStatus === null || task.completed === this.filterStatus;
      return matchesCategory && matchesStatus;
    });
  }

  // Obtener nombre de categoría
  getCategoryName(categoryId?: number): string {
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Sin categoría';
  }
}
