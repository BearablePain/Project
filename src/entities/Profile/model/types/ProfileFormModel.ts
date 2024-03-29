import * as Yup from 'yup';
import { tLocalize } from 'shared/lib/i18/tLocalize';
import { IProfile } from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency/model/types/currency';

export class ProfileFormModel implements Partial<IProfile> {
  first?: string;

  lastname?: string;

  age?: number;

  currency?: Currency;

  country?: Country;

  city?: string;

  username?: string;

  avatar?: string;

  constructor(data?: IProfile) {
    this.lastname = data?.lastname;
    this.first = data?.first;
    this.age = data?.age;
    this.currency = data?.currency;
    this.country = data?.country;
    this.city = data?.city;
    this.username = data?.username;
    this.avatar = data?.avatar;
  }

  static validationSchema = Yup.object()
    .shape({
      first: Yup.string()
        .required(tLocalize('Имя обязательное поле')),
      lastname: Yup.string()
        .required(tLocalize('Фамилия обязательное поле')),
      age: Yup.string(),
    });
}
