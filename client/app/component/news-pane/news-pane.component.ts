import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { News } from '../../models';
import { Subscription } from 'rxjs';
import { NewsService } from '../../services';

@Component({
  selector: 'app-news-pane',
  templateUrl: './news-pane.component.html',
  styleUrls: ['./news-pane.component.css']
})
export class NewsPaneComponent implements OnInit, OnDestroy {

  @ViewChild('newsContainer') newsContainer: ElementRef;
  private _newsSubscriber: Subscription;
  private _errorNewsSubscriber: Subscription;
  public currentPageText: string;
  public canGoNext = false;
  public canGoPrev = false;
  public newsListErrorMessage: string = null;

  constructor(public newsService: NewsService) { }

  ngOnInit() {
    // Subscribe to news list updates
    this._newsSubscriber = this.newsService.newsList
      .subscribe((newsList: News[]) => {
        this.canGoNext = this.newsService.canGoNext();
        this.canGoPrev = this.newsService.canGoPrev();
        this.currentPageText = this.newsService.getCurrentPageText();
      });
    // Subscribe to newslist error updates
    this._errorNewsSubscriber = this.newsService.loadingNewsListError
      .subscribe(errorMessage => {
        this.newsListErrorMessage = errorMessage;
        this.scrollToTop();
      });
  }

  ngOnDestroy() {
    // Unsubscribe subscriptions
    if (this._newsSubscriber) {
      this._newsSubscriber.unsubscribe();
    }
    if (this._errorNewsSubscriber) {
      this._errorNewsSubscriber.unsubscribe();
    }
  }

  /**
    * Indicates if next page functionality is disabled
    * @returns boolean
    */
  disableNext(): boolean {
    return this.newsService.isLoading() || !this.canGoNext;
  }

  /**
    * Indicates if previous page functionality is disabled
    * @returns boolean
    */
  disablePrev(): boolean {
    return this.newsService.isLoading() || !this.canGoPrev;
  }

  /**
    * Indicates if the current page traversed to has entries
    * @returns boolean
    */
  hasEntries(): boolean {
    return !this.newsService.isLoading() && (this.newsService.newsList.value.length > 0);
  }

  /**
    * Will programatically scroll to the top of the news container
    */
  scrollToTop() {
    this.newsContainer.nativeElement.scrollTop = 0;
  }

  /**
    * Will navigate to next page
    * Will only navigate if next page functionality is enabled
    */
  goNext() {
    if (!this.disableNext()) {
      this.scrollToTop();
      this.newsService.paginate(this.newsService.currentPage + 1);
    }
  }

  /**
    * Will navigate to previous page
    * Will only navigate if previous page functionality is enabled
    */
  goPrev() {
    if (!this.disablePrev()) {
      this.scrollToTop();
      this.newsService.paginate(this.newsService.currentPage - 1);
    }
  }

  /**
    * Indicates if pagination UI should be shown or not
    * @returns boolean
    */
  shouldShowPagination(): boolean {
    return (this.newsService.isLoading() && this.newsService.isPaginating) || !this.newsService.isLoading();
  }

  /**
    * Indicates if "No Entries" placeholder should be shown or not
    * @returns boolean
    */
  shouldShowNoEntriesLabel(): boolean {
    return !this.hasEntries() && !this.newsService.isLoading();
  }

}
