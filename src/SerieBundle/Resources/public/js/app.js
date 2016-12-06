angular.module('app', ['ngRoute'])
    .service('todoService', todoService)
    .controller('mainController', mainController)
    .controller('navbarController', navbarController)
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
