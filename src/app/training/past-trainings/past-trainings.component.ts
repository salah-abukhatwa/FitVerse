import { AfterViewInit, Component, OnInit, ViewChild  , OnDestroy} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit , AfterViewInit , OnDestroy {

  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exChangedSubscription!: Subscription;

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private trainingService:TrainingService){}

  ngOnInit(): void {
  this.exChangedSubscription =  this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
    this.dataSource.data = exercises;
    });
    this.trainingService.fetchCompleteOrCancelledExercises();

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(event: any):void {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }


  ngOnDestroy(): void {
    if (this.exChangedSubscription) {
       this.exChangedSubscription.unsubscribe();
    }
  }
}
