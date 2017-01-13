function episodeService($http, sessionFactory) {

    this.$http = $http;
    this.sessionFactory = sessionFactory;

    this.watch = (data, id, date, numero, saison) => {
        return this.$http.post('app_dev.php/episode/watch', data, id, date, numero, saison)
    }

    this.didIWatch = (id, episode, user) => {
        return this.$http.get('app_dev.php/episode/didiwatch/'+ id + '/' + episode + '/' + user)
    }

    this.getAllWatched = (id, user) => {
        return this.$http.get('app_dev.php/episode/'+ id + '/' + user)
    }

    this.getLastWatched = (id, user) => {
        return this.$http.get('app_dev.php/episode/getlast/'+ id + '/' + user)
    }

}
