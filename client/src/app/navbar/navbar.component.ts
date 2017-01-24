import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirect(): void {
    this.router.navigateByUrl('poll');
  }
  logout(): void {
    delete localStorage["polar_id"];
    delete localStorage["polar_username"];
    this.router.navigateByUrl('');
  }
}
