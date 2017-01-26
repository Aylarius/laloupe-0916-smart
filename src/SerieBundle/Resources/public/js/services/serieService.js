function serieService($http, sessionFactory) {

    this.$http = $http;
    this.sessionFactory = sessionFactory;

    this.follow = (data, id, name, duration) => {
        return this.$http.post('serie/follow', data, id, name, duration)
    }

    this.followInsc = (id) => {
        return this.$http.get('serie/followinsc/' + id)
    }

    this.doIFollow = (id, data) => {
        return this.$http.get('serie/doifollow/'+ id + '/' + data)
    }

    this.getAllFollowed = (id) => {
        return this.$http.get('serie/'+ id)
    }

}
