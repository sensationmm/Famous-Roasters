const path = require('path')

module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/preset-create-react-app", '@storybook/addon-viewport'],
  "framework": "@storybook/react",
  core: {
    builder: "webpack5"
  },
  webpackFinal: (config, { configType }) => {
    config.resolve.alias['core-js'] = path.dirname(require.resolve('core-js'));
    config.resolve.fallback['assert'] = false;
    return config;
  },
}