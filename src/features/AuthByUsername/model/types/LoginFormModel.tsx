import * as Yup from 'yup';
import { tLocalize } from 'shared/lib/i18/tLocalize';
import { ILoginFormValues } from 'features/AuthByUsername/ui/LoginForm/LoginForm';

export class LoginFormModel {
  public username: string = '';

  public password: string = '';

  constructor(data?: ILoginFormValues) {
    this.username = data?.username || '';
    this.password = data?.password || '';
  }

  static yupValidationSchema = Yup.object().shape({
    username: Yup.string().required(tLocalize('Обязательное поле')),
    password: Yup.string().required(tLocalize('Password is required')),
  });
}
