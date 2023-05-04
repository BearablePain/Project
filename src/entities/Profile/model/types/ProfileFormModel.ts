import * as Yup from 'yup';
import { tLocalize } from 'shared/lib/i18/tLocalize';
import { IProfile } from 'entities/Profile';

export class LoginFormModel {
  public lastname: string = '';

  public first: string = '';

  constructor(data?: IProfile) {
    this.lastname = data?.lastname || '';
    this.first = data?.first || '';
  }

  static yupValidationSchema = Yup.object()
    .shape({
      first: Yup.string()
        .required(tLocalize('Обязательное поле')),
      lastname: Yup.string()
        .required(tLocalize('Password is required')),
    });
}
