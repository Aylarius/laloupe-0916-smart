angular.module('app', ['ngRoute'])
    .service('todoService', todoService)
    .controller('mainController', mainController)
    .controller('navbarController', navbarController)
    .config(routes)
;
