import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import SelectForm from 'shared/ui/SelectForm/SelectForm';
import { Country } from 'entities/Country';
import { useTAddNs } from 'shared/lib/i18/hooks/useTAddNs';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  {
    value: Country.Armenia,
    content: Country.Armenia,
  },
  {
    value: Country.Russia,
    content: Country.Russia,
  },
  {
    value: Country.Belarus,
    content: Country.Belarus,
  },
  {
    value: Country.Kazakhstan,
    content: Country.Kazakhstan,
  },
  {
    value: Country.Ukraine,
    content: Country.Ukraine,
  },
];

export const CountrySelect = memo(({
  className,
  value,
  onChange,
  readonly,
}: CountrySelectProps) => {
  const t = useTAddNs('profile');

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country);
  }, [onChange]);

  return (
    <SelectForm
      name="country"
      className={classNames('', {}, [className])}
      label={t('Укажите страну')}
      placeholder={t('Укажите страну')}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  );
});
