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
    {name: '2'},
    {name: '3'},
    {name: '4'},
    {name: '5'},
    {name: '6'},
    {name: '7'},
    {name: '8'},
    {name: '9'},
    {name: '10'}
  ];

  result: Array<string> = [];

  constructor(private saveOptionService: SaveOptionsService) {
    this.surveyName = '';
  }

  ngOnInit() {
    this.hasSubmitted = false;
  }

  updateOptions(name: string) {
    this.selectedOption = name;
    this.selectedOptionsArray = new Array(parseInt(this.selectedOption, 10));
    // this.options.length = this.options.value;
  }
  refresh() {

  }
  submitOptions() {
    this.hasSubmitted = true;
    for (let i = 0; i < this.selectedOptionsArray.length; i++) {
      /*
      * if option is not undefined
      * result.push(option)
      */

      this.result[i] = this.selectedOptionsArray[i];
    }

    this.saveOptionService.addOptions(this.result, this.surveyName);
  }

  indexTracker(index: number, value: any) {
    return index;
  }
}
