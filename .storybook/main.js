module.exports = {
  stories: ["../src/components/**/*.stories.tsx"],
  addons: [
    {
      name: "@storybook/addon-docs",

    }
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("awesome-typescript-loader")
        }
      ]
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  }
};
