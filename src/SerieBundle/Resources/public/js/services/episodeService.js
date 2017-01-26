function episodeService($http, sessionFactory) {

    this.$http = $http;
    this.sessionFactory = sessionFactory;

    this.watch = (data, id, date, numero, saison) => {
        return this.$http.post('episode/watch', data, id, date, numero, saison);
    };
    this.watchAll = (data, id) => {
        return this.$http.post('episode/watchAll', data, id);
    };

    this.didIWatch = (id, episode, user) => {
        return this.$http.get('episode/didiwatch/'+ id + '/' + episode + '/' + user);
    };

    this.getAllWatched = (id, user) => {
        return this.$http.get('episode/'+ id + '/' + user);
    };

    this.getAllWatchedBySeason = (id, user, saison) => {
        return this.$http.get('episode/getbyseason/'+ id + '/' + user + '/' + saison);
    };

    this.getLastWatched = (id, user) => {
        return this.$http.get('episode/getlast/'+ id + '/' + user);
    };

}
