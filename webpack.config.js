/* eslint-disable import/no-extraneous-dependencies */
const glob = require('glob');

module.exports = {
  entry: glob.sync('./src/**/*.{js,jsx,tsx}').reduce(
    (entries, entry) => Object.assign(entries, {
      [entry.replace('./src/', '').replace(/\.(js|jsx|tsx)$/, '')]: entry,
    }),
    {},
  ),
  output: {
    filename: '[name].js',
  },
  mode: 'production',
  node: {
    fs: 'empty',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',

          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-react-jsx',
                {
                  pragma: 'h',
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-modules-typescript-loader' },
          { loader: 'css-loader', options: { modules: true } },
          { loader: 'sass-loader' },
        ],
      },
      // {
      //   test: /\.s?css$/,
      //   use: [
      //     'typings-for-css-modules-loader?modules&sass',
      //     // 'style-loader',
      //     // {
      //     //   loader: 'css-loader',
      //     //   options: {
      //     //     modules: true,
      //     //     sourceMap: true,
      //     //   },
      //     // },
      //     // 'sass-loader',
      //   ],
      // },
    ],
  },

  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      'create-react-class': 'preact-compat/lib/create-react-class',
    },
  },
};
