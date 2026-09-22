import { Component } from '@angular/core';
import { Router, RouterLink, Routes } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  loggedIn:boolean=false
  constructor(private authService: Auth,private router:Router) {}
  ngOnInit() {
   this.authService.loggedIn$.subscribe((res)=>{
    this.loggedIn=res
   })
   console.log("loggedin value",this.loggedIn)
  }
  logOut() {
    this.authService.logout();
       console.log("loggedin value",this.loggedIn)
       this.router.navigate(['/login'])

  }
}
