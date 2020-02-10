import { Component, OnInit, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  async canActivate(): Promise<boolean> {
    const firebaseUser = await this.authService.getAuthenticatedUser();
    const loggedIn = !!firebaseUser;
    const id = this.authService.userID;
    console.log(id);
    if (!loggedIn) {
      console.log('not logged in');
      this.router.navigate(['']);
    } else {
      return this.userService.isAdmin(id);
    }
  }
}
