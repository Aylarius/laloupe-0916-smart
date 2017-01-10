function episodeService($http, sessionFactory) {

    this.$http = $http;
    this.sessionFactory = sessionFactory;

    this.seen = (data) => {
        return this.$http.post('app_dev.php/episode/seen', data)
    }

    this.unsee = (data) => {
        return this.$http.post('app_dev.php/episode/unsee', data)
    }

    this.getAllSeen = () => {
        return this.$http.get('app_dev.php/episode/')
    }
}
