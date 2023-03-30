import { ErrorMessage, useFormikContext } from 'formik';
import React, { FC, useCallback } from 'react';
import Input, { InputProps } from '../Input/Input';

interface InputFormProps extends InputProps {
  name: string;
  label?: string;
  onChange?: (value: string) => void;
value?: string
}

const InputForm: FC<InputFormProps> = ({
  name,
  label,
  onChange, value,
  ...inputProps
}) => {
  const {
    values, setFieldValue,
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
        value={value ?? values[name]}
        onChange={handleChangeWithFormik}
        {...inputProps}
      />
      <ErrorMessage name={name} component="div" className="error-message" />
    </>
  );
};

export default InputForm;
