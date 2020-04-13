import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { NavigatorComponent } from './component/navigator/navigator.component';
import { NewsPaneComponent } from './component/news-pane/news-pane.component';
import { NewsEntryComponent } from './component/news-entry/news-entry.component';
import { NewsService } from './services/';

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    NewsPaneComponent,
    NewsEntryComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    MatProgressBarModule,
  ],
  providers: [
    NewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
