import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { loginRoute } from '../../core/config/routes.config';
import { deleteSession } from '../../core/services/storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    deleteSession();
    this.router.navigateByUrl(loginRoute);
  }

}
