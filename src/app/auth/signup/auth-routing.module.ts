import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup.component';
import { LoginComponent } from '../login/login.component';


const routes: Routes = [
{ path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
     { path: 'logout', component: LoginComponent },

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class AuthRoutingModule { }
