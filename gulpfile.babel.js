import { src, dest, watch, series } from "gulp";
import typescript from "gulp-typescript";
import clean from "gulp-clean";
import plumber from "gulp-plumber";

const js = () =>
	src("src/main.ts")
		.pipe(plumber())
		.pipe(typescript())
		.pipe(dest("lib"));

const clear = () =>
	src("lib", { allowEmpty: true })
		.pipe(plumber())
		.pipe(clean());

const start = () => {
	watch("src/**/*.ts", js);
};

const build = series(clear, js);

export { start, build };
