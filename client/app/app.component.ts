import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewsService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'news-viewer';
  private _errorSourcesSubscriber: Subscription;
  public sourceErrorMessage: string = null;

  constructor(public newsService: NewsService) { }

  ngOnInit() {
    this.newsService.initialize();
    this._errorSourcesSubscriber = this.newsService.loadingSourcesError
      .subscribe(errorMessage => this.sourceErrorMessage = errorMessage);
  }

  ngOnDestroy() {
    if (this._errorSourcesSubscriber) {
      this._errorSourcesSubscriber.unsubscribe();
    }
  }

}
