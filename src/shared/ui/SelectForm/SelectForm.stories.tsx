import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Select } from 'shared/ui/Select/Select';
import SelectForm from 'shared/ui/SelectForm/SelectForm';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const optionsMock = [
  {
    value: '123',
    content: 'Первый пункт',
  },
  {
    value: '1234',
    content: 'Второй пункт',
  },
];

export default {
  title: 'shared/SelectForm',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SelectForm>;

const Template: ComponentStory<typeof SelectForm> = (args) => (
  <Formik
    initialValues={{
      username: '',
      password: '',
    }}
    validationSchema={Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Must be at least 6 characters')
        .required('Required'),
    })}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    <Form>
      <SelectForm name="username" placeholder="Страны" options={optionsMock} />
      <button type="submit">Submit</button>
    </Form>
  </Formik>
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Укажите значение',
  options: optionsMock,
};
