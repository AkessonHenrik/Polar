import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css', './auth.component.scss'],
  providers: [
    ApiService
  ]
})
export class AuthComponent implements OnInit {
  email: String;
  username: String;
  password: String;
  repeatPassword: String;
  error: boolean;
  constructor(private apiService: ApiService, private router: Router) {
    this.error = false;
    this.background = [
      "../../assets/background-1.jpg",
      "../../assets/background-2.jpg",
      "../../assets/background-3.jpg"
    ][Math.floor(Math.random() * (3))];
    //  setInterval(function(){console.log("interval"); this.background = this.backgroundList[Math.floor(Math.random() * (5))];}, 5000);
  }
  background: string;
  ngOnInit() {
    
  }
  signup(): void {
    if (this.password !== this.repeatPassword) {
      alert('Passwords don\'t match');
    } else {
      this.apiService.register(this.email, this.username, this.password)
        .then(result => {
          console.log(result);
        });
    }
  }
  login(): void {
    if (this.password !== "" && this.username !== "") {
      this.apiService.login(this.username, this.password)
        .then(result => {
          console.log("Authenticated");
          localStorage["polar_id"] = result._id;
          localStorage["polar_username"] = result.username;
          return;
        }).then(_ => {
          this.router.navigateByUrl('dashboard');
        })
    }
  }
}