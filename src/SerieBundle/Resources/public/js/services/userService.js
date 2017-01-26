function userService($http, sessionFactory) {

    this.$http = $http;
    this.sessionFactory = sessionFactory;

    this.connect = (data) => {
        return this.$http.post('user/login', data)
    }
    this.create = (user) => {
        return this.$http.post('user/register', user)
    }
    this.getAll = () => {
        return this.$http.get('user/')
    }

    this.getOne = (id) => {
        return this.$http.get('user/show/' + id)
    }

    this.getStats = (id) => {
        return this.$http.get('user/stats/' + id)
    }

    this.update = (user) => {
        return this.$http.put('user/edit', user)
    }

    this.deactivate = (user) => {
        return this.$http.put('user/deactivate', user)
    }

    this.reactivate = (data) => {
        return this.$http.post('user/reactivate', data)
    }

    this.getAllBySerie = (id) => {
        return this.$http.get('user/getbyserie/' + id)
    }


}
