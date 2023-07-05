import { IStateSchema } from 'app/providers/StoreProvider';

export const getProfileFormReadonly = (state: IStateSchema) => state.profile?.readonly;
