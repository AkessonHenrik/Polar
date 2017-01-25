import { Component, OnInit } from '@angular/core';
import { PollComponent } from '../poll/poll.component';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-all-polls',
  templateUrl: './all-polls.component.html',
  styleUrls: ['./all-polls.component.css']
})
export class AllPollsComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) { }
  polls: PollComponent[];
  ngOnInit() {
    this.apiService.getPolls().then(polls => {
      this.polls = polls;
      console.log(this.polls)
    });
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
