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
                            '$q',
                            'userService',
                            '$stateParams',
                            function ($q, userService, $stateParams) {
                                let defer = $q.defer()
                                userService
                                    .findById($stateParams.id)
                                    .then(res => {
                                        defer.resolve(res.data)
                                    })
                                
                                return defer.promise;
                            }
                        ]
                    }
                })
        }
    ])