import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user$ = this.usersService.currentUserProfile$;

  loginButton: boolean = true;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private usersService: UsersService
  ) { }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    })
  }

}
