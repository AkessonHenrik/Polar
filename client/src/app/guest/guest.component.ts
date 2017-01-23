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
    this.background = [
      "../../assets/background-1.jpg",
      "../../assets/background-2.jpg",
      "../../assets/background-3.jpg"
    ][Math.floor(Math.random() * (3))];
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
