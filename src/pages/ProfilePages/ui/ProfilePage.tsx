import { classNames } from 'shared/lib/classNames/classNames';
import { FC, memo, useCallback } from 'react';
import {
  fetchProfileData, ProfileCard, profileReducer, updateProfileData,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { TReducerList, useDynamicReducerLoader } from 'shared/lib/hooks/useDynamicLoader/useDynamicReducerLoader';
import { useSelector } from 'react-redux';
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { ProfilePageHeader } from 'pages/ProfilePages/ui/ProfilePageHeader/ProfilePageHeader';
import { getProfileFormReadonly } from 'entities/Profile/model/selectors/getProfileData/getProfileFormReadonly';
import { getProfileData, getProfileForm } from 'pages/ProfilePages';
import { ProfileFormModel } from 'entities/Profile/model/types/ProfileFormModel';
import { Formik } from 'formik';
import { useParams } from 'react-router-dom';
import { useMount } from 'shared/lib/hooks/useMount/useMount';

const reducers: TReducerList = {
  profile: profileReducer,
};

interface ProfilePagesProps {
  className?: string;
}

const ProfilePage: FC<ProfilePagesProps> = memo((props: ProfilePagesProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const formData = useSelector(getProfileForm);
  const profileFormData = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileFormReadonly);

  const { id } = useParams<{ id: string }>();
  useMount(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

  useDynamicReducerLoader({
    reducers,
    removeAfterUnmount: true,
  });

  const onSave = useCallback(() => {
    if (id) {
      dispatch(updateProfileData(id));
    }
  }, [dispatch, id]);

  return (
    <Formik
      enableReinitialize
      initialValues={profileFormData || new ProfileFormModel()}
      validationSchema={ProfileFormModel.validationSchema}
      onSubmit={async () => {
        console.log(1);
        await onSave();
      }}
    >
      <div className={classNames('', {}, [className])}>
        <ProfilePageHeader />
        <ProfileCard profileFormData={formData} isLoading={isLoading} error={error} readonly={readonly} />
      </div>
    </Formik>
  );
});

export default ProfilePage;
