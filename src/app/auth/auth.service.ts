import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
         this.authChange.next(true);
    this.router.navigate(['/training']);
    this.isAuthenticated = true;
      } else {
        this.trainingService.cancelSubscriptons();
      this.authChange.next(false);
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
      }
    });
    }

  registerUser(authData: AuthData) {
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
      this.uiService.loadingStateChanged.next(true);
      })
      .catch(error => {
        this.uiService.showSnackbar(error.message , null , 3000)

        this.uiService.loadingStateChanged.next(false);

      })


  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
      this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
              this.uiService.loadingStateChanged.next(false);

      })
        .catch(error => {
         this.uiService.showSnackbar(error.message , null , 3000)
                        this.uiService.loadingStateChanged.next(false);

        })

          };



    logout(){
      this.afAuth.signOut();
    }



    isAuth(){
      return this.isAuthenticated;

    }




}
