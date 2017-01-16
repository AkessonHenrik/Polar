import { Component, OnInit } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  constructor(private apiService: ApiService) {
    this.background = [
      "../../assets/background-1.jpg",
      "../../assets/background-2.jpg",
      "../../assets/background-3.jpg"
    ][Math.floor(Math.random() * (3))];
  }
  background: String;
  submitter: String;
  questions: QuestionComponent[];
  title: String;
  ngOnInit() {
    this.apiService.getPolls().then(res => {
      console.log(res);
      var result = res[0];
      this.submitter = result.submitter.name;
      this.questions = result.questions;
      this.title = result.title;
    })
  }
  submit(): void {
    // Send result to server
    var r = confirm("Are you sure you want to send your choices?");
    if (r == true) {
      console.log("You pressed OK!");
      console.log("Sending answers...");
    } else {
      console.log("You pressed Cancel!");
    }
  }
}
