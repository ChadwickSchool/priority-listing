import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDropList
} from '@angular/cdk/drag-drop';
import { SaveChoiceService } from '../services/save-choice.service';
import { GetOptionsService } from '../services/get-options.service';
import { Options } from '../shared/models/options.model';
import { take } from 'rxjs/operators';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  todo = ['Loading...'];

  assignedChoices = [];

  choices = [];

  options: Options[];

  surveyNames: Array<string>;

  surveyName = '';

  result: Array<string> = [];
  constructor(private saveChoiceService: SaveChoiceService, private getOptionsService: GetOptionsService) {
    this.options = [];
    this.surveyNames = [];
  }

  ngOnInit(): void {
    this.showOptions();
    // this.getOptionsService.getOptionsByName(this.surveyName).subscribe(options => {
    //   this.todo = options[0].tasks;

    //   for (let todo of this.todo) {
    //     this.choices.push([]);
    //   }
    // });
  }

  async showOptions() {
    this.options = await this.getOptionsService.getOptions().pipe(take(1)).toPromise();
    this.showSurveyNames();
  }

  showTasks(name: string) {
    this.surveyName = name;
    console.log(this.surveyName);
    this.getOptionsService.getOptionsByName(this.surveyName).subscribe(options => {
      console.log(options[0]);
      this.todo = options[0].tasks;
      this.choices = [];
      for (let todo of this.todo) {
        this.choices.push([]);
      }
    });
  }

  showSurveyNames() {
    this.options.forEach(element => {
      this.surveyNames.push(element.surveyName);
    });
  }

  choiceIDs() {
    return this.choices.map((choice, i) => 'choice' + i).concat(['todo']);
  }

  hasExtras() {
    for (let i = 0; i < this.choices.length; i++) {
      if (this.choices[i].length > 1) {
        return true;
      }
    }
    return false;
  }

  getAssignedChoices(event: CdkDragDrop<Array<string>>) {
    for (let i = 0; i < this.todo.length; i++) {
      this.todo[i] = this.assignedChoices[i];
    }
    this.getOptionsService.getOptions();
  }

  saveChoiceOrder(event: CdkDragDrop<Array<string>>) {
    console.log(this.choices);
    for (let i = 0; i < this.choices.length; i++) {
      this.result[i] = this.choices[i][0];
    }
    this.saveChoiceService.addChoices(this.result);
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
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

      while (this.hasExtras()) {
        for (let i = 0; i < this.choices.length; i++) {
          if (this.choices[i].length > 1) {
            if (i < this.choices.length - 1) {
              transferArrayItem(this.choices[i], this.choices[i + 1], 1, 0);
            } else {
              transferArrayItem(this.choices[i], this.todo, 1, 0);
            }
          }
        }
      }
    }
  }
}
