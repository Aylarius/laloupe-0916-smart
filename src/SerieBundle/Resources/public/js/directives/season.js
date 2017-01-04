function season() {
        if ( 1 + 1 == 2) {
            return {
                restrict: 'E',
                templateUrl: 'bundles/serie/views/season/season_log.html'
            };
        } else {
            return {
                restrict: 'E',
                templateUrl: 'bundles/serie/views/season/season_nonlog.html'
            };
        }
    }
