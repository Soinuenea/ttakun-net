import { Component } from '@angular/core';
import { getThemeClass } from '../core/services/visual/theme.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  get theme() {
    return getThemeClass();
  }
}
