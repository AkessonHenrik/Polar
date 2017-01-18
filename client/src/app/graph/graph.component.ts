import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { QuestionComponent } from '../question/question.component'
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
  constructor(private apiService: ApiService) {this.background = [
      "../../assets/background-1.jpg",
      "../../assets/background-2.jpg",
      "../../assets/background-3.jpg"
    ][Math.floor(Math.random() * (3))];
    this.apiService.getPolls().then(res => {
      var result = res[0];
      this.submitter = result.submitter.name;
      this.questions = new Array();
      result.questions.forEach(question => {
        this.questions.push(new QuestionComponent(question.title, question.answers, question.votes));
      });
      this.title = result.title;
    })
  }

  ngOnInit() {
  }
  public pieChartType: string = 'pie';
}
