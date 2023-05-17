export {
  IProfile,
  IProfileSchema,
} from './model/types/profile';

export {
  profileActions,
  profileReducer,
} from '../../pages/ProfilePages/model/slice/profileSlice';

export {
  fetchProfileData,
} from '../../pages/ProfilePages/model/services/fetchProfileData/fetchProfileData';

export { updateProfileData } from 'pages/ProfilePages/model/services/updateProfileData/updateProfileData';

export {
  ProfileCard,
} from './ui/ProfileCard/ProfileCard';
