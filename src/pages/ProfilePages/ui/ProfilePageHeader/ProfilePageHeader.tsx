import { classNames } from 'shared/lib/classNames/classNames';
import { FC, useCallback } from 'react';
import { useTAddNs } from 'shared/lib/i18/hooks/useTAddNs';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { getProfileReadonly } from 'entities/Profile/model/selectors/getProfileReadonly/getProfileReadonly';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions } from 'entities/Profile/model/slice/profileSlice';
import { useFormikContext } from 'formik';
import { IProfile } from 'entities/Profile';
import { getUserAuthData } from 'entities/User';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = (props) => {
  const { className } = props;
  const t = useTAddNs('ProfilePageHeader');
  const readonly = useSelector(getProfileReadonly);
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    resetForm,
  } = useFormikContext<IProfile>();

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(true));
    resetForm();
  }, [dispatch, resetForm]);

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('Профиль')} />
      {canEdit && (
        <div className={cls.btnsWrapper}>
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
      )}

    </div>
  );
};
