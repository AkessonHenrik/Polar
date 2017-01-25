import { Component, OnInit } from '@angular/core';
import { Answer } from './answer.component';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  title: String;
  answers: [Answer];
  votes: number[];
  constructor(title: string, answers: [Answer], votes: number[]) {
    this.title = title;
    this.answers = answers;
    this.votes = votes;
  }

  getNumberOfParticipations(): number {
    var numberOfParticipations = 0;
    this.votes.forEach(vote => {
      numberOfParticipations += vote;
    })
    return numberOfParticipations;
  }
  ngOnInit() {
  }

}
