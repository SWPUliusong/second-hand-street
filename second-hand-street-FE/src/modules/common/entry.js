import typeData from './constant/typeData'
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
    .directive('htmlCompile', htmlCompile)
    .directive('imgReset', imgReset)
    .filter('trustHtml', trustHtml)
    .service('goodsService', goodsService)
    .service('userService', userService)
    .service('validService', validService)
    .service('commentService', commentService)
    .service('UibModalReset', UibModalReset)
    .service('HttpRequestInterception', HttpRequestInterception)
    .service('util', require("./services/util"))
    .directive('pagination', require('./pagination'))