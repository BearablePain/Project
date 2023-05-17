import { classNames } from 'shared/lib/classNames/classNames';
import { FC, useCallback } from 'react';
import { useTAddNs } from 'shared/lib/i18/hooks/useTAddNs';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { getProfileReadonly } from 'pages/ProfilePages/model/selectors/getProfileReadonly/getProfileReadonly';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions } from 'pages/ProfilePages/model/slice/profileSlice';
import { useFormikContext } from 'formik';
import { IProfile } from 'entities/Profile';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = (props) => {
  const { className } = props;
  const t = useTAddNs('ProfilePageHeader');
  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
  } = useFormikContext<IProfile>();
  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);
  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(true));
  }, [dispatch]);
  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('Профиль')} />
      {readonly
        ? (
          <Button
            className={cls.editBtn}
            theme={ButtonTheme.OUTLINE}
            onClick={onEdit}
          >
            {t('Редактировать')}
          </Button>
        )
        : (
          <>
            <Button
              className={cls.editBtn}
              theme={ButtonTheme.OUTLINE_RED}
              onClick={onCancelEdit}
            >
              {t('Отменить')}
            </Button>
            <Button
              className={cls.saveBtn}
              theme={ButtonTheme.OUTLINE}
              onClick={() => {
                console.log(11);
                handleSubmit();
              }}
            >
              {t('Сохранить')}
            </Button>
          </>
        )}
    </div>
  );
};
