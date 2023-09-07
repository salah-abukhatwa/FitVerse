import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();

  availableExercise: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];

  private runningExercise: Exercise | null = null;
  private exercises: Exercise[] = [];

  constructor() { }



  getAvailableExercise() {
    return this.availableExercise.slice();
  }

  startExercise(selectedId: string) {
    const selectedExercise = this.availableExercise.find(ex => ex.id === selectedId);

    if (selectedExercise) {
      this.runningExercise = selectedExercise;
      this.exerciseChanged.next({ ...this.runningExercise });
    } else {
      // Handle the case where the selected exercise is not found
      console.error("Selected exercise not found!");
    }
  }

  completeExercise() {
    if (this.runningExercise !== null) { // Check if runningExercise is not null
      this.exercises.push({ ...this.runningExercise, date: new Date(), state: 'completed' });
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    }
  }


  cancelExercise(progress: number) {
    if (this.runningExercise !== null) { // Check if runningExercise is not null
      this.exercises.push({
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(), state: 'cancelled'
      });
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    }




  }
  getRuningExercise() {
      return { ...this.runningExercise }
  }

  getCompleteOrCancelledExercises() {
    return this.exercises.slice();
  }
}
