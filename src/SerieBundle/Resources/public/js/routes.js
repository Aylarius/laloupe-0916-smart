const routes = ($routeProvider, $httpProvider) => {

    $routeProvider
        .when('/', {
            templateUrl: 'bundles/serie/views/main.html',
            controller: 'mainController',
            controllerAs: 'vm'
        })
        .when('/calendrier', {
            templateUrl: 'bundles/serie/views/calendrier.html'
        })
        .otherwise({
            redirectTo: ''
        })

}
