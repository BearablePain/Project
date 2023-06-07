import { classNames, TMods } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useMemo } from 'react';
import { IClientSelectOption } from 'shared/lib/options/types/IClientSelectOption';
import cls from './Select.module.scss';

export interface SelectProps {
  className?: string;
  label?: string;
  options?: IClientSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
  name: string;
  placeholder?: string;
}

export const Select = memo((props: SelectProps) => {
  const {
    className,
    label,
    options,
    onChange,
    value,
    readonly,
    name,
    placeholder,
  } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const optionsList = useMemo(() => options?.map((opt) => (
    <option
      className={cls.option}
      value={opt.value}
      key={opt.value}
    >
      {opt.content}
    </option>
  )), [options]);

  const mods: TMods = {};

  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label && (
        <span className={cls.label}>
          {`${label}>`}
        </span>
      )}
      <select
        name={name}
        disabled={readonly}
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
      >
        {optionsList}
      </select>
    </div>
  );
});
