import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputForm from './InputForm';

export default {
  title: 'shared/InputForm',
  component: InputForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof InputForm>;

const Template: ComponentStory<typeof InputForm> = (args) => (
  <Formik
    initialValues={{ username: '', password: '' }}
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
      <InputForm name="username" type="text" placeholder="Username" />
      <InputForm name="password" type="password" placeholder="Enter password" />
      <button type="submit">Submit</button>
    </Form>
  </Formik>
);

export const Primary = Template.bind({});
Primary.args = {
  name: 'username',
  type: 'text',
  placeholder: 'Type text',
};
