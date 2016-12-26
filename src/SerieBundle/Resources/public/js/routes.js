const routes = ($routeProvider, $httpProvider) => {

    $routeProvider
        .when('/', {
            templateUrl: 'bundles/serie/views/homepage.html',
            controller: 'hpController',
            controllerAs: 'vm'
        })
        .when('/serie/:id', {
            templateUrl: 'bundles/serie/views/serie.html',
            controller: 'serieController',
            controllerAs: 'vm'
        })
        .when('/calendrier', {
            templateUrl: 'bundles/serie/views/calendrier.html'
        })
        .when('/profiledit', {
            templateUrl: 'bundles/serie/views/profiledit.html'
        })
        .when('/profil', {
            templateUrl: 'bundles/serie/views/profile.html'
        })
        .when('/inscription', {
            templateUrl: 'bundles/serie/views/inscription.html'
        })
        .when('/inscriptionbis', {
            templateUrl: 'bundles/serie/views/inscriptionbis.html'
        })
        .when('/resultats/:query', {
            templateUrl: 'bundles/serie/views/resultats.html',
            controller: 'searchController',
            controllerAs: 'vm'
        })
        .when('/connexion', {
            templateUrl: 'bundles/serie/views/connexion.html'
        })
        .otherwise({
            redirectTo: ''
        });

};
