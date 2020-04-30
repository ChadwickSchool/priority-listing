import { SaveOptionsService } from '../services/save-options.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
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
    { name: '10' }
  ];
  result: Array<string> = [];

  constructor(private saveOptionService: SaveOptionsService) {
    this.surveyName = '';
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
  submitOptions() {
    this.hasSubmitted = true;
    for (let i = 0; i < this.selectedOptionsArray.length; i++) {
      this.result[i] = this.selectedOptionsArray[i];
    }
    this.saveOptionService.addOptions(this.result, this.surveyName);
  }

  indexTracker(index: number, value: any) {
    return index;
  }

  deleteSurvey(surveyName: string) {
    this.saveOptionService.deleteOptions(surveyName);
  }
}
