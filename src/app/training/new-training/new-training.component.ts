import { Component, OnInit , OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import {  Subscription } from 'rxjs/';

import { Exercise } from '../exercise.model';



@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit , OnDestroy {
  exercises: Exercise[] | undefined;
  exerciseSubscription: Subscription | undefined;


  constructor(private trainingServise: TrainingService) {}


  onStartTraining(form: NgForm) {
    this.trainingServise.startExercise(form.value.exercise);
  }

  ngOnInit(): void {
   this.exerciseSubscription = this.trainingServise.exercisesChanged.subscribe(exercises => this.exercises = exercises);
    this.trainingServise.fetchAvailableExercise();
}


  ngOnDestroy(): void {
    this.exerciseSubscription?.unsubscribe();
  }
}
