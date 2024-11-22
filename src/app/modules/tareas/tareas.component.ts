import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf, NgIf, NgStyle, SlicePipe} from "@angular/common";
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
  categoriaId?: number | null;
}

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [ NgForOf, IonicModule, CommonModule, FormsModule],
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss'],
})
export class TareasComponent  implements OnInit {

  tareas: Tarea[] = [];
  nuevaTarea: string = '';
  categorias = [
    { id: 1, nombre: 'Trabajo' },
    { id: 2, nombre: 'Personal' },
    { id: 3, nombre: 'Otros' }
  ]; // Datos de prueba
  categoriaSeleccionada: number | null = null;

  ngOnInit() {
    // Datos de prueba
    this.tareas = [
      { id: 1, titulo: 'Terminar presentación', completada: false, categoriaId: 1 },
      { id: 2, titulo: 'Hacer ejercicio', completada: true, categoriaId: 2 },
      { id: 3, titulo: 'Leer un libro', completada: false, categoriaId: 3 }
    ];
  }

  agregarTarea() {
    if (this.nuevaTarea.trim()) {
      const nueva: Tarea = {
        id: Date.now(),
        titulo: this.nuevaTarea,
        completada: false,
        categoriaId: this.categoriaSeleccionada || null
      };
      this.tareas.push(nueva);
      this.nuevaTarea = '';
    }
  }

  eliminarTarea(id: number) {
    this.tareas = this.tareas.filter(tarea => tarea.id !== id);
  }

}
