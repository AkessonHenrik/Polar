import { Component, OnInit } from '@angular/core';
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
  constructor(private apiService: ApiService) {
    this.error = false;
   }

  ngOnInit() {
  }

  signup(): void {
    if(this.password !== this.repeatPassword) {
      alert('Passwords don\'t match');
    } else {
      this.apiService.register(this.email, this.username, this.password)
        .then(result => {
          console.log(result);
        });
    }
  }
  login(): void {
    if(this.password !== "" && this.username !== "") {
      this.apiService.login(this.username, this.password)
        .then(result => {
          console.log("Authenticated");
        })
    }
  }

}
