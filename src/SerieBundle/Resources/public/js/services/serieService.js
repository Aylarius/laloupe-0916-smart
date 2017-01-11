function serieService($http, sessionFactory) {

    this.$http = $http;
    this.sessionFactory = sessionFactory;

    this.follow = (data, id) => {
        return this.$http.post('app_dev.php/serie/follow', data, id)
    }

    this.followInsc = (id) => {
        return this.$http.get('app_dev.php/serie/followinsc/' + id)
    }

    this.doIFollow = (id, data) => {
        return this.$http.get('app_dev.php/serie/doifollow/'+ id + '/' + data)
    }

    this.getAllFollowed = (id) => {
        return this.$http.get('app_dev.php/serie/'+ id)
    }

}
