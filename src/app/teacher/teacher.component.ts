import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  selectedOption: string;
  selectedOptionsArray: Array<number>;

  options = [
    {name: '2', value: 2},
    {name: '3', value: 3},
    {name: '4', value: 4},
    {name: '5', value: 5},
    {name: '6', value: 6},
    {name: '7', value: 7},
    {name: '8', value: 8},
    {name: '9', value: 9},
    {name: '10', value: 10}
  ];

  constructor() { }

  ngOnInit() {
    // this.options.length = 10;
  }

  updateOptions() {
    this.selectedOptionsArray = new Array(parseInt(this.selectedOption, 10));
    console.log(this.selectedOption, this.selectedOptionsArray);
  }

  submitOptions() {

  }

}
