import { Story } from '@storybook/react';
import { StoreProvider } from 'app/providers/StoreProvider';

export const ProviderDecorator = (StoryComponent: Story) => (
  <StoreProvider>
    <StoryComponent />
  </StoreProvider>
);
