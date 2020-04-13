import {SourceIdentity} from './source-identity.interface';

export interface Source extends SourceIdentity {
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}
