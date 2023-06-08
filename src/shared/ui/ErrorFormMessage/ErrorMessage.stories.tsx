import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ErrorFormMessage } from 'shared/ui/ErrorFormMessage/ErrorFormMessage';

export default {
  title: 'shared/ErrorFormMessage',
  component: ErrorFormMessage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ErrorFormMessage>;

const Template: ComponentStory<typeof ErrorFormMessage> = (args) => <ErrorFormMessage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: '1',
};
