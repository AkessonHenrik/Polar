import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { QuestionComponent } from '../question/question.component'
import { Answer } from '../question/answer.component';
import * as io from 'socket.io-client';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  background: String;
  submitter: String;
  questions: QuestionComponent[];
  title: String;
  answers: String[][];
  socket: SocketIOClient.Socket;
  shortcode: String;
  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {
    this.background = [
      //"../../assets/background-1.jpg",
      "../../assets/background-2.jpg",
      "../../assets/background-3.jpg"
    ][Math.floor(Math.random() * (3))];
    this.apiService.getPolls().then(res => {
      var result = res[res.length - 1];
      this.submitter = result.submitter.name;
      this.questions = new Array();
      this.answers = new Array(this.questions.length);
      result.questions.forEach(question => {
        this.questions.push(new QuestionComponent(question.title, question.answers, question.votes));
        this.answers.push(question.answers.map(ans => { return ans.value; }));
      });
      this.title = result.title;
    })
  }
  getValues(answers: Answer[]): String[] {
    return answers.map(function (answer) { return answer.value; });
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.shortcode = params['shortcode'];
      console.log("Shortcode: " + this.shortcode);
    });
    this.socket = io.connect("http://localhost:3030");
    this.socket.emit("subscribe", { 'shortcode': this.shortcode });
    this.socket.on("update", new_data => {
      for(var i = 0; i < this.questions.length; i++) {
        this.questions[i].votes = new_data[i];
      }
    })

  }
  public pieChartType: string = 'pie';
}
