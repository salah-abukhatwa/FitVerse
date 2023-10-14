import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Observable, Subject, Subscription } from 'rxjs';
import {  map } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();


  private availableExercise: Exercise[] = [ ];
  private runningExercise: Exercise | null = null;
  private fbSubs: Subscription[] = [];


  constructor(private db: AngularFirestore) { }



 fetchAvailableExercise() {
   this.fbSubs.push(this.db
     .collection('availableExercises')
     .snapshotChanges()
     .pipe(
       map((docArray) =>
         docArray.map((doc) => {
           const data = doc.payload.doc.data() as Exercise;
           return {
             id: doc.payload.doc.id,
             ...data,
           };
         })
       )
     )
     .subscribe((exercises: Exercise[]) => {
       this.availableExercise = exercises;
       this.exercisesChanged.next([...this.availableExercise]);
     }, error => {
       // console.log(error);
     }))
}


  startExercise(selectedId: string) {

    // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()})
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
      this.addDataToDatabase({ ...this.runningExercise, date: new Date(), state: 'completed' });
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    }
  }


  cancelExercise(progress: number) {
    if (this.runningExercise !== null) { // Check if runningExercise is not null
      this.addDataToDatabase({
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

  fetchCompleteOrCancelledExercises() {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises) => {
      console.log('Fetched Exercises:', exercises);
      this.finishedExercisesChanged.next(exercises as Exercise[]);
    }));
  }

  cancelSubscriptons() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
  private addDataToDatabase(exercise:Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
