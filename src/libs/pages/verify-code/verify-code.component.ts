import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/libs/services/auth/auth.service';
import { catchError, of, tap } from 'rxjs';

export interface IVerifyCodeForm {
  code: FormControl<string>;
  email: FormControl<string>;
}

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './verify-code.component.html',
  styleUrls: ['../sign-in/sign-in.component.css'],
})
export class VerifyCodeComponent implements OnInit {
  form!: FormGroup<IVerifyCodeForm>;
  email!: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((pr) => {
      this.email = pr['email'];
    });
    this.form = new FormGroup({
      code: new FormControl('', { nonNullable: true }),
      email: new FormControl(this.email, { nonNullable: true }),
    });
  }

  verify() {
    this.authService
      .verifyCode(this.form.value.email!, this.form.value.code! + '')
      .pipe(
        tap((value) => {
          if (value) {
            this.router.navigate(['sign-in']);
          }
        }),
        catchError((err) => of(err))
      )
      .subscribe();
  }
}
