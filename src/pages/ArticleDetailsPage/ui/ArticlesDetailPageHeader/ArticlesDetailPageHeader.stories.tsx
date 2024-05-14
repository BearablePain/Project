import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticlesDetailPageHeader } from './ArticlesDetailPageHeader';

export default {
  title: '/ArticlesDetailPageHeader',
  component: ArticlesDetailPageHeader,
  argTypes: {},
} as ComponentMeta<typeof ArticlesDetailPageHeader>;

const Template: ComponentStory<typeof ArticlesDetailPageHeader> = (args) => <ArticlesDetailPageHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
