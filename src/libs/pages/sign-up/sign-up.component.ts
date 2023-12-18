import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/libs/services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ILoginForm } from '../sign-in';
import { catchError, of, tap } from 'rxjs';

export interface ISignUpForm {
  email: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['../sign-in/sign-in.component.css'],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup<ISignUpForm>;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', { nonNullable: true }),
      username: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
    });
  }
  signUp() {
    this.authService
      .signUp(this.form.value)
      .pipe(
        tap((res) => {
          if (res) {
            this.router.navigate(['/verify-code'], {
              queryParams: {
                email: this.form.value.email,
              },
            });
          }
        }),
        catchError((err) => of(err))
      )
      .subscribe();
  }
}
