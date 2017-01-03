angular.module('app', ['ngRoute','slickCarousel'])
    .factory('sessionFactory', sessionFactory)
    .service('tmdbService', tmdbService)
    .service('userService', userService)
    .controller('navbarController', navbarController)
    .controller('serieController', serieController)
    .controller('searchController', searchController)
    .controller('hpController', hpController)
    .controller('carouselController', carouselController)
    .controller('loginController', loginController)
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
    .directive('match', function($parse) {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                scope.$watch(function() {
                    return $parse(attrs.match)(scope) === ctrl.$modelValue;
                }, function(currentValue) {
                    ctrl.$setValidity('mismatch', currentValue);
                });
            }
        };
    })
    .directive('season', season)
    .config(routes)
    .config(function ($httpProvider) {
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] =  'application/x-www-form-urlencoded';
    })
    .run(loginStatus)
;
