import { Surveys } from './options.model';

export default class OptionsClass implements Surveys {
  id: string;
  surveyName: string;
  tasks: Array<string>;
  email: string;
  displayName: string;

  constructor(
    id: string,
    surveyName: string,
    tasks: Array<string>,
    email: string,
    displayName: string
  ) {
    this.id = id;
    this.surveyName = surveyName;
    this.tasks = tasks;
    this.email = email;
    this.displayName = displayName;
  }
}
