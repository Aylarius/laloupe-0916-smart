const routes = ($routeProvider, $httpProvider, $locationProvider) => {
    $locationProvider.html5Mode(false).hashPrefix('!');
    $routeProvider
        .when('/', {
            templateUrl: 'bundles/serie/views/homepage.html',
            controller: 'hpController',
            controllerAs: 'vm',
        })
        .when('/serie/:id', {
            templateUrl: 'bundles/serie/views/serie.html',
            controller: 'serieController',
            controllerAs: 'vm'
        })
        .when('/calendrier', {
            templateUrl: 'bundles/serie/views/calendrier.html',
            controller: 'calendarController',
            controllerAs: 'vm',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/profiledit', {
            templateUrl: 'bundles/serie/views/profiledit.html',
            controller: 'editController',
            controllerAs: 'vm',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/profil', {
            templateUrl: 'bundles/serie/views/profile.html',
            controller: 'profileController',
            controllerAs: 'vm',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/inscription', {
            templateUrl: 'bundles/serie/views/inscription.html',
            controller: 'registerController',
            controllerAs: 'vm'
        })
        .when('/inscriptionbis', {
            templateUrl: 'bundles/serie/views/inscriptionbis.html',
            controller: 'register2Controller',
            controllerAs: 'vm'
        })
        .when('/resultats/:query', {
            templateUrl: 'bundles/serie/views/resultats.html',
            controller: 'searchController',
            controllerAs: 'vm'
        })
        .when('/connexion', {
            templateUrl: 'bundles/serie/views/connexion.html',
            controller: 'loginController',
            controllerAs: 'vm'
        })
        .when('/reactivation', {
            templateUrl: 'bundles/serie/views/reactivation.html',
            controller: 'reactivateController',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: ''
        });


    $httpProvider.interceptors.push(($q, $location, $rootScope, $window, sessionFactory) => {
        return {
            request(config) {
                config.headers = config.headers || {};
                if ($window.localStorage.token && !((config.url.match(/api\.themoviedb\.org/) || []).length > 0)) {
                    sessionFactory.token = $window.localStorage.token
                    sessionFactory.user = JSON.parse($window.localStorage.getItem('currentUser'));
                    config.headers.authorization = $window.localStorage.token
                }
                return config;
            },
            responseError(response) {
                if (response.status === 401 || response.status === 403 || response.status == 500) {
                    $rootScope.$emit('loginStatusChanged', false);
                    $rootScope.$emit('loginStatusChangedNavbar');
                    $rootScope.$emit('loginStatusChangedHomepage');
                    $location.path('/connexion');
                }
                return $q.reject(response);
            }
        };
    });
};

const loginStatus = ($http, $rootScope, $window, sessionFactory) => {

    if ($window.localStorage.token) {
        sessionFactory.token = $window.localStorage.token;
        sessionFactory.user = JSON.parse($window.localStorage.getItem('currentUser'));
    }
    $rootScope.$on('loginStatusChanged', (event, isLogged) => {
        if (sessionFactory.token) {
            $window.localStorage.setItem('currentUser', JSON.stringify(sessionFactory.user));
            $window.localStorage.token = sessionFactory.token;
            sessionFactory.isLogged = isLogged;
        }
    })
    $rootScope.$emit('loginStatusChanged', true);
    $rootScope.$emit('loginStatusChangedNavbar');
    $rootScope.$emit('loginStatusChangedHomepage');
}

const checkIsConnected = ($q, $http, $location, $window, $rootScope) => {
    let deferred = $q.defer()

    $http.get('app_dev.php/user/loggedin').success(() => {
        $rootScope.$emit('loginStatusChanged', true);
        $rootScope.$emit('loginStatusChangedNavbar');
        $rootScope.$emit('loginStatusChangedHomepage');

        // Authenticated
        deferred.resolve()
    }).error(() => {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('currentUser');
        $rootScope.$emit('loginStatusChanged', false);
        $rootScope.$emit('loginStatusChangedNavbar');
        $rootScope.$emit('loginStatusChangedHomepage');

        // Not Authenticated
        deferred.reject()
        $location.url('/connexion')
    })

    return deferred.promise
}
