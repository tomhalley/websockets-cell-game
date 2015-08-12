'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var del = require("del");
var runSequence = require("run-sequence");
var liveReload = require("gulp-livereload");

var path = {
    app: "./app/index.html",
    app_js: [
        "app/js/app.js",
        "app/js/player.js",
        "app/js/server.js",
        "src/constants.js"
    ]
};

gulp.task("build", function() {
    runSequence("clean",
               ['build-javascript',
                'build-app',
                'build-sass']);
});

gulp.task("clean", function(cb) {
    del(['dist'], cb);
});

gulp.task("build-app", function() {
    return gulp.src(path.app)
        .pipe(gulp.dest('dist/'))
        .pipe(liveReload());
});

gulp.task('build-javascript', function () {
    var b = browserify({entries: path.app_js});

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(liveReload());
});

gulp.task("build-sass", function() {

});

gulp.task("watch", function() {
    liveReload.listen();
    gulp.watch(path.app, ["build-app"]);
    gulp.watch(path.app_js, ['build-javascript']);
});