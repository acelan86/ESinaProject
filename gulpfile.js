var gutil = require("gulp-util");
var gulp = require("gulp");
var revall = require("gulp-rev-all");
var clean = require("gulp-clean");
var mainBowerFiles = require('main-bower-files');
var connect = require("gulp-connect");
var usemin = require("gulp-usemin");
var gulpFilter = require("gulp-filter");
var uglify = require("gulp-uglify");
var jsx = require("gulp-react");
var imagemin = require("gulp-imagemin");
var jshint = require("gulp-jshint");

var paths = {
    src: "src",
    dist: "dist",
    dev: "dev",
    tmp: "tmp"
};

var port = 8888;

/**
 * tools
 */
gulp.task("connect", function () {
    connect.server({
        port: port
    });
});

/**
 * some clean
 */
gulp.task("clean_dev", function () {
    return gulp.src(paths.dev, {read: false})
        .pipe(clean({
            force: true 
        }));
});
gulp.task("clean_tmp", function () {
    return gulp.src(paths.tmp, {read: false})
        .pipe(clean({
            force: true 
        }));
});
gulp.task("clean_dist", function () {
    return gulp.src(paths.dist, {read: false})
        .pipe(clean({
            force: true 
        }));
});

gulp.task("clean", ["clean_dev", "clean_dist", "clean_tmp"]);



/**
 * dev
 */
//1. src -> dev
gulp.task("src2dev", ["clean_dev"], function () {
    return gulp.src(paths.src + "/**/*")
        .pipe(gulp.dest(paths.dev));
});
//2. bower/files -> dev/lib
gulp.task("bower", ["src2dev"], function () {
    return gulp.src(mainBowerFiles({
            includeDev: true
        }))
        .pipe(gulp.dest(paths.dev + "/lib"));
});
//3. compile  [react, cssgrace]  dev -> dev
gulp.task("compile", ["bower"], function () {
    return gulp.src(paths.dev + "/**/*.js")
        .pipe(jsx({
            harmony: true
        }))
        .pipe(jshint())
        .pipe(gulp.dest(paths.dev));
});

//4、server & watch
gulp.task("dev", ["compile", "connect"]);


/**
 * package
 * first exec gulp dev
 */

//1. dev -> tmp
gulp.task("dev2tmp", ["clean_dist", "clean_tmp"], function () {
    return gulp.src(paths.dev + "/**/*")
        .pipe(gulp.dest(paths.tmp));
});

//2. usemin concat files  tmp -> tmp
gulp.task("usemin", ["dev2tmp"], function () {
    return gulp.src(paths.tmp + "/**/*.html")
        .pipe(usemin())
        .pipe(gulp.dest(paths.tmp));
});

//3. optimizes tmp -> tmp
gulp.task("optimize_image", ["usemin"], function () {
    return gulp.src(paths.tmp + "/**/*.{jpg,gif,jpeg,png}")
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(paths.tmp));
});
gulp.task("optimize_js", ["usemin"], function () {
    return gulp.src(paths.tmp + "/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest(paths.tmp));
});

//3. reval md5 files  tmp -> dist
gulp.task("rev", ["optimize_image", "optimize_js"], function () {
    return gulp.src(paths.tmp + "/**")
        .pipe(revall({
            ignore: ['.html']
            ,silent: true
            //,prefix: "http://localhost:8888/dist"
        }))
        .pipe(gulp.dest(paths.dist))
        .pipe(revall.manifest())
        .pipe(gulp.dest(paths.dist));
});

//4. clean tmp
gulp.task("package", ["rev"], function () {
    return gulp.src(paths.tmp, {read: false})
        .pipe(clean({
            force: true
        }));
});


/**
 * alias
 */
gulp.task("default", ["dev"]);