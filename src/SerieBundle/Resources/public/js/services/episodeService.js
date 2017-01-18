function episodeService($http, sessionFactory) {

    this.$http = $http;
    this.sessionFactory = sessionFactory;

    this.watch = (data, id, date, numero, saison) => {
        return this.$http.post('app_dev.php/episode/watch', data, id, date, numero, saison)
    }
    this.watchAll = (data, id) => {
        return this.$http.post('app_dev.php/episode/watchAll', data, id)
    }

    this.didIWatch = (id, episode, user) => {
        return this.$http.get('app_dev.php/episode/didiwatch/'+ id + '/' + episode + '/' + user)
    }

    this.getAllWatched = (id, user) => {
        return this.$http.get('app_dev.php/episode/'+ id + '/' + user)
    }

    this.getAllWatchedBySeason = (id, user, saison) => {
        return this.$http.get('app_dev.php/episode/getbyseason/'+ id + '/' + user + '/' + saison)
    }

    this.getLastWatched = (id, user) => {
        return this.$http.get('app_dev.php/episode/getlast/'+ id + '/' + user)
    }

}
