const gulp = require("gulp");
const plumber = require("gulp-plumber");
const less = require("gulp-less");
const webpack = require("webpack-stream");

let config = require("./config")

module.exports = {
    // 解析less文件
    compile_less: {
        src: [config.LESS],
        func: function() {
            return gulp.src([config.LESS_MAIN])
                    .pipe(plumber())
                    .pipe(less())
                    .pipe(gulp.dest(config.STYLES))
        }
    },
    // 合并script文件
    bundle_script: {
        src: [config.SCRIPT],
        func: function() {
            return gulp.src([config.SCRIPT])
                    .pipe(plumber())
                    .pipe(webpack(config.WEBPACK['develop']))
                    .pipe(gulp.dest(config.FOLDRE))
        },
        before: ['clean_bundle']
    },
    // 复制bootstrap
    copy_bootstrap: {
        src: [config.BOOTSTRAP],
        func: function() {
            return gulp.src([config.BOOTSTRAP])
                    .pipe(plumber())
                    .pipe(gulp.dest(config.STYLES))
        }
    }
}