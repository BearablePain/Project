import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Icon } from './Icon';

export default {
  title: '/Icon',
  component: Icon,
  argTypes: {},
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
