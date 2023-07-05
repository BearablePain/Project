export {
  IProfile,
  IProfileSchema,
} from './model/types/profile';

export {
  profileActions,
  profileReducer,
} from './model/slice/profileSlice';

export {
  fetchProfileData,
} from './model/services/fetchProfileData/fetchProfileData';

export { updateProfileData } from 'entities/Profile/model/services/updateProfileData/updateProfileData';

export {
  ProfileCard,
} from './ui/ProfileCard/ProfileCard';
