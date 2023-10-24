import { Component, OnInit , OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import {  Subscription } from 'rxjs/';

import { Exercise } from '../exercise.model';
import { UiService } from 'src/app/shared/ui.service';



@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit , OnDestroy {
  exercises: Exercise[] | undefined;
  exerciseSubscription: Subscription | undefined;
  isLoading = false;
   private loadingSubs!: Subscription;


  constructor(private trainingServise: TrainingService,
    private uiService: UiService) { }

  fetchExercises() {

    this.trainingServise.fetchAvailableExercise();
  }


  onStartTraining(form: NgForm) {
    this.trainingServise.startExercise(form.value.exercise);
  }

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

   this.exerciseSubscription = this.trainingServise.exercisesChanged.subscribe(exercises => this.exercises = exercises);
    this.fetchExercises();
}


  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
       this.exerciseSubscription?.unsubscribe();
    }

    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }
}
