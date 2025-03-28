/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    '../ui-library/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../ui-library/**/*.mdx'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    // Find the CSS rule
    const cssRule = config.module.rules.find(rule => 
      rule.test && rule.test.toString().includes('css')
    );

    if (cssRule) {
      // Remove the existing CSS rule
      config.module.rules = config.module.rules.filter(rule => rule !== cssRule);
    }

    // Add our custom CSS rule
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            implementation: require('postcss'),
          },
        },
      ],
    });

    return config;
  },
};

export default config;
