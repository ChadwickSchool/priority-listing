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

  choices = [[], [], [], [], []];

  choiceIDs() {
    return this.choices.map((choice, i) => 'choice' + i).concat(['todo'])
  }
  hasExtras() {
    for (let i = 0; i < this.choices.length; i++) {
      if (this.choices[i].length >= 2) {
        return true;
      }
    }
    return false;

  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.previousIndex, event.currentIndex);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      while (this.hasExtras()) {
        for (let i = 0; i < this.choices.length - 1; i++) {
          if (this.choices[i].length >= 2){
            transferArrayItem(this.choices[i], this.choices[i+1], 1, 0);
          }
        }
      }
   }
}
}
