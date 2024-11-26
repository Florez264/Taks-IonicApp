import { Component, Input } from '@angular/core';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from 'src/app/modules/categorias/categorias.component'; 

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
  @Input() newTaskTitle: string = '';
  @Input() newTaskCategoryId: number | null = null;
  @Input() categories: Category[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController 
  ) {}

  dismiss() {
    this.modalController.dismiss();
  }

  async save() {
    if (this.newTaskTitle.trim() && this.newTaskCategoryId !== null) {
      // Mostramos un Alert de confirmación
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: '¿Estás seguro de que deseas agregar esta nueva tarea?',
        buttons: [
          {
            text: 'Sí',
            handler: () => {
              // Aquí se cierra el modal y se envían los datos
              this.modalController.dismiss({
                saved: true,
                taskData: {
                  title: this.newTaskTitle,
                  categoryId: this.newTaskCategoryId
                }
              });

              // Luego mostramos un Toast de éxito
              this.showSuccessToast();
            }
          },
          {
            text: 'No',
            role: 'cancel', // El botón de "No" no hace nada
          }
        ]
      });

      await alert.present();
    }
  }

  // Toast de éxito
  async showSuccessToast() {
    const toast = await this.toastController.create({
      message: '¡Tarea agregada exitosamente!',
      duration: 2000,
      position: 'top', 
      color: 'success', 
      cssClass: 'custom-toast' 
    });
    toast.present();
  }
  
}