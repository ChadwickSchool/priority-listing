import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDropList
} from '@angular/cdk/drag-drop';
import { SaveChoiceService } from '../services/save-choice.service';
import { GetOptionsService } from '../services/get-options.service';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  todo = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];

  assignedChoices = [];

  choices = [];

  result = [];
  constructor(private saveChoiceService: SaveChoiceService, private getOptionsService: GetOptionsService) {

  }

  ngOnInit(): void {
    this.getOptionsService.getOptions().subscribe(options => {
      this.todo = options[0].tasks;

      for (let todo of this.todo) {
        this.choices.push([]);
      }
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

  getAssignedChoices(event: CdkDragDrop<string[]>) {
    for (let i = 0; i < this.todo.length; i++) {
      this.todo[i] = this.assignedChoices[i];
    }
    this.getOptionsService.getOptions();
  }

  saveChoiceOrder(event: CdkDragDrop<string[]>) {
    for (let i = 0; i < this.choices.length; i++) {
      this.result[i] = this.choices[i];

    //   this.choices.uid = i;
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
