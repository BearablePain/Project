import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  FC, memo, useCallback,
} from 'react';
import InputForm from 'shared/ui/InputForm/InputForm';
import { LoginFormModel } from 'features/AuthByUsername/model/types/LoginFormModel';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useTAddNs } from 'shared/lib/i18/hooks/useTAddNs';
import { ReducerList, useDynamicReducerLoader } from 'shared/lib/hooks/useDynamicLoader/useDynamicReducerLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import cls from './LoginForm.module.scss';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';

const initialReducers: ReducerList = { loginForm: loginReducer };

export interface ILoginFormValues {
 username?: string ;
 password?: string;
}

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void
}

const LoginForm: FC<LoginFormProps> = memo(({ className, onSuccess }: LoginFormProps) => {
  const t = useTAddNs('loginForm');
  const dispatch = useAppDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  useDynamicReducerLoader({ reducers: initialReducers });

  const onChangeUserName = useCallback((value: string) => { dispatch(loginActions.setUsername(value)); }, [dispatch]);
  const onChangePassword = useCallback((value: string) => { dispatch(loginActions.setPassword(value)); }, [dispatch]);
  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [dispatch, onSuccess, password, username]);

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Formik
        initialValues={new LoginFormModel()}
        validationSchema={LoginFormModel.yupValidationSchema}
        onSubmit={onLoginClick}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Text title={t('Форма авторизации')} />
            {error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />}
            <InputForm
              name="username"
              placeholder={t('Введите username')}
              onChange={onChangeUserName}
              value={username}
            />
            <InputForm
              name="password"
              type="password"
              placeholder={t('Введите пароль')}
              onChange={onChangePassword}
              value={password}
            />
            <Button theme={ButtonTheme.OUTLINE} className={cls.loginBtn} type="submit" disabled={isLoading}>
              {t('Войти')}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default LoginForm;
