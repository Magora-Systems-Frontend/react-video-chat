"use strict";

var runSequence = require("run-sequence");

// Build development assets
gulp.task("build", function () {
    return runSequence(["images"], ["vendor", "js", "css", "jade"]);
});