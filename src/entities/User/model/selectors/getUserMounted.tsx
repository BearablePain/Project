import { IStateSchema } from 'app/providers/StoreProvider';

export const getUserMounted = (state: IStateSchema) => state.user.mounted;
