import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public userService: UserService,
    public router: Router
  ) {}

  ngOnInit() {}

  // google sign in
  async googleSignIn() {
    await this.auth.googleSignin();
    const id = this.auth.userID;
    const isAdmin = await this.userService.isAdmin(id);
    // differentiate between teacher and student
    if (isAdmin) {
      this.router.navigate(['teacher']);
    } else {
      this.router.navigate(['student']);
    }
  }
}
