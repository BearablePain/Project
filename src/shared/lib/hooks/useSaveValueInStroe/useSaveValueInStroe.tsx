import { ChangeEvent, useCallback } from 'react';
import { IProfile, profileActions } from 'entities/Profile';
import { useDispatch } from 'react-redux';

type TValue = IProfile

interface IValueForSaveInStore {
  value: TValue;
  event?: ChangeEvent<HTMLInputElement>;
}

const saveFunction = {
  profile: profileActions.updateProfile,
};

export /**
 *save value in store for form
 *example: if we take the value from the event saveValueInStore({ event }) or
 onChange={(key_value: IClientSelectOption) => {
   saveValueInStore({ value: { key_value } });
                        }}
 * @return {*}
 * @param nameFormModel
 */

const useSaveValueStore = (nameFormModel: keyof typeof saveFunction) => {
  const dispatch = useDispatch();

  return useCallback(
    (value: TValue) => {
      dispatch(saveFunction[nameFormModel](value));
    },
    [dispatch, nameFormModel],
  );
};
