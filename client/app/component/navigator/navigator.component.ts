import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent {

  constructor(public newsService: NewsService) { }

}
