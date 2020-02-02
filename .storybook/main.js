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
      loader: "babel-loader?cacheDirectory=true",
      options: {
        sourceMap: true,
        presets: [
          [require.resolve("@babel/preset-typescript"), { jsxPragma: "h" }],
          [
            require.resolve("@babel/preset-env"),
            {
              targets: {
                browsers: ["last 2 versions", "IE >= 9"]
              },
              modules: false,
              loose: true
            }
          ],
          [require.resolve("@babel/preset-react")]
        ],
        plugins: [
          [require.resolve("@babel/plugin-transform-runtime")],
          [require.resolve("@babel/plugin-transform-react-jsx-source")],
          [
            require.resolve("@babel/plugin-transform-react-jsx"),
            { pragma: "h", pragmaFrag: "Fragment" }
          ],
          [
            require.resolve("@babel/plugin-proposal-class-properties"),
            { loose: true }
          ]
        ]
      }
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  }
};
