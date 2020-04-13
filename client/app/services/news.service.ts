import { environment } from '../../environments/environment';
import { API_ROUTES } from '../configs/constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { News, Source } from '../models';
import { SourceResponse, NewsResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  readonly newsList: BehaviorSubject<News[]> = new BehaviorSubject<News[]>([]);
  readonly isLoadingNewsList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly loadingNewsListError: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  readonly sources: BehaviorSubject<Source[]> = new BehaviorSubject<Source[]>([]);
  readonly isLoadingSources: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly loadingSourcesError: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private _totalResultsCount = 0;
  private _pageSize = 10;
  private _currentPage = 1;
  private _sourceId: string = null;
  private _isPaginating = false;

  /* getters and setters */

  get currentPage(): number {
    return this._currentPage;
  }

  get totalResultsCount(): number {
    return this._totalResultsCount;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  get activeSourceid(): string {
    return this._sourceId;
  }

  get isPaginating(): boolean {
    return this._isPaginating;
  }

  /**
    * Sets current active source id
    * Will invoke resetNewsList
    * Will invoke loadNews
    * @param newSourceId string
    */
  set activeSourceId(newSourceId: string) {
    if (!this.isLoading() && !this.isActiveSourceIdSameWith(newSourceId)) {
      this._sourceId = newSourceId;
      this.resetNewsList();
      this.loadNews();
    }
  }

  constructor(private http: HttpClient) { }

  /**
    * Will load news articles in background.
    * Will emit values onto sisLoadingNewsList, loadingNewsListError, and newsList subjects
    * Will update _currentPage
    * @param page (optional) (default = 1)
    */
  public loadNews(page = 1) {
    if (!this.isLoadingNewsList.value) {
      // this.newsList.next([]);
      this._currentPage = page;
      this.isLoadingNewsList.next(true);
      this.loadingNewsListError.next(null);
      let params = new HttpParams()
        .set('page', page + '')
        .set('pageSize', this._pageSize + '');
      if (this._sourceId) {
        params = params.append('sources', this._sourceId);
      }
      this.http.get<NewsResponse>(`${environment.apiUrl}${API_ROUTES.news.get}`, {params})
        .subscribe(
          (res: NewsResponse) => {
            this._totalResultsCount = res.data.totalResults;
            this.newsList.next(res.data.articles);
            this.isLoadingNewsList.next(false);
            this._isPaginating = false;
          },
          (error) => {
            if (page > 1) {
              this._currentPage -= 1;
            }
            this.isLoadingNewsList.next(false);
            this._isPaginating = false;
            this.loadingNewsListError.next(this._generateErrorMessage(error));
            console.error(error);
          }
        );
    }
  }

  /**
    * Will load news sources in background.
    * Will emit values onto sources, isLoadingSources, and loadingSourcesError subjects
    * Will add an "All" category to the sources
    */
  public loadSources() {
    if (!this.isLoadingSources.value) {
      this.sources.next([]);
      this.isLoadingSources.next(true);
      this.loadingSourcesError.next(null);
      this.http.get<SourceResponse>(`${environment.apiUrl}${API_ROUTES.sources.get}`)
        .subscribe(
          (res: SourceResponse) => {
            res.data.sources.unshift({
              id: null,
              name: 'All',
              description: null,
              url: null,
              category: null,
              language: null,
              country: null,
            });
            this.sources.next(res.data.sources);
            this.isLoadingSources.next(false);
          },
          (error) => {
            this.isLoadingSources.next(false);
            this.loadingSourcesError.next(this._generateErrorMessage(error));
            console.error(error);
          }
        );
    }
  }

  /**
    * Extracts Server's error message
    * @param error any - The error object
    * @returns string
    */
  private _generateErrorMessage(error: any): string {
    if (error.error) {
      if (error.error.code) {
        return `Server responded with ${error.error.code}: ${error.error.message}`;
      }
      return error.error.message;
    }
    if (error.headers) {
      return `Server responded with ${error.headers.status}:${error.headers.statusText}`;
    }
    return 'Something went wrong...';
  }

  /**
    * Indicates if client is currently loading
    * @returns boolean
    */
  public isLoading(): boolean {
    return this.isLoadingNewsList.value || this.isLoadingSources.value;
  }

  /**
    * Initializes the state of this service
    */
  public initialize() {
    this.loadNews();
    this.loadSources();
  }

  /**
    * Indicates if the currently active source is same with the given source id
    * @param sourceId string
    * @returns boolean
    */
  public isActiveSourceIdSameWith(sourceId: string): boolean {
    return this._sourceId === sourceId;
  }

  /**
    * Sets News List to an empty Array
    */
  public resetNewsList() {
    this.newsList.next([]);
  }

  /**
    * Determines if can navigate to the previous page
    * @returns boolean
    */
  public canGoPrev(): boolean {
    return this._currentPage > 1;
  }

  /**
    * Determines if can navigate to the next page
    * @returns boolean
    */
  public canGoNext(): boolean {
    return this._currentPage < Math.ceil(this.totalResultsCount / this._pageSize);
  }

  /**
    * Generates current page text string
    * @returns string
    */
  public getCurrentPageText(): string {
    const startPage = ((this._currentPage - 1) * this._pageSize) + 1;
    const endPromiseValue = this._currentPage * this._pageSize;
    const endPage = endPromiseValue <= this.totalResultsCount ? endPromiseValue : this.totalResultsCount;
    return `${startPage} - ${endPage}`;
  }

  /**
    * Sets news load to pagination
    * @param page number
    */
  public paginate(page: number) {
    this._isPaginating = true;
    this.loadNews(page);
  }

}
