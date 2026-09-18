import { Component } from '@angular/core';
import { Employee } from '../../../core/services/employee';
import { Designation } from '../../../core/services/designation';
import { Department } from '../../../core/services/department';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.html',
  styleUrl: './test.css',
})
export class Test {
  employees: any;
  designations: any;
  departments: any;
  mappedResult: any;
  constructor(
    private employeeService: Employee,
    private designationService: Designation,
    private departmentService: Department,
  ) {}

  ngOnInit() {
    this.getData();
    this.getEmployees()
  }

  getData() {
    forkJoin({
      departments: this.departmentService.getDepartments(),
      employees: this.employeeService.getEmployees(),
      designations: this.designationService.getDesignations(),
    }).subscribe((results: any) => {
      console.log(results.employees);
      console.log(results.departments);
      console.log(results.designations);
    });
  }

getEmployees() {
  this.employeeService.getEmployees()
    .pipe(
      map((response: any) => {

        return response.data.map((employee: any) => ({
          id: employee.employeeId,
          name: employee.firstName + ' ' + employee.lastName
        }));

      })
    )
    .subscribe(result => {
      console.log(result);
    });
}
  
}
