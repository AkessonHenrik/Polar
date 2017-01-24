import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  background: string;
  constructor(private router: Router) {
   }
  private shortcode: String;
  ngOnInit() {
  }
  viewResults(): void {
    if(this.shortcode !== "") {
      this.router.navigateByUrl('/graph/' + this.shortcode);
    }
  }
  participate(): void {
      this.router.navigateByUrl('/poll/' + this.shortcode);
  }

}
