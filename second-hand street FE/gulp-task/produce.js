const gulp = require("gulp")
const path = require("path")
const plumber = require("gulp-plumber")
const less = require("gulp-less")
const cleanCss = require("gulp-clean-css")
const imageMin = require("gulp-imagemin")
const zip = require("gulp-zip")
const webpack = require("webpack-stream")

let config = require("./config")

module.exports = {
    css_compress() {
        return gulp.src([config.LESS])
                .pipe(plumber())
                .pipe(less())
                .pipe(cleanCss())
                .pipe(gulp.dest(config.STYLES))
    },
    image_compress() {
        return gulp.src([config.IMAGE])
                .pipe(plumber())
                .pipe(imageMin())
                .pipe(gulp.dest(config.IMAGES))
    },
    script_compress() {
        return gulp.src([config.SCRIPT_MAIN])
                .pipe(plumber())
                .pipe(webpack(config.WEBPACK['produce']))
                .pipe(gulp.dest(config.FOLDRE))
    },
    zip() {
        return gulp.src([config.ZIP])
                .pipe(plumber())
                .pipe(zip(config.ZIP_NAME))
                .pipe(gulp.dest(path.resolve(__dirname, '../')))
    }
}