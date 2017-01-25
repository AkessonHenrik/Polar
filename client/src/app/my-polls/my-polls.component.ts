import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { PollComponent } from '../poll/poll.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.css']
})
export class MyPollsComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }
  myPolls: PollComponent[];
  notLoggedIn: boolean;
  ngOnInit() {
    this.notLoggedIn = false;
    if (localStorage['polar_id'] !== undefined) {
      this.apiService.getMyPolls().then(polls => {
        this.myPolls = polls;
        console.log(this.myPolls)
      });
      this.notLoggedIn = true;
    }
  }

  getNumberOfParticipations(poll): number {
    var result = 0;
    poll.questions[0].votes.forEach(vote => {
      result += vote;
    })
    return result;
  }

  results(poll): void {
    this.router.navigateByUrl('/graph/' + poll.shortcode);
  }
  participate(poll): void {
    this.router.navigateByUrl('/poll/' + poll.shortcode);
  }

}
