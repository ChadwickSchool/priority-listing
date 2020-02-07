import { SurveyVoters } from './surveyVoters.model';
import { User } from './user.model';

export default class SurveyVotersClass implements SurveyVoters {
  docId: string;
  surveyName: string;
  students: Array<User>;

  constructor(docId: string, surveyName: string, students: Array<User>) {
    this.docId = docId;
    this.surveyName = surveyName;
    this.students = students;
  }
}
