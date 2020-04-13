import { Component, Input } from '@angular/core';
import { News } from '../../models/news.interface';

@Component({
  selector: 'app-news-entry',
  templateUrl: './news-entry.component.html',
  styleUrls: ['./news-entry.component.css']
})
export class NewsEntryComponent {
  @Input() news: News; // The article to be displayed

  constructor() { }

  /**
    * Invokes Browser navigation to the provided url in a new tab
    * @param url string
    */
  openLink(url: string) {
    if (this.isStringValueValid(url)) {
      window.open(url, '_blank');
    }
  }

  /**
    * Will return false if string value is blank, undefined, null, or equal to "null"
    * @param str string
    * @returns boolean
    */
  isStringValueValid(str: string): boolean {
    return str && str !== 'null';
  }

}
