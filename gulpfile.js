"use strict";

var runSequence = require("run-sequence"),
    $           = require("gulp-load-plugins")(),
    dir         = require("require-dir");

// globals
global.gulp = require("gulp");
global.isProd = $.util.env.prod;
global.config = require('./config.json');

dir("./gulp");

// Build development assets and serve
gulp.task("default", function () {
    if ($.util.env.watch) {
        return runSequence("build", ["watch", "webServer"]);
    }

    return runSequence("build", "webServer");
});