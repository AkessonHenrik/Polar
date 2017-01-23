import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import { Answer } from '../question/answer.component';
import { ApiService } from '../api.service';
import { MdSnackBar } from '@angular/material';
import { MdSnackBarConfig } from '@angular/material';
@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css'],
  providers: [MdSnackBar]
})
export class CreatePollComponent implements OnInit {

  title: String;
  questions: QuestionComponent[];
  submitter: String;
  keywords: String;
  background: string;
  constructor(private apiService: ApiService, private snackBar: MdSnackBar) {
    this.questions = [new QuestionComponent("", [new Answer(""), new Answer("")], [0, 0])];
    this.background = [
      "../../assets/background-1.jpg",
      "../../assets/background-2.jpg",
      "../../assets/background-3.jpg"
    ][Math.floor(Math.random() * (3))];
  }
  addAnswer(questionIndex: number): void {
    this.questions[questionIndex].answers.push({ value: '' });
    this.questions[questionIndex].votes.push(0);
  }
  removeAnswer(questionIndex: number): void {
    if (this.questions[questionIndex].answers.length > 2) {
      this.questions[questionIndex].answers.pop();
      this.questions[questionIndex].votes.pop();
    } else {
      let config = new MdSnackBarConfig();
      //config.duration = 2000;
      this.snackBar.open("You can't have less than 2 answers", "Ok got it", config);
    }
  }
  addQuestion(): void {
    this.questions.push(new QuestionComponent("", [new Answer(""), new Answer("")], [0, 0]))
  }
  submitPoll(): void {
    this.apiService.addPoll(this.title, this.questions, "5885ff46105f7b257803942e", this.keywords ? this.keywords.split(',') : []);
  }
  ngOnInit() {
  }

}
