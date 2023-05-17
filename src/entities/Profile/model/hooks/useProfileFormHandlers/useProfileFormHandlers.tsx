import { useSaveValueStore } from 'shared/lib/hooks/useSaveValueInStroe/useSaveValueInStroe';
import { useCallback, useMemo } from 'react';

export const useProfileFormHandlers = () => {
  const saveValue = useSaveValueStore('profile');

  const onChangeFirst = useCallback((first?: string) => saveValue({ first }), [saveValue]);

  const onChangeLastname = useCallback((lastname?: string) => {
    (saveValue({ lastname }));
  }, [saveValue]);

  const onChangeCity = useCallback((city?: string) => {
    (saveValue({ city }));
  }, [saveValue]);

  const onChangeAge = useCallback((value?: string) => {
    (saveValue({ age: Number(value || 0) }));
  }, [saveValue]);

  const onChangeUsername = useCallback((username?: string) => {
    (saveValue({ username }));
  }, [saveValue]);

  const onChangeAvatar = useCallback((avatar?: string) => {
    (saveValue({ avatar }));
  }, [saveValue]);

  return useMemo(() => ({
    onChangeFirst,
    onChangeLastname,
    onChangeCity,
    onChangeAge,
    onChangeUsername,
    onChangeAvatar,
  }), [onChangeAge, onChangeAvatar, onChangeCity, onChangeFirst, onChangeLastname, onChangeUsername]);
};
