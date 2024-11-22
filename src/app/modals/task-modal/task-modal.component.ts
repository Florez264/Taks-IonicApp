import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
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

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  save() {
    if (this.newTaskTitle.trim() && this.newTaskCategoryId !== null) {
      this.modalController.dismiss({
        saved: true,
        taskData: {
          title: this.newTaskTitle,
          categoryId: this.newTaskCategoryId
        }
      });
    }
  }
}