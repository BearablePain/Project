import React, { FC } from 'react';
import { ErrorMessage } from 'formik';
import { classNames } from 'shared/lib/classNames/classNames';
import { ErrorMessageProps } from 'formik/dist/ErrorMessage';
import cls from './ErrorFormMessage.module.scss';

interface ErrorFormMessageProps extends ErrorMessageProps {
  className?: string;
}

export const ErrorFormMessage: FC<ErrorFormMessageProps> = (props) => {
  const {
    className,
  } = props;
  console.log(cls.errorMessage);
  return (
    <ErrorMessage
      className={classNames('error-message', {}, [className, cls.errorMessage])}
      {...props}
    />
  );
};
