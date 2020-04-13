import { Response } from './response.interface';
import { News } from '../models';

export interface NewsResponse extends Response {
  data: {
    status: string;
    totalResults?: number;
    articles: News[];
  };
}
