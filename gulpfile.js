const { src, dest, watch, series } = require("gulp");
const typescript = require("gulp-typescript");

const js = () => {
	return src("src/**/*.ts")
		.pipe(typescript())
		.pipe(dest("dist"));
};

const listen = () => {
	watch("src/**/*.ts", series(js));
};

module.exports = { listen };
