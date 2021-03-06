import { Component, OnInit } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import { Router } from '@angular/router'
import { ApiService } from '../api.service';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
  providers: [MdSnackBar]
})
export class PollComponent implements OnInit {

  selectedAnswers: Number[];
  background: String;
  activeTab = 0;
  submitter: String;
  questions: QuestionComponent[];
  title: String;
  pollId: String;
  shortcode: String;
  constructor(private apiService: ApiService, private snackBar: MdSnackBar, private router: Router, private activatedRoute: ActivatedRoute) {
    this.background = [
      "../../assets/background-1.jpg",
      "../../assets/background-2.jpg",
      "../../assets/background-3.jpg"
    ][Math.floor(Math.random() * (3))];
  }

  getNumberOfParticipations(): number {
    return this.questions[0].getNumberOfParticipations();
  }

  getValue(questionIndex: number, answerIndex: number): String {
    if (answerIndex >= 0)
      return this.questions[questionIndex].answers[answerIndex].value;
    return "";
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.shortcode = params['shortcode'];
    });
    this.apiService.getPolls().then(res => {

      var result;
      res.forEach(poll => {
        if (poll.shortcode === this.shortcode) {
          result = poll;
        }
      })
      this.pollId = result._id;
      this.submitter = result.submitter.name;
      this.questions = new Array();
      result.questions.forEach(question => {
        this.questions.push(new QuestionComponent(question.title, question.answers, question.votes));
      });
      this.selectedAnswers = new Array(this.questions.length);
      for (var i = 0; i < this.selectedAnswers.length; i++) {
        this.selectedAnswers[i] = -1;
      }
      this.title = result.title;
    })
  }

  submit(): void {
    // Send result to server
    var allQuestionsAnswered = true;
    this.selectedAnswers.forEach(ans => {
      if (ans === -1) {
        allQuestionsAnswered = false;
      }
    })
    if (allQuestionsAnswered) {
      let config = new MdSnackBarConfig();
      config.duration = 1000;
      this.snackBar.open("Saving answers...", "", config);
      setTimeout(
        this.apiService.submitParticipation(this.pollId, this.selectedAnswers).then(result => {
          this.router.navigateByUrl('graph/' + this.shortcode);
          return;
        }), 1000);
    } else {
      let config = new MdSnackBarConfig();
      //config.duration = 2000;
      this.snackBar.open("You haven't answered to all the questions", "Ok got it", config);
    }
  }

  nextQuestion(index): void {
    this.activeTab = index + 1;
  }

  onSelectAnswer(question, answer): void {
    var questionIndex = this.questions.indexOf(question);
    var answerIndex = this.questions[questionIndex].answers.indexOf(answer);
    this.selectedAnswers[questionIndex] = answerIndex;
  }
}
