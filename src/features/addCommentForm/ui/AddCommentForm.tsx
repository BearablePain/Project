import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import InputForm from 'shared/ui/InputForm/InputForm';
import { Form, Formik } from 'formik';
import { TReducerList, useDynamicReducerLoader } from 'shared/lib/hooks/useDynamicLoader/useDynamicReducerLoader';
import { addCommentFormActions, addCommentFormReducer } from 'features/addCommentForm/model/slices/addCommentFormSlice';
import { getAddCommentFormText } from 'features/addCommentForm/model/selectors/addCommentFormSchema';
import { AddComment } from 'features/addCommentForm/model/types/AddComment';
import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: TReducerList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const {
    className,
    onSendComment,
  } = props;
  const { t } = useTranslation();
  const text = useSelector(getAddCommentFormText);
  const dispatch = useAppDispatch();
  useDynamicReducerLoader({ reducers });

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value));
  }, [dispatch]);

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <Formik
      initialValues={new AddComment()}
      validationSchema={AddComment.yupValidationSchema}
      onSubmit={onSendHandler}
    >
      {({ handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className={classNames(cls.AddCommentForm, {}, [className])}
        >
          <InputForm
            name="text"
            className={cls.input}
            placeholder={t('Введите текст комментария')}
            value={text}
            onChange={onCommentTextChange}
          />
          <Button
            theme={ButtonTheme.OUTLINE}
            type="submit"
          >
            {t('Отправить')}
          </Button>
        </Form>
      )}
    </Formik>
  );
});

export default AddCommentForm;
