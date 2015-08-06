"use strict";

var runSequence = require("run-sequence"),
    $           = require("gulp-load-plugins")(),
    dir         = require("require-dir");

// globals
global.gulp = require("gulp");
global.isProd = $.util.env.prod;

global.config = {
    "js":         {
        "entry":  "./src/js/main.js",
        "source": "src/js/**/*.{js,jsx}",
        "dest":   "dist/js"
    },
    "css":        {
        "main":   "./src/less/main.less",
        "source": "src/less/**/*.less",
        "dest":   "dist/css"
    },
    "jade":       {
        "main":   "./src/jade/index.jade",
        "source": "src/jade/**/*.jade",
        "dest":   "./"
    },
    "deploySite": "http://"
};

dir("./gulp");

// Build development assets and serve
gulp.task("default", function () {
    if ($.util.env.watch) {
        return runSequence(["build"], "watch");
    }

    return runSequence("build");
});