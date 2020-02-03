
const path = require("path");
module.exports = {
  stories: ["../src/stories/*.stories.tsx"],
  addons: [
    "@storybook/addon-storysource"
  ],
  webpackFinal: async config => {
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      react: "preact/compat",
      "react-dom": "preact/compat"
    });
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        require.resolve("ts-loader"),
        require.resolve("react-docgen-typescript-loader"),
      ]
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  }
};
