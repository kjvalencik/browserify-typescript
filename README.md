# Browserify Typescript

	var gulp = require("gulp");

	gulp.task("default", function () {
		return gulp.src("**/*.ts", { read: false })
			.pipe(browserify({
				transform: ["browserify-typescript"],
				extensions: [".ts"]
			}))
			.pipe(gulp.dest("main.js"));
	});
