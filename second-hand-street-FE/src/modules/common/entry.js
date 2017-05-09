import typeData from './constant/typeData'
import htmlCompile from './htmlCompile'
import imgReset from './imgReset'
import trustHtml from './filters/trustHtmlFilter'
import goodsService from './services/goodsService'
import userService from './services/userService'
import validService from './services/validService'
import commentService from './services/commentService'
import demandService from './services/demandService'
import UibModalReset from './uibModalResetService'
import HttpRequestInterception from './services/HttpRequestInterception'

angular
    .module('app.common', [])
    .constant('typeData', typeData)
    .constant('regExp', require('./constant/regExp'))
    .directive('htmlCompile', htmlCompile)
    .directive('imgReset', imgReset)
    .directive('scrollTo', require("./directives/scrollTo"))
    .directive('converter', require("./directives/converter"))
    .directive('validator', require("./directives/validator"))
    .filter('trustHtml', trustHtml)
    .service('goodsService', goodsService)
    .service('userService', userService)
    .service('validService', validService)
    .service('commentService', commentService)
    .service('demandService', demandService)
    .service('UibModalReset', UibModalReset)
    .service('HttpRequestInterception', HttpRequestInterception)
    .service('util', require("./services/util"))
    .service('store', require("./services/storeService"))
    .service('fileUpload', require("./services/fileUpload"))
    .service('errorCatch', require("./services/errorCatch"))
    .directive('pagination', require('./pagination'))
    .directive('uibDropdownReset', require('./uibDropdownReset'))