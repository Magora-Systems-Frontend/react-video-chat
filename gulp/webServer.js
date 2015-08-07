"use strict";

var webServer = require("gulp-webserver");

gulp.task("webServer", function () {
    return gulp
        .src(config["public"])
        .pipe(webServer(config["webServer"]["server"]));
});