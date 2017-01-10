function season(sessionFactory, $rootScope) {

    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            scope.getContentUrl = function() {
                if (sessionFactory.isLogged === true) {
                    return 'bundles/serie/views/season/season_log.html';
                } else {
                    return 'bundles/serie/views/season/season_nonlog.html';
                }
            };
        },
        template: '<div ng-include="getContentUrl()"></div>'
    };

}
