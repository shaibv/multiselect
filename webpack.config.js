var glob = require("glob");
module.exports = {
	entry: glob.sync("./src/**/*.js").reduce(
		(entries, entry) =>
			Object.assign(entries, {
				[entry.replace("./src/", "").replace(".js", "")]: entry
			}),
		{}
	),
	output: {
		filename: "[name].js"
	},
	mode: "production",
	node: {
		fs: "empty"
	},
	optimization: {
		splitChunks: {
			chunks: "all"
		}
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",

					options: {
						presets: ["@babel/preset-env"],
						plugins: [
							[
								"@babel/plugin-transform-react-jsx",
								{
									pragma: "h"
								}
							]
						]
					}
				}
			}
		]
	},
	resolve: {
		alias: {
			react: "preact-compat",
			"react-dom": "preact-compat"
		}
	}
};
