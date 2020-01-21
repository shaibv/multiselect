module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "react"],
	extends: [
		"airbnb-typescript",
		"prettier/@typescript-eslint",
		"plugin:react/recommended"
	],
	settings: {

		react: {
			createClass: "createReactClass",
			pragma: "h",
			version: "detect"
		}
	}
};
