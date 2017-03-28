const path = require("path")
const webpack = require("webpack")
const fs = require("fs")

// webpack配置参数
let resolve = {
    alias: {
        'angular': path.resolve(__dirname, '../node_modules/angular/angular.min.js'),
        'uiRouter': path.resolve(__dirname, '../node_modules/angular-ui-router/release/angular-ui-router.min.js'),
        'uiBootstrap': path.resolve(__dirname, '../node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'),
        'lodash': path.resolve(__dirname, '../node_modules/lodash/lodash.min.js'),
        'store': path.resolve(__dirname, '../node_modules/store2/dist/store2.min.js'),
        'Upload': path.resolve(__dirname, '../node_modules/ng-file-upload/dist/ng-file-upload.min.js'),
        'UploadShim': path.resolve(__dirname, '../node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js'),
    }
}

// 为文件名添加hash参数
function AddHashParam() {
    this.plugin('done', stat => {
        let temp_index = fs.readFileSync(path.resolve(__dirname, '../src/modules/index.html'))

        global.hash = stat.hash
        
        fs.writeFileSync(
            path.resolve(__dirname, '../temp/index.html'),
            Buffer.from(temp_index.toString().replace('<#bundle#>', 'bundle.' + stat.hash + '.js'))
        )
    })
}

module.exports = {
    FOLDRE: 'temp',                                 //临时文件夹
    ENTRY: 'src/modules',                           //模块文件夹
    BOOTSTRAP: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
    LESS: 'src/**/*.less',
    LESS_MAIN: 'src/modules/page.less',             //less文件主入口
    STYLES: 'temp/styles',
    SCRIPT: 'src/modules/**/*.js',
    SCRIPT_MAIN: 'src/modules/page.js',             //脚本主入口
    IMAGE: 'src/assets/images/**/*',                //所有图片
    IMAGES: 'temp/images',                          //图片文件夹
    ICON: 'src/assets/icon/!(demo)*.!(js)*',        //全部icon 图标
    GLYPHICONS: 'node_modules/bootstrap/fonts/*',   //全部bootstrap字体图标
    FONTS: 'temp/fonts',                            //字体文件夹
    TEMPLATE: 'src/modules/**/!(index).html',       //全部模板
    TEMPLATES: 'temp/templates',                    //模板文件夹
    ZIP: 'temp/**/*',                               //被压缩的所有文件
    ZIP_NAME: 'webapp.zip',                         //压缩后的文件名
    ROUTES: 'mocks',                                  //模拟数据文件夹
    WEBPACK: {
        develop: {
            devtool: 'eval',
            output: {
                filename: 'bundle.[hash].js',
                path: ''
            },
            resolve: resolve,
            plugins: [
                AddHashParam,
            ],
            module: {
                loaders: [
                    {
                        test: /\.js/,
                        loader: 'babel',
                        query: {presets: 'es2015'}
                    }
                ]
            }
        },
        product: {
            devtool: 'cheap-module-source-map',
            output: {
                filename: 'bundle.[hash].js'
            },
            resolve: resolve,
            plugins: [
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: true
                    },
                    minimize: true
                }),
                AddHashParam,
            ],
            module: {
                loaders: [
                    {
                        test: /\.js/,
                        loader: 'babel',
                        query: {presets: 'es2015'}
                    }
                ]
            }
        }
    }
}