import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'app-component',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})

export class AppComponent {
  todo = [
    'Task 1',
    'Task 2',
    'Task 3',
    'Task 4',
    'Task 5'
  ];

  choiceOne = [];

  choiceTwo = [];

  choiceThree = [];

  choiceFour = [];

  choiceFive = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.container.data.length === 0 || event.container.data === this.todo) {
      console.log(event.currentIndex);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    } else {
        let currentID = event.container.id;

        if (currentID === "cdk-drop-list-1" && this.choiceTwo.length === 0) {
          transferArrayItem(this.todo, this.choiceOne, event.previousIndex, 0);
          transferArrayItem(this.choiceOne, this.choiceTwo, 1, 0);
        }

        if (currentID === "cdk-drop-list-2" && this.choiceThree.length === 0) {
          transferArrayItem(this.todo, this.choiceTwo, event.previousIndex, 0);
          transferArrayItem(this.choiceTwo, this.choiceThree, 1, 0);
        }
        if (currentID === "cdk-drop-list-3" && this.choiceFour.length === 0) {
          transferArrayItem(this.todo, this.choiceThree, event.previousIndex, 0);
          transferArrayItem(this.choiceThree, this.choiceFour, 1, 0);
        }
        if (currentID === "cdk-drop-list-4" && this.choiceFive.length === 0) {
          transferArrayItem(this.todo, this.choiceFour, event.previousIndex, 0);
          transferArrayItem(this.choiceFour, this.choiceFive, 1, 0);
        }
    }
  }
}
