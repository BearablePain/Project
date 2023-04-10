import { classNames } from 'shared/lib/classNames/classNames';
import { FC, memo, useEffect } from 'react';
import { fetchProfileData, ProfileCard, profileReducer } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ReducerList, useDynamicReducerLoader } from 'shared/lib/hooks/useDynamicLoader/useDynamicReducerLoader';

const reducers: ReducerList = {
  profile: profileReducer,
};

interface ProfilePagesProps {
    className?: string;
}
const ProfilePage: FC<ProfilePagesProps> = memo((props: ProfilePagesProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  useDynamicReducerLoader({ reducers, removeAfterUnmount: true });

  return (
    <div className={classNames('', {}, [className])}>
      <ProfileCard />
    </div>
  );
});

export default ProfilePage;
