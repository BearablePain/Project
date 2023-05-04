import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTAddNs } from 'shared/lib/i18/hooks/useTAddNs';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
  const t = useTAddNs('profile');
  const data = useSelector(getProfileData);
  // const isLoading = useSelector(getProfileIsLoading);
  // const error = useSelector(getProfileError);

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title={t('Профиль')} />
        <Button
          className={cls.editBtn}
          theme={ButtonTheme.OUTLINE}
        >
          {t('Редактировать')}
        </Button>
      </div>
      <div className={cls.data}>
        {/*    <InputForm
          name="first"
          label={t('Имя')}
          value={data?.first}
          placeholder={t('Ваше имя')}
          className={cls.input}
        />
        <InputForm
          label={t('Фамилия')}
          name="lastname"
          value={data?.lastname}
          placeholder={t('Ваша фамилия')}
          className={cls.input}
        /> */}
      </div>
    </div>
  );
};
