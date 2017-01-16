angular.module('app', ['ngRoute','slickCarousel'])
    .factory('sessionFactory', sessionFactory)
    .service('tmdbService', tmdbService)
    .service('userService', userService)
    .service('serieService', serieService)
    .service('episodeService', episodeService)
    .controller('navbarController', navbarController)
    .controller('serieController', serieController)
    .controller('searchController', searchController)
    .controller('hpController', hpController)
    .controller('carousel1Controller', carousel1Controller)
    .controller('carousel3Controller', carousel3Controller)
    .controller('profileController', profileController)
    .controller('loginController', loginController)
    .controller('registerController', registerController)
    .controller('register2Controller', register2Controller)
    .controller('editController', editController)
    .controller('reactivateController', reactivateController)
    .directive('a', function() {
        return {
            restrict: 'E',
            link: function(scope, elem, attrs) {
                if(attrs.prevent === ''){
                    elem.on('click', function(e){
                        e.preventDefault();
                    });
                }
            }
        };
    })
    .config(routes)
    .config(function ($httpProvider) {
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] =  'application/x-www-form-urlencoded';
    })
    .run(loginStatus)
;
