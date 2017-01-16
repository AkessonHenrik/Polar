import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  title: String;
  answers: String[];
  constructor(title: string, answers: string[]) {
    this.title = title;
    this.answers = answers;
  }

  ngOnInit() {
  }

}
