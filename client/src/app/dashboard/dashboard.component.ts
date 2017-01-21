import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { GraphComponent } from '../graph/graph.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (!localStorage["polar_id"]) {
      this.router.navigateByUrl('');
    }
  }

}
