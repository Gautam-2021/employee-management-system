import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../../core/services/department';
 
@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './department-form.html',
  styleUrl: './department-form.css',
})
export class DepartmentForm implements OnInit {

  isEditMode = false;
  departmentId = '';

   departmentForm:any

  constructor(
    private fb: FormBuilder,
    private departmentService: Department,
    private route: ActivatedRoute,
    private router: Router
  ) {
     this.departmentForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    status: ['Active', Validators.required]
  });
  }
  

  ngOnInit(): void {

    this.departmentId =
      this.route.snapshot.paramMap.get('id') || '';

    if (this.departmentId) {

      this.isEditMode = true;

      this.loadDepartment();

    }

  }

  loadDepartment() {

    this.departmentService
      .getDepartment(this.departmentId)
      .subscribe({

        next: (response: any) => {

          const department = response.data;

          this.departmentForm.patchValue({

            name: department.name,

            description: department.description,

            status: department.status

          });

        },

        error: (error) => {

          console.error(
            'Error loading department:',
            error
          );

        }

      });

  }

  submit() {

    if (this.departmentForm.invalid) {

      this.departmentForm.markAllAsTouched();

      return;

    }

    const data = this.departmentForm.value;

    if (this.isEditMode) {

      this.departmentService
        .updateDepartment(
          this.departmentId,
          data
        )
        .subscribe({

          next: () => {

            this.router.navigate(
              ['/departments']
            );

          },

          error: (error) => {

            console.error(
              'Error updating department:',
              error
            );

          }

        });

    } else {

      this.departmentService
        .createDepartment(data)
        .subscribe({

          next: () => {

            this.router.navigate(
              ['/departments']
            );

          },

          error: (error) => {

            console.error(
              'Error creating department:',
              error
            );

          }

        });

    }

  }

  cancel() {

    this.router.navigate(
      ['/departments']
    );

  }

}
