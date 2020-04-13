import { Response } from './response.interface';
import { Source } from '../models';

export interface SourceResponse extends Response {
  data: {
    status: string;
    totalResults?: number;
    sources: Source[];
  };
}
