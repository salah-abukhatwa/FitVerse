import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit{

  exercises: Exercise[] = [];

  constructor(private trainingServise:TrainingService) {

  }

  onStartTraining(form:NgForm) {
    this.trainingServise.startExercise(form.value.exercise);
  }

  ngOnInit(): void {
    this.exercises = this.trainingServise.getAvailableExercise();
  }

}
