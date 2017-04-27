let userCtrl = require('./userCtrl')

angular
    .module('app.user', [])
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('user', {
                    url: '/users/:id',
                    templateUrl: './templates/user/tpl.html',
                    controller: userCtrl,
                    resolve: {
                        user: [
                            'errorCatch',
                            'userService',
                            '$stateParams',
                            function (errorCatch, userService, $stateParams) {
                                return userService
                                    .findById($stateParams.id)
                                    .then(res => res.data)
                                    .catch(errorCatch.modal)
                            }
                        ]
                    }
                })
        }
    ])