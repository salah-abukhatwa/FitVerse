import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { TrainingComponent } from './training.component';
import { AngularFireModule } from '@angular/fire/compat';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TimestampToDatePipe } from '../timestamp-to-date.pipe';
import { TrainingRuotingModule } from './training-routing.module';



@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent,
     TimestampToDatePipe,

  ],
  imports: [
    SharedModule,
    AngularFireModule,
  TrainingRuotingModule

  ]
})
export class TrainingModule { }
