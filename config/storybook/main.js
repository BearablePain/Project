module.exports = {
  stories: [
    '../../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@bbbtech/storybook-formik/register',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
};
