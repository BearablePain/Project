import { useFormikContext } from 'formik';
import React, { FC, memo, useCallback } from 'react';
import { ErrorFormMessage } from 'shared/ui/ErrorFormMessage/ErrorFormMessage';
import Input, { InputProps } from '../Input/Input';

interface InputFormProps extends InputProps {
  name: string;
  label?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
  value?: string | number;
  readonly?: boolean;
}

const InputForm: FC<InputFormProps> = memo(({
  name,
  label,
  onChange,
  value,
  readonly,
  ...inputProps
}: InputFormProps) => {
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
      {label && <label htmlFor={inputProps.id || name}>{label}</label>}
      <Input
        name={name}
        value={value || values?.[name]}
        onChange={handleChangeWithFormik}
        {...inputProps}
        readonly={readonly}
      />
      <ErrorFormMessage name={name} component="div" />
    </>
  );
});

export default InputForm;
