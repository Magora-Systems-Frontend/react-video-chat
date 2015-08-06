"use strict";

var $ = require("gulp-load-plugins")();

gulp.task("vendor", function () {
    var stream;
    var bower = function (path) {
        return "bower_components/" + path;
    };

    if (isProd) {
        // Minified bower dependencies
        stream = gulp.src([
            bower("jquery/dist/jquery.min.js"),
            bower("bootstrap/dist/js/bootstrap.min.js"),
        ]);
    }
    else {
        // Un-minified bower dependencies
        stream = gulp.src([
            bower("jquery/dist/jquery.js"),
            bower("bootstrap/dist/js/bootstrap.js")
        ]);
    }

    // Copy dependencies
    return stream
        .pipe($.concat("vendor.js"))
        .pipe(gulp.dest("dist/js"));
});