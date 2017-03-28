const gulp = require("gulp");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename")
const path = require("path")

let config = require("./config")

// 静态资源操作
let assets = {
    icon(paths) {
        return gulp.src(paths)
            .pipe(plumber())
            .pipe(gulp.dest(config.FONTS))
    },
    images(paths) {
        return gulp.src(paths)
            .pipe(plumber())
            .pipe(gulp.dest(config.IMAGES))
    },
    template(event, rename) {
        return gulp.src(event)
            .pipe(plumber())
            .pipe(rename)
            .pipe(gulp.dest(config.TEMPLATES))
    }
}

//change为文件改变事件的监听器
module.exports = {
    copy_icon: {
        src: [config.ICON, config.GLYPHICONS],
        func: function() {
            return assets.icon([config.ICON, config.GLYPHICONS])
        },
        change: function(event) {
            assets.icon([event.path])
        }
    },
    copy_images: {
        src: [config.IMAGE],
        func: function() {
            return assets.images([config.IMAGE])
        },
        change: function(event) {
            assets.images([event.path])
        }
    },
    copy_templates: {
        src: [config.TEMPLATE],
        func: function() {
            return assets.template([config.TEMPLATE], rename(function(file) {
                file.dirname = file.dirname.replace(path.sep + 'templates', '')
            }))
        },
        change: function(event) {
            assets.template([event.path], rename(function(file) {
                let arr = event.path
                            .split('src' + path.sep + 'modules' + path.sep)[1]
                            .replace('templates' + path.sep, '')
                            .split(path.sep)

                arr.pop()
                file.dirname = arr.join(path.sep)
            }))
        }
    }
}