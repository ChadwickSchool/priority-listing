import { Options } from './options.model';

export default class OptionsClass implements Options {
  id: string;
  surveyName: string;
  tasks: Array<string>;
  email: string;

  constructor(
    id: string,
    surveyName: string,
    tasks: Array<string>,
    email: string
  ) {
    this.id = id;
    this.surveyName = surveyName;
    this.tasks = tasks;
    this.email = email;
  }
}
