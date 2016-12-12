const routes = ($routeProvider, $httpProvider) => {

    $routeProvider
        .when('/', {
            templateUrl: 'bundles/serie/views/main.html',
            controller: 'mainController',
            controllerAs: 'vm'
        })
        .when('/serie', {
            templateUrl: 'bundles/serie/views/serieNonLoggue.html',
            controller: 'serieController',
            controllerAs: 'vm'
        })
        .when('/calendrier', {
            templateUrl: 'bundles/serie/views/calendrier.html'
        })
        .when('/profiledit', {
            templateUrl: 'bundles/serie/views/profiledit.html'
        })
        .when('/profile', {
            templateUrl: 'bundles/serie/views/profile.html'
        })
        .when('/inscription', {
            templateUrl: 'bundles/serie/views/inscription.html'
        })
        .when('/inscriptionbis', {
            templateUrl: 'bundles/serie/views/inscriptionbis.html'
        })
        .when('/connexion', {
            templateUrl: 'bundles/serie/views/connexion.html'
        })
        .otherwise({
            redirectTo: ''
        })

}
