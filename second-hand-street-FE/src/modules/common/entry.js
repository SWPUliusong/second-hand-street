import typeData from './constant/typeData'
import code from './constant/code'
import htmlCompile from './htmlCompile'
import imgReset from './imgReset'
import trustHtml from './filters/trustHtmlFilter'
import goodsService from './services/goodsService'
import userService from './services/userService'
import validService from './services/validService'
import commentService from './services/commentService'
import UibModalReset from './uibModalResetService'
import HttpRequestInterception from './services/HttpRequestInterception'

angular
    .module('app.common', [])
    .constant('typeData', typeData)
    .constant('Code', code)
    .constant('regExp', require('./constant/regExp'))
    .directive('htmlCompile', htmlCompile)
    .directive('imgReset', imgReset)
    .directive('scrollTo', require("./directives/scrollTo"))
    .filter('trustHtml', trustHtml)
    .service('goodsService', goodsService)
    .service('userService', userService)
    .service('validService', validService)
    .service('commentService', commentService)
    .service('UibModalReset', UibModalReset)
    .service('HttpRequestInterception', HttpRequestInterception)
    .service('util', require("./services/util"))
    .service('store', require("./services/storeService"))
    .service('fileUpload', require("./services/fileUpload"))
    .directive('pagination', require('./pagination'))
    .directive('uibDropdownReset', require('./uibDropdownReset'))