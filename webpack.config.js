/* eslint-disable */
const glob = require("glob");
const TerserPlugin = require("terser-webpack-plugin");

const WebpackBar = require("webpackbar");
module.exports = (env = {}, argv) => {
  const isProduction = argv.mode === "production";
  let config = {
    context: __dirname,
    entry: glob.sync("./src/components/**/*.{js,jsx,tsx}").reduce(
      (entries, entry) =>
        Object.assign(entries, {
          [entry
            .replace("./src/components/", "")
            .replace(/\.(js|jsx|tsx)$/, "")]: entry
        }),
      {}
    ),
    output: {
      filename: "[name].js"
    },
    mode: "production",
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            parse: {
              ecma: 8
            },
            mangle: { safari10: true },
            output: {
              ecma: 5,
              safari10: true,
              comments: false,
              /* eslint-disable-next-line camelcase */
              ascii_only: true
            }
          },
          parallel: true,
          sourceMap: false,
          cache: true
        })
      ],
  
    },
    resolve: {
      alias: {
        react: "preact/compat",
        "react-dom": "preact/compat"
      },
      extensions: [".tsx", ".ts", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "babel-loader",
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
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          options: {
            sourceMap: true,
            presets: [
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
              [require.resolve("@babel/plugin-transform-react-jsx-source")],
              [
                require.resolve("@babel/plugin-transform-react-jsx"),
                { pragma: "createElement", pragmaFrag: "Fragment" }
              ],
              [require.resolve("@babel/plugin-proposal-class-properties")],
              [
                require.resolve(
                  "@babel/plugin-transform-react-constant-elements"
                )
              ],
              [require.resolve("@babel/plugin-syntax-dynamic-import")]
            ]
          }
        },
        {
          test: /\.s?css$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        }
      ]
    },
    devtool: "inline-source-map",
    stats: "errors-only",
    node: {
      process: "mock",
      Buffer: false,
      setImmediate: false
    },
    devServer: {
      historyApiFallback: true
    },
    plugins: [new WebpackBar()]
  };
  return config;
};
