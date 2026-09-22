 
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { Designation } from '../../../core/services/designation';

@Component({
  selector: 'app-designation-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './designation-form.html',
  styleUrl: './designation-form.css',
})
export class DesignationForm implements OnInit {

  isEditMode = false;
  designationId = '';
 designationForm:any

  constructor(
    private fb: FormBuilder,
    private designationService: Designation,
    private route: ActivatedRoute,
    private router: Router
  ) {
    
  this.designationForm = this.fb.group({

    name: [
      '',
      Validators.required
    ],

    description: [
      '',
      Validators.required
    ],

    status: [
      'Active',
      Validators.required
    ]

  });
  }

  ngOnInit(): void {

    this.designationId =
      this.route.snapshot.paramMap.get('id') || '';

    if (this.designationId) {

      this.isEditMode = true;

      this.loadDesignation();

    }

  }

  loadDesignation(): void {

    this.designationService
      .getDesignation(this.designationId)
      .subscribe({

        next: (response: any) => {

          const designation = response.data;

          this.designationForm.patchValue({

            name: designation.name,

            description: designation.description,

            status: designation.status

          });

        },

        error: (error) => {

          console.error(
            'Error loading designation:',
            error
          );

        }

      });

  }

  submit(): void {

    if (this.designationForm.invalid) {

      this.designationForm.markAllAsTouched();

      return;

    }

    const data = this.designationForm.value;

    if (this.isEditMode) {

      // UPDATE

      this.designationService
        .updateDesignation(
          this.designationId,
          data
        )
        .subscribe({

          next: () => {

            this.router.navigate(
              ['/designations']
            );

          },

          error: (error) => {

            console.error(
              'Error updating designation:',
              error
            );

          }

        });

    } else {

      // CREATE

      this.designationService
        .createDesignation(data)
        .subscribe({

          next: () => {

            this.router.navigate(
              ['/designations']
            );

          },

          error: (error) => {

            console.error(
              'Error creating designation:',
              error
            );

          }

        });

    }

  }

  cancel(): void {

    this.router.navigate(
      ['/designations']
    );

  }

}
