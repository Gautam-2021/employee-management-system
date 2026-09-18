 
import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';
import { Auth } from '../../../core/services/auth';

 
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register  {
registerForm:any =FormGroup
 constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {

    this.registerForm = this.fb.group({

    name: [
      '',
      Validators.required
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]

  });
  }
  

  message = '';
  errorMessage = '';

  

  register() {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;

    }

    this.authService
      .register(this.registerForm.value)
      .subscribe({

        next: () => {

          this.message =
            'Registration successful';

          setTimeout(() => {

            this.router.navigate([
              '/login'
            ]);

          }, 1000);

        },

        error: (error) => {

          this.errorMessage =
            error.error?.message ||
            'Registration failed';

        }

      });

  }

}