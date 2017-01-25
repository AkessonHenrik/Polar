import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { MdSnackBarConfig } from '@angular/material';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {
    this.myPolls();
  }
  isLogged(): boolean {
    if (localStorage['polar_id'] === undefined || localStorage['polar_id'] === null) {
      return false;
    } 
    return true;
  }
  myPolls() {
    if (localStorage['polar_id'] === undefined || localStorage['polar_id'] === null) {
      this.router.navigateByUrl('');
    } else {
      this.router.navigateByUrl('myPolls');
    }
  }
  login(): void {
    this.router.navigateByUrl('');
  }
  allPolls() {
    this.router.navigateByUrl('allPolls');
  }
  logout() {
    delete localStorage["polar_id"];
    delete localStorage["password"];
    delete localStorage["polar_username"];
    this.router.navigateByUrl('/');
  }
  shortcode() {
    this.router.navigateByUrl('guest');
  }
  createPoll() {
    if (localStorage['polar_id'] === undefined || localStorage['polar_id'] === null) {
      this.router.navigateByUrl('')
    } else {
      this.router.navigateByUrl('createPoll');
    }
  }
}
