/* eslint-disable */
const glob = require("glob");

module.exports = {
	context: __dirname,
	entry: glob.sync("./src/**/*.{js,jsx,tsx}").reduce(
		(entries, entry) =>
			Object.assign(entries, {
				[entry.replace("./src/", "").replace(/\.(js|jsx|tsx)$/, "")]: entry
			}),
		{}
	),
	output: {
		filename: "[name].js"
	},
	mode: "production",
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
							require.resolve("@babel/plugin-transform-react-constant-elements")
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
	node: {
		process: "mock",
		Buffer: false,
		setImmediate: false
	},
	devServer: {
		historyApiFallback: true
	}
};
