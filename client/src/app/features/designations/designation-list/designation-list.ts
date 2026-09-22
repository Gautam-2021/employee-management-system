import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Designation } from '../../../core/services/designation';
 
@Component({
  selector: 'app-designation-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './designation-list.html',
  styleUrl: './designation-list.css',
})
export class DesignationList implements OnInit {

  designations: any[] = [];
role = localStorage.getItem('role');
  constructor(
    private designationService: Designation
  ) {}

  ngOnInit(): void {
    this.loadDesignations();
  }

  loadDesignations(): void {

    this.designationService
      .getDesignations()
      .subscribe({

        next: (response:any) => {
          this.designations = response.data;
        },

        error: (error) => {
          console.error('Error loading designations:', error);
        }

      });

  }

  deleteDesignation(id: string): void {

    if (!confirm('Are you sure you want to delete this designation?')) {
      return;
    }

    this.designationService
      .deleteDesignation(id)
      .subscribe({

        next: () => {
          this.loadDesignations();
        },

        error: (error) => {
          console.error('Error deleting designation:', error);
        }

      });

  }

}