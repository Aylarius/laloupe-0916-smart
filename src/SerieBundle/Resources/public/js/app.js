angular.module('app', ['ngRoute','slickCarousel'])
    .service('tmdbService', tmdbService)
    .controller('navbarController', navbarController)
    .controller('serieController', serieController)
    .controller('hpController', hpController)
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
;
