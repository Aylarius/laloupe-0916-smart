function season(sessionFactory, $rootScope, $routeParams) {

    this.$routeParams = $routeParams;
    this.$rootScope = $rootScope;
    this.sessionFactory = sessionFactory;


    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            scope.getContentUrl = function() {
                console.log(sessionFactory.series);
                if (sessionFactory.series.indexOf($routeParams.id) !== -1) {
                    return 'bundles/serie/views/season/season_log.html';
                } else {
                    return 'bundles/serie/views/season/season_nonlog.html';
                }
            };
        },
        template: '<div ng-include="getContentUrl()"></div>'
    };

}
