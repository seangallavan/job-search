import { Component } from '@angular/core';
import { BASE_URL, API_VERSION } from './shared/base.url';
import { LoopBackConfig } from './shared/sdk/lb.config';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor() {
    LoopBackConfig.setBaseURL(BASE_URL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }
}
