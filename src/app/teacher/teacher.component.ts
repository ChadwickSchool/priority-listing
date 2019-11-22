import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  options = [];

  constructor() { }

  ngOnInit() {
    this.options.length = 5;
  }

  submitOptions() {

  }

}
