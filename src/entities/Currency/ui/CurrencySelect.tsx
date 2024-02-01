import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import SelectForm from 'shared/ui/SelectForm/SelectForm';
import { useTAddNs } from 'shared/lib/i18/hooks/useTAddNs';
import { SelectProps } from 'shared/ui/Select/Select';
import { Currency } from '../model/types/currency';

interface CurrencySelectProps extends SelectProps<Currency> {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  {
    value: Currency.RUB,
    content: Currency.RUB,
  },
  {
    value: Currency.EUR,
    content: Currency.EUR,
  },
  {
    value: Currency.USD,
    content: Currency.USD,
  },
];

export const CurrencySelect = memo(({
  className,
  value,
  onChange,
  readonly,
}: CurrencySelectProps) => {
  const t = useTAddNs('profile');

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency);
  }, [onChange]);

  return (
    <SelectForm
      name="currency"
      className={classNames('', {}, [className])}
      label={t('Укажите валюту')}
      placeholder={t('Укажите валюту')}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  );
});
