/* eslint-disable import/no-extraneous-dependencies */
const glob = require('glob');

module.exports = {
  entry: glob.sync('./src/**/*.jsx').reduce(
    (entries, entry) => Object.assign(entries, {
      [entry.replace('./src/', '').replace('.jsx', '')]: entry,
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
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },
};
