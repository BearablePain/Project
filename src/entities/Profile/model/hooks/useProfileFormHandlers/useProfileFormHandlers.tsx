import { useSaveValueStore } from 'shared/lib/hooks/useSaveValueInStroe/useSaveValueInStroe';
import { useCallback, useMemo } from 'react';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency/model/types/currency';
import { isDigital } from 'shared/lib/isDigital/isDigital';

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
    if (value && isDigital(value)) {
      (saveValue({ age: Number(value || 0) }));
    }
  }, [saveValue]);

  const onChangeUsername = useCallback((username?: string) => {
    (saveValue({ username }));
  }, [saveValue]);

  const onChangeAvatar = useCallback((avatar?: string) => {
    (saveValue({ avatar }));
  }, [saveValue]);

  const onChangeCurrency = useCallback((currency: Currency) => {
    saveValue({ currency });
  }, [saveValue]);

  const onChangeCountry = useCallback((country: Country) => {
    saveValue({ country });
  }, [saveValue]);

  return useMemo(() => ({
    onChangeFirst,
    onChangeLastname,
    onChangeCity,
    onChangeAge,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
  }), [onChangeAge, onChangeAvatar, onChangeCity, onChangeCountry, onChangeCurrency, onChangeFirst, onChangeLastname, onChangeUsername]);
};
