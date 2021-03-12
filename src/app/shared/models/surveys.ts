import { Survey } from './survey.model';

export default class SurveyClass implements Survey {
  id: string;
  surveyName: string;
  options: Array<string>;
  email: string;
  displayName: string;

  constructor(
    id: string,
    surveyName: string,
    options: Array<string>,
    email: string,
    displayName: string
  ) {
    this.id = id;
    this.surveyName = surveyName;
    this.options = options;
    this.email = email;
    this.displayName = displayName;
  }
}
