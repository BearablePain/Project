import { classNames, TMods } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { useTAddNs } from 'shared/lib/i18/hooks/useTAddNs';
import { IProfile } from 'entities/Profile';
import { Loader } from 'shared/ui/Loader/Loader';
import InputForm from 'shared/ui/InputForm/InputForm';
import { Form } from 'formik';
import { useProfileFormHandlers } from 'entities/Profile/model/hooks/useProfileFormHandlers/useProfileFormHandlers';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { CurrencySelect } from 'entities/Currency/ui/CurrencySelect';
import { CountrySelect } from 'entities/Country';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  profileFormData?: IProfile;
  isLoading?: boolean;
  error?: string;
  className?: string;
  readonly?: boolean;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const t = useTAddNs('profile');
  const {
    isLoading,
    error,
    className,
    readonly,
    profileFormData,
  } = props;

  const {
    onChangeFirst,
    onChangeLastname,
    onChangeCity,
    onChangeAge,
    onChangeUsername,
    onChangeAvatar,
    onChangeCountry,
    onChangeCurrency,
  } = useProfileFormHandlers();

  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          align={TextAlign.CENTER}
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
        />
      </div>
    );
  }

  const mods: TMods = {
    [cls.editing]: !readonly,
  };

  return (
    <Form className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.data}>
        {profileFormData?.avatar && (
          <div className={cls.avatarWrapper}>
            <Avatar src={profileFormData?.avatar} />
          </div>
        )}
        <InputForm
          name="first"
          value={profileFormData?.first}
          placeholder={t('Ваше имя')}
          className={cls.input}
          readonly={readonly}
          onChange={onChangeFirst}

        />
        <InputForm
          name="lastname"
          value={profileFormData?.lastname}
          placeholder={t('Ваша фамилия')}
          className={cls.input}
          readonly={readonly}
          onChange={onChangeLastname}
        />
        <InputForm
          name="age"
          value={profileFormData?.age}
          placeholder={t('Ваш возраст')}
          className={cls.input}
          onChange={onChangeAge}
          readonly={readonly}
        />
        <InputForm
          name="city"
          value={profileFormData?.city}
          placeholder={t('Город')}
          className={cls.input}
          onChange={onChangeCity}
          readonly={readonly}
        />
        <InputForm
          name="username"
          value={profileFormData?.username}
          placeholder={t('Введите имя пользователя')}
          className={cls.input}
          onChange={onChangeUsername}
          readonly={readonly}
        />
        <InputForm
          name="avatar"
          value={profileFormData?.avatar}
          placeholder={t('Введите ссылку на аватар')}
          className={cls.input}
          onChange={onChangeAvatar}
          readonly={readonly}
        />
        <CurrencySelect
          className={cls.input}
          value={profileFormData?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
        />
        <CountrySelect
          className={cls.input}
          value={profileFormData?.country}
          onChange={onChangeCountry}
          readonly={readonly}
        />
      </div>
    </Form>
  );
};
