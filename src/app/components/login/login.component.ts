import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService
  ) { }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    if (email && password != null) {
      this.authService.login(email, password).pipe(
        this.toast.observe({
          success: "Logged in successfully!",
          loading: "Logging in...",
          error: "Oops! An error occurred. Please confirm login details and try again"
        })
      ).subscribe(() => {
        this.router.navigate(['/home']);
      })
    }
  }

}
