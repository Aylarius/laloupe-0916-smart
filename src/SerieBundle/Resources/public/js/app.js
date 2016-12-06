angular.module('app', ['ngRoute'])
    .service('todoService', todoService)
    .controller('mainController', mainController)
    .controller('navbarController', navbarController)
    .controller('hpController', hpController)
    .config(routes)
;
