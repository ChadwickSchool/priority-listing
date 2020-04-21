import { SaveOptionsService } from '../services/save-options.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from 'firebase';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent implements OnInit {
  selectedOption: string;
  selectedOptionsArray: Array<string>;
  surveyName: string;
  hasSubmitted: boolean;
  options = [
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5' },
    { name: '6' },
    { name: '7' },
    { name: '8' },
    { name: '9' },
    { name: '10' },
  ];
  result: Array<string> = [];
  email: string;
  userID: string;

  constructor(
    private saveOptionService: SaveOptionsService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.surveyName = '';
    this.email = '';
    this.userID = '';
  }

  ngOnInit() {
    // teacher has not finished survey
    this.hasSubmitted = false;
  }

  // change number of options for teacher to create
  updateOptions(name: string) {
    this.selectedOption = name;
    this.selectedOptionsArray = new Array(parseInt(this.selectedOption, 10));
  }

  refresh() {}

  // submit survey
  async submitOptions() {
    this.hasSubmitted = true;
    this.email = this.authService.getFirebaseEmail();
    // this.email = await this.userService.getCurrentUser(this.userID);

    for (let i = 0; i < this.selectedOptionsArray.length; i++) {
      this.result[i] = this.selectedOptionsArray[i];
    }
    this.saveOptionService.addOptions(this.result, this.surveyName, this.email);
    console.log('email: ' + this.email);
  }

  indexTracker(index: number, value: any) {
    return index;
  }
}
