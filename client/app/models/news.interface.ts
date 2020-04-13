import {SourceIdentity} from './source-identity.interface';

export interface News {
  source: SourceIdentity;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
