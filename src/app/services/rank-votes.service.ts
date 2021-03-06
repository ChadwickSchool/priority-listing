import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankVotesService {
  dataLeft: string[][];
  candidatesLeft: string[];

  // Format:
  //   - candidates: List of option names. (List of strings).
  //   - data: List of student submissions. (List of list of strings).
  //
  //
  constructor(candidates, data) {
    this.dataLeft = data;
    this.candidatesLeft = candidates;
  }

  solve() {
    let roundScores = {};

    // Go through all of the rounds
    while (this.candidatesLeft.length > 2) {
      roundScores = {};

      // Give a score based on first-place votes.
      // for (let i = 0; i < this.dataLeft.length; i++) {
      //   roundScores[this.dataLeft[i][0]]++;
      // }
      for (const data of this.dataLeft) {
        roundScores[data[0]]++;
      }

      let worstCandidate;
      let worstCandidateScore = -1;

      // Find candidate with lowest first-place votes.
      for (const candidate of this.candidatesLeft) {
        if (worstCandidateScore === -1 || roundScores[candidate] < worstCandidateScore) {
          worstCandidate = candidate;
          worstCandidateScore = roundScores[candidate];
        }
      }

      // Remove them from the remaining candidates.
      delete this.candidatesLeft[worstCandidate];

      // Remove them from the candidate votes so that lower candidates rise up.
      for (const data of this.dataLeft) {
        data.splice(data.indexOf(worstCandidate), 1);
      }
    }

    // Compare the final two candidates and return the better one.
    if (roundScores[this.candidatesLeft[0]] > roundScores[this.candidatesLeft[1]]) {
      return this.candidatesLeft[0];
    } else {
      return this.candidatesLeft[1];
    }
  }
}
