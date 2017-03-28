const gulp = require("gulp")
const path = require("path")
const fs = require("fs")
const plumber = require("gulp-plumber")
const sequence = require("gulp-sequence")
const browser = require("browser-sync").create()
const _ = require("lodash")

let tasks = require("./gulp-task")

// 删除任务
_.forEach(tasks.clean, function(task, name) {
    gulp.task(name, task)
})

// 解析
_.forEach(tasks.compile, function(task, name) {
    gulp.task(name, task.before || [], task.func)
})

// 复制
_.forEach(tasks.copy, function(task, name) {
    gulp.task(name, task.func)
})

// default任务队列
gulp.task('default', sequence('clean', ['compile_less', 'bundle_script', 'copy_bootstrap', 'copy_icon', 'copy_images', 'copy_templates']))

// 监听文件，实时刷新浏览器
gulp.task('watch', ['default'], function() {
    _.forEach(tasks.compile, function(task, name) {
        gulp.watch(task.src, [name])
    })

    _.forEach(tasks.copy, function(task, name) {
        gulp.watch(task.src, task.change)
    })

    gulp.watch('src/modules/index.html').on('change', function() {
        let temp_index = fs.readFileSync(path.resolve(__dirname, './src/modules/index.html'))
        
        fs.writeFileSync(
            path.resolve(__dirname, './temp/index.html'),
            Buffer.from(temp_index.toString().replace('<#bundle#>', 'bundle.' + hash + '.js'))
        )
    })

    gulp.watch(['temp/**/!(bundle)*'], browser.reload)
})

// 重定向请求
_.forEach(tasks.redirect, function(middleware, name) {
    gulp.task(name, ['watch'], function() {
        browser.init({
            server: {
                baseDir: './temp',
                index: 'index.html',
                middleware: middleware()
            }
        })
    })
})

// 生产任务
_.forEach(tasks.produce, function(task, name) {
    gulp.task(name, task)
})
// 生产任务流
gulp.task('app', sequence('clean', ['copy_icon', 'copy_bootstrap', 'image_compress', 'copy_templates', 'css_compress', 'script_compress'], 'zip'))