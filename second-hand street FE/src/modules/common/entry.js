import htmlCompile from './directives/htmlCompile'
import imageReset from './directives/imageReset'
import footer from './directives/footer'
import trustHtml from './filters/trustHtmlFilter'
import goodsService from './services/goodsService'
import UibModalReset from './services/UibModalResetService'
import HttpRequestInterception from './services/HttpRequestInterception'

angular
    .module('app.common', [])
    .directive('htmlCompile', htmlCompile)
    .directive('imageReset', imageReset)
    .directive('footer', footer)
    .filter('trustHtml', trustHtml)
    .service('HttpRequestInterception', HttpRequestInterception)
    .service('UibModalReset', UibModalReset)
    .service('goodsService', goodsService)