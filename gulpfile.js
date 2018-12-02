const gulp = require("gulp");
const typescript = require("gulp-typescript");

gulp.task("typescript", function() {
	return gulp
		.src("src/**/*.ts")
		.pipe(typescript())
		.pipe(gulp.dest("dist"));
});

gulp.task("watch:js", function() {
	return gulp.watch("src/**/*.ts", ["typescript"]);
});
