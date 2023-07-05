export { ProfileCard } from 'entities/Profile';

export {
  ProfilePageAsync as ProfilePage,
} from './ui/ProfilePage.async';

export {
  profileActions,
  profileReducer,
} from '../../entities/Profile/model/slice/profileSlice';

export {
  fetchProfileData,
} from '../../entities/Profile/model/services/fetchProfileData/fetchProfileData';

export { getProfileIsLoading } from '../../entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
export { getProfileData } from '../../entities/Profile/model/selectors/getProfileData/getProfileData';
export { getProfileError } from '../../entities/Profile/model/selectors/getProfileError/getProfileError';
export { getProfileReadonly } from '../../entities/Profile/model/selectors/getProfileReadonly/getProfileReadonly';
export { getProfileForm } from '../../entities/Profile/model/selectors/getProfileForm/getProfileForm';
