import { User } from './user.model';

export interface SurveyVoters {
  docId: string;
  surveyName: string;
  students: Array<User>;
}
