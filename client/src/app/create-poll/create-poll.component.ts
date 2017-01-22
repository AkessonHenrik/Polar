import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import { Answer } from '../question/answer.component';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  title: String;
  questions: QuestionComponent[];
  submitter: String;
  keywords: String;
  background: string;

  constructor(private apiService: ApiService) {
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
  addQuestion(): void {
    this.questions.push(new QuestionComponent("", [new Answer(""), new Answer("")], [0, 0]))
  }
  submitPoll(): void {
    this.apiService.addPoll(this.title, this.questions, "5884d3ac7389612b38232465");
  }
  ngOnInit() {
  }

}
