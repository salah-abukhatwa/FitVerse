import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit , OnDestroy{
  @Output() sidenaveToggle = new EventEmitter<void>();
  isAuth = false;
  authSubscription!: Subscription;

  constructor(private authService:AuthService){}

  onToggleSidenav() {
    this.sidenaveToggle.emit();
  }

  ngOnInit() {
   this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
