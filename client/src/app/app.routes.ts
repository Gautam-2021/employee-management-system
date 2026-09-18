import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { DepartmentList } from './features/departments/department-list/department-list';
import { DepartmentForm } from './features/departments/department-form/department-form';
import { DesignationList } from './features/designations/designation-list/designation-list';
import { DesignationForm } from './features/designations/designation-form/designation-form';
import { EmployeeList } from './features/employees/employee-list/employee-list';
import { EmployeeForm } from './features/employees/employee-form/employee-form';
import { EmployeeDetail } from './features/employees/employee-detail/employee-detail';
import { Test } from './utils/test/test/test';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'departments',
    canActivate: [authGuard],
    children: [

      {
        path: '',
        component: DepartmentList
      },

      {
        path: 'add',
        component: DepartmentForm
      },

      {
        path: 'edit/:id',
        component: DepartmentForm
      }

    ]
  },

  {
    path: 'designations',
    canActivate: [authGuard],
    children: [

      {
        path: '',
        component: DesignationList
      },

      {
        path: 'add',
        component: DesignationForm
      },

      {
        path: 'edit/:id',
        component: DesignationForm
      }

    ]
  },

  {
    path: 'employees',
    canActivate: [authGuard],
    children: [

      {
        path: '',
        component: EmployeeList
      },

      {
        path: 'add',
        component: EmployeeForm
      },

      {
        path: 'edit/:id',
        component: EmployeeForm
      },

      {
        path: ':id',
        component: EmployeeDetail
      }

    ]
  },
    {
    path: 'test',
    component: Test
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];