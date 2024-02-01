import { useFormikContext } from 'formik';
import React, { FC, memo, useCallback } from 'react';
import { Select, SelectProps } from 'shared/ui/Select/Select';
import { ErrorFormMessage } from 'shared/ui/ErrorFormMessage/ErrorFormMessage';

interface SelectFormProps extends SelectProps<any> {
  name: string;
  label?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
  classNameLabel?: string;
}

const SelectForm: FC<SelectFormProps> = memo(({
  name,
  label,
  onChange,
  value,
  readonly,
  options,
  className,
  classNameLabel,
  placeholder,
}: SelectFormProps) => {
  const {
    values,
    setFieldValue,
  } = useFormikContext<any>();

  const handleChangeWithFormik = useCallback((value: string) => {
    setFieldValue(name, value);
    onChange?.(value);
  }, [name, onChange, setFieldValue]);

  return (
    <>
      <Select
        name={name}
        className={className}
        label={label}
        options={options}
        value={value || values?.[name]}
        onChange={handleChangeWithFormik}
        readonly={readonly}
        placeholder={placeholder}
      />
      <ErrorFormMessage name={name} component="div" />
    </>
  );
});

export default SelectForm;
