"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var htmlmin = require("gulp-htmlmin");
var jsmin = require("gulp-minify");
var concat = require('gulp-concat');

gulp.task("js", function() {
  return gulp.src("source/js/*.js")
    .pipe(sourcemap.init())
    .pipe(concat('all.js'))
    .pipe(jsmin({noSource: true}))
    .pipe(sourcemap.write())
    .pipe(gulp.dest("build/js"))
});

gulp.task("js-min", function() {
  return gulp.src(["source/js/*.js"])
    .pipe(jsmin({
      ext: {
        min: ".min.js"
      },
      noSource: true
    }))
    .pipe(gulp.dest("build/js"))
});

gulp.task("clean", function () {
  return del("build");
});



gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.woff",
    "source/fonts/**/*.woff2",
    "source/img/**",
    "source/*.ico"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ])).pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png, jpg, svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()

    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html"));
  gulp.watch("source/*.template", gulp.series("html"));
  gulp.watch("source/**/*.*").on("change", server.reload);

});
gulp.task("build", gulp.series("clean", "js-min", "copy", "css", "html"));
gulp.task("start", gulp.series("build", "server"));
