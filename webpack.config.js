var glob = require("glob");
module.exports = {
	entry: glob.sync("./src/*.js").reduce(
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

};
