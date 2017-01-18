import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  title: String;
  answers: String[];
  votes: Number[];
  constructor(title: string, answers: string[], votes: Number[]) {
    this.title = title;
    this.answers = answers;
    this.votes = votes;
  }

  ngOnInit() {
  }

}
