import sidebarData from './constants/sidebarData'
import sidebar from './directives/sidebar'

angular
    .module('app.sidebar', [])
    .constant('sidebarData', sidebarData)
    .directive('sidebar', sidebar)