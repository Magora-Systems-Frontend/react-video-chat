'use strict';

// Dependencies
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var psi = require('psi');
var runSequence = require('run-sequence');
var source = require('vinyl-source-stream');
var $ = require('gulp-load-plugins')();
var watchify = require('watchify');
var jade = require("gulp-jade");

/**
 * If gulp tasks should be run in 'production' mode
 * @return {Boolean}
 */
var isProd = $.util.env.prod;

var config = {
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

// Run Pagespeed Insights on mobile
gulp.task('pagespeed:mobile', function (done) {
    return psi.output(config.deploySite, {
        nokey:    'true',
        strategy: 'mobile'
    }, done);
});

// Run Pagespeed Insights on mobile
gulp.task('pagespeed:desktop', function (done) {
    return psi.output(config.deploySite, {
        nokey:    'true',
        strategy: 'desktop'
    }, done);
});

// Run Pagespeed Insights on both mobile and desktop
gulp.task('pagespeed', function () {
    return runSequence('pagespeed:mobile', 'pagespeed:desktop');
});

// Lint and build source JavaScript files
gulp.task('js', function () {
    var bundler = browserify({
        debug:     true,
        entries:   [config.js.entry],
        transform: [babelify],
        cache:     {}, packageCache: {}
    });

    if ($.util.env.watch) {
        bundler = watchify(bundler);
        // Rebundle when any included file is changed
        bundler.on('update', rebundle);
    }

    function rebundle(ids) {
        if (ids) {
            $.util.log(
                $.util.colors.magenta('Rebundling'),
                $.util.colors.magenta(ids.join(', '))
            );
        }
        else {
            $.util.log($.util.colors.magenta('Bundling...'));
        }

        bundler
            .bundle()
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(isProd ? $.uglify({mangle: false}) : $.util.noop())
            .pipe(gulp.dest(config.js.dest));
    }

    bundler
        .on('error', $.util.log)
        // Log amount of bytes of generated bundle
        .on('bytes', function (bytes) {
            var whichSize = 0;
            var sizes = ['bytes', 'kb', 'mb'];

            if (bytes > 1000) {
                bytes = bytes / 1000;
                whichSize = 1;
            }

            if (bytes > 1000) {
                bytes = bytes / 1000;
                whichSize = 2;
            }

            return $.util.log(
                $.util.colors.magenta('Bundle'),
                'is',
                $.util.colors.magenta(bytes, sizes[whichSize])
            );
        })
        // Log amount of milliseconds taken to generate bundle
        .on('time', function (time) {
            return $.util.log(
                $.util.colors.magenta('Bundle'),
                'completed in', $.util.colors.magenta(time + ' milliseconds')
            );
        });

    rebundle();

    return bundler;
});

// Build CSS files
gulp.task('css', function () {
    var stream = gulp.src(config.css.main);

    stream
        .pipe(!isProd ? $.sourcemaps.init({loadMaps: true}) : $.util.noop())
        .pipe($.less())
        .pipe(!isProd ? $.sourcemaps.write() : $.util.noop())
        .pipe($.size({title: 'CSS'}))
        .pipe(gulp.dest(config.css.dest));

    return stream;
});

// Build Jade files
gulp.task("jade", function () {
    var stream = gulp.src(config.jade.main);

    stream
        .pipe(jade({pretty: !isProd}))
        .pipe(gulp.dest(config.jade.dest));

    return stream;
});

// Optimize Images
gulp.task('images', function () {
    return gulp.src(['src/images/**/*'])
        .pipe(gulp.dest('dist/images'));
});

gulp.task('vendor', function () {
    var stream;
    var bower = function (path) {
        return 'bower_components/' + path;
    };

    if (isProd) {
        // Minified bower dependencies
        stream = gulp.src([
            bower('jquery/dist/jquery.min.js'),
            bower('bootstrap/dist/js/bootstrap.min.js'),
            bower('classnames/index.js'),
            bower('flux/dist/Flux.js'),
            bower('react/react.min.js'),
            bower('react-router/build/umd/ReactRouter.min.js')
        ]);
    }
    else {
        // Un-minified bower dependencies
        stream = gulp.src([
            bower('jquery/dist/jquery.js'),
            bower('bootstrap/dist/js/bootstrap.js'),
            bower('classnames/index.js'),
            bower('flux/dist/Flux.js'),
            bower('react/react.js'),
            bower('react-router/build/umd/ReactRouter.js')
        ]);
    }

    // Copy dependencies
    return stream
        .pipe($.concat('vendor.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function () {
    gulp.watch(config.css.source, ["css"]);
    gulp.watch(config.jade.source, ["jade"]);
});

// Build development assets
gulp.task('build', function () {
    return runSequence(["images"], ["vendor", "js", "css", "jade"]);
});

// Build development assets and serve
gulp.task('default', function () {
    if ($.util.env.watch) {
        return runSequence(['build'], 'watch');
    }

    return runSequence('build');
});
