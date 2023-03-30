import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FC, memo, useCallback } from 'react';
import InputForm from 'shared/ui/InputForm/InputForm';
import { LoginFormModel } from 'features/AuthByUsername/model/types/LoginFormModel';
import { getLoginState } from 'features/AuthByUsername/model/selectors/getLoginState';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { loginActions } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface ILoginFormValues {
 username?: string ;
 password?: string;
}

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    username, password, error, isLoading,
  } = useSelector(getLoginState);
  const onChangeUserName = useCallback((value: string) => { dispatch(loginActions.setUsername(value)); }, [dispatch]);
  const onChangePassword = useCallback((value: string) => { dispatch(loginActions.setPassword(value)); }, [dispatch]);
  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, password, username]);

  const tLoginForm = (text: string) => t(text, { ns: 'loginForm' });

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Formik
        initialValues={new LoginFormModel()}
        validationSchema={LoginFormModel.yupValidationSchema}
        onSubmit={onLoginClick}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Text title={tLoginForm('Форма авторизации')} />
            {error && <Text text={tLoginForm('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />}
            <InputForm
              name="username"
              placeholder={tLoginForm('Введите username')}
              onChange={onChangeUserName}
              value={username}
            />
            <InputForm
              name="password"
              type="password"
              placeholder={tLoginForm('Введите пароль')}
              onChange={onChangePassword}
              value={password}
            />
            <Button theme={ButtonTheme.OUTLINE} className={cls.loginBtn} type="submit" disabled={isLoading}>
              {tLoginForm('Войти')}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
