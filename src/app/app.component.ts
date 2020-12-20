import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

import { environment } from '@Environment';

@Component({
  selector: 'bb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  public title: string = 'backbase-challenge';

  public constructor(
    private readonly translateService: TranslateService,
    private readonly titleService: Title,
  ) {
  }

  public ngOnInit(): void {
    this.titleService.setTitle(this.title);
    moment.locale(environment.defaultLang);
    this.translateService.setDefaultLang(environment.defaultLang);
    this.translateService.use(environment.defaultLang);
  }
}
