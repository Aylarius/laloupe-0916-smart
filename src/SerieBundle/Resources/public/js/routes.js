const routes = ($routeProvider, $httpProvider) => {

    $routeProvider
        .when('/', {
            templateUrl: 'bundles/serie/views/main.html',
            controller: 'mainController',
            controllerAs: 'vm'
        })
<<<<<<< HEAD
        .when('/serie', {
            templateUrl: 'bundles/serie/views/serieNonLoggue.html',
            controller: 'serieController',
            controllerAs: 'vm'
=======
        .when('/calendrier', {
            templateUrl: 'bundles/serie/views/calendrier.html'
>>>>>>> 3e40f4ed2c5a1c5bf58024cb8d6cb600d259c942
        })
        .otherwise({
            redirectTo: ''
        })

}
