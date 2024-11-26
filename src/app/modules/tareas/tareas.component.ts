import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf, NgIf, NgStyle, SlicePipe} from "@angular/common";
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Category } from '../categorias/categorias.component';
import { TaskModalComponent } from 'src/app/modals/task-modal/task-modal.component';
import { LoadingService } from 'src/app/services/loading.service';
import { getFeatureFlag } from 'src/firebase.config';


interface Task {
  id: number;
  title: string;
  completed: boolean;
  categoryId?: number;
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
  isLoading: boolean = false;
  featureEnabled: boolean = false;



  constructor(
    private modalController: ModalController,
    private alertController: AlertController,  
    private toastController: ToastController,
    private loadingService: LoadingService
  ) {}

  async ngOnInit(): Promise<void> {
    this.featureEnabled = (await getFeatureFlag('feature_flag_tareas')) === 'enabled'; //disabled
    this.loadTasks();
    this.loadCategories();
    this.applyFilters();
  }
  

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

  loadTasks() {
    this.loadingService.show();
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
    this.applyFilters();
    this.loadingService.hide();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadCategories() {
    const storedCategories = localStorage.getItem('categories');
    this.categories = storedCategories ? JSON.parse(storedCategories) : [];
  }

  async showCompletionToast(task: Task) {
    const toast = await this.toastController.create({
      message: task.completed
        ? 'Tarea marcada como completada'
        : 'Tarea desmarcada como incompleta',
      duration: 2000,
      position: 'top',
      color: task.completed ? 'success' : 'warning',
    });
    toast.present();
  }

  onCheckboxChange(event: Event, task: Task) {
    event.preventDefault(); 
    this.toggleTaskCompletion(task);
  }
  
  async toggleTaskCompletion(task: Task) {
    const isCompleted = task.completed; 
  
    const alert = await this.alertController.create({
      header: isCompleted
        ? 'Confirmar desmarcar tarea'
        : 'Confirmar marcar tarea como completada',
      message: isCompleted
        ? '¿Estás seguro de que deseas desmarcar esta tarea como completada?'
        : '¿Estás seguro de que deseas marcar esta tarea como completada?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: isCompleted ? 'Desmarcar' : 'Marcar',
          handler: () => {
            task.completed = !isCompleted;
            this.saveTasks();
            this.applyFilters();
            this.showCompletionToast(task);
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  async deleteTask(taskId: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel', 
        },
        {
          text: 'Eliminar',
          handler: async () => {
            this.loadingService.show(); 
  
            try {
              await new Promise(resolve => setTimeout(resolve, 500));
              this.tasks = this.tasks.filter(task => task.id !== taskId);
              this.saveTasks();
              this.applyFilters();
              this.showDeletionToast(); 
            } catch (error) {
              console.error('Error al eliminar la tarea:', error);
            } finally {
              this.loadingService.hide();
            }
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  

  async showDeletionToast() {
    const toast = await this.toastController.create({
      message: 'Tarea eliminada exitosamente',
      duration: 2000,
      position: 'top',
      color: 'danger', 
    });
    toast.present();
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesCategory =
        this.filterCategoryId === null || task.categoryId === this.filterCategoryId;
      const matchesStatus =
        this.filterStatus === null || task.completed === this.filterStatus;
      return matchesCategory && matchesStatus;
    });
  }


  getCategoryName(categoryId?: number): string {
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Sin categoría';
  }
}
