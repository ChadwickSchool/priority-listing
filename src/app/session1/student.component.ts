import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { SaveChoiceService } from '../services/save-choice.service';
import { GetOptionsService } from '../services/get-options.service';
import { Options } from '../shared/models/options.model';
import { take } from 'rxjs/operators';
import { SurveyVotersService } from '../services/survey-voters.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user.model';
import { StudentService } from '../services/student.service';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  showChoices: boolean;
  todo = ['Loading...'];
  assignedChoices = [];
  choices = [];
  options: Options[];
  surveyNames: Array<string>;
  userId: string;
  currentUser: User;
  surveyName = '';
  voted: boolean;
  result: Array<string> = [];

  constructor(
    private saveChoiceService: SaveChoiceService,
    private getOptionsService: GetOptionsService,
    private surveyVotersService: SurveyVotersService,
    private userService: UserService,
    private authService: AuthService,
    private studentService: StudentService
  ) {
    this.voted = false;
    this.userId = '';
    this.options = [];
    this.surveyNames = [];
  }

  ngOnInit(): void {
    this.showOptions();
    this.showChoices = false;
    this.setUpUser();
  }

  // get user info
  async setUpUser() {
    this.userId = this.authService.getFirebaseUserID();
    this.currentUser = await this.userService.getCurrentUser(this.userId);
  }

  // show the survey names for the user to select
  async showOptions() {
    this.options = await this.getOptionsService
      .getOptions()
      .pipe(take(1))
      .toPromise();
    this.showSurveyNames();
  }

  // assign the user to have already voted
  async hasVoted() {
    this.voted = await this.studentService.hasVoted(
      this.surveyName,
      this.userId
    );
  }

  // put the choices in an array for the user to rank
  showTasks(name: string) {
    this.showChoices = true;
    this.surveyName = name;
    this.getOptionsService
      .getOptionsByName(this.surveyName)
      .subscribe((options) => {
        this.todo = options[0].tasks;
        this.choices = [];
        for (const todo of this.todo) {
          this.choices.push([]);
        }
      });
    this.hasVoted();
  }

  showSurveyNames() {
    this.options.forEach((element) => {
      this.surveyNames.push(element.surveyName);
    });
  }

  choiceIDs() {
    return this.choices.map((choice, i) => 'choice' + i).concat(['todo']);
  }

  // check if there are more choices than arrays
  hasExtras() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.choices.length; i++) {
      if (this.choices[i].length > 1) {
        return true;
      }
    }
    return false; // false meanse all choices are loaded
  }

  // pull choices from database
  getAssignedChoices(event: CdkDragDrop<Array<string>>) {
    for (let i = 0; i < this.todo.length; i++) {
      this.todo[i] = this.assignedChoices[i];
    }
    this.getOptionsService.getOptions();
  }

  // save the user vote
  saveChoiceOrder(event: CdkDragDrop<Array<string>>) {
    for (let i = 0; i < this.choices.length; i++) {
      this.result[i] = this.choices[i][0];
    }
    this.saveChoiceService.addChoices(this.result, this.surveyName);
    this.surveyVotersService.addSurveyVoters(this.surveyName, this.currentUser);
  }

  // ranking an option
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (event.currentIndex === 0) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // move the selected choice if that vote placement is taken
      while (this.hasExtras()) {
        for (let i = 0; i < this.choices.length; i++) {
          if (this.choices[i].length > 1) {
            // move the selected choice down the voting list
            if (i < this.choices.length - 1) {
              transferArrayItem(this.choices[i], this.choices[i + 1], 1, 0);
            } else {
              // move the selected choice back to the original list when voting list is full
              transferArrayItem(this.choices[i], this.todo, 1, 0);
            }
          }
        }
      }
    }
  }
}
