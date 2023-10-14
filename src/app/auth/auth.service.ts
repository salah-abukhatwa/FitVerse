import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from '../training/training.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
         this.authChange.next(true);
    this.router.navigate(['/training']);
    this.isAuthenticated = true;
      } else {
        this.trainingService.cancelSubscriptons();
      this.authChange.next(false);
      this.router.navigate(['/login']);
      this.isAuthenticated = false;
      }
    });
    }

  registerUser(authData: AuthData) {
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);

      })
      .catch(error => { console.log(error); })


  }

    login(authData:AuthData){
      this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
          console.log(result);

      })
      .catch(error => { console.log(error); })

          };



    logout(){
      this.afAuth.signOut();
    }



    isAuth(){
      return this.isAuthenticated;

    }




}
