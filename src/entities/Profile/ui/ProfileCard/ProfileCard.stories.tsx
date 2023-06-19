import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileCard } from 'entities/Profile';
import { Country } from 'entities/Country';
import avatar from 'shared/assets/tests/storybook.jpg';
import { Currency } from 'entities/Currency/model/types/currency';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  profileFormData: {
    username: 'admin',
    age: 30,
    country: Country.Russia,
    lastname: 'Veselov',
    first: 'Stas',
    city: 'Moscow',
    currency: Currency.RUB,
    avatar,
  },
};

export const withError = Template.bind({});
withError.args = {
  error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
