var gutil = require("gulp-util");
var gulp = require("gulp");
var revall = require("gulp-rev-all");
var clean = require("gulp-clean");
var mainBowerFiles = require('gulp-bower-src');
var connect = require("gulp-connect");


var paths = {
    src: "src",
    dist: "dist"
};

gulp.task("clean", function () {
    return gulp.src(paths.dist, {read: false})
        .pipe(clean({
            force: true 
        }));
});

gulp.task("bower", function () {
    gutil.log(mainBowerFiles({
        includeDev: true
    }));
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest(paths.src + "/lib"));
});

gulp.task("server", function () {
    connect.server({
        port: 1234
    });
});

gulp.task("revall", ["clean"], function () {
    gulp.src(paths.src + "/**")
        .pipe(revall({
            ignore: ['.html']
            ,silent: true
            //,prefix: "http://localhost:1234/dist"
        }))
        .pipe(gulp.dest(paths.dist))
        .pipe(revall.manifest())
        .pipe(gulp.dest(paths.dist));
});

gulp.task("default", ["revall"]);