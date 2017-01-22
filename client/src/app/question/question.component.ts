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
  votes: Number[];
  constructor(title: string, answers: [Answer], votes: Number[]) {
    this.title = title;
    this.answers = answers;
    this.votes = votes;
  }

  ngOnInit() {
  }

}
