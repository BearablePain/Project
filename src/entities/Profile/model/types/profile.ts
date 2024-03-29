import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency/model/types/currency';

export interface IProfile {
  id?: string;
  first?: string;
  lastname?: string;
  age?: number,
  currency?: Currency,
  country?: Country;
  city?: string,
  username?: string;
  avatar?: string;
}

export interface IProfileSchema {
  data?: IProfile;
  form?: IProfile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
}
