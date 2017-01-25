function userService($http, sessionFactory) {

    this.$http = $http;
    this.sessionFactory = sessionFactory;

    this.connect = (data) => {
        return this.$http.post('app_dev.php/user/login', data)
    }

    this.create = (user) => {
        return this.$http.post('app_dev.php/user/register', user)
    }

    this.getAll = () => {
        return this.$http.get('app_dev.php/user/')
    }

    this.getOne = (id) => {
        return this.$http.get('app_dev.php/user/show/' + id)
    }

    this.getStats = (id) => {
        return this.$http.get('app_dev.php/user/stats/' + id)
    }

    this.update = (user) => {
        return this.$http.put('app_dev.php/user/edit', user)
    }

    this.deactivate = (user) => {
        return this.$http.put('app_dev.php/user/deactivate', user)
    }

    this.reactivate = (data) => {
        return this.$http.post('app_dev.php/user/reactivate', data)
    }

    this.getAllBySerie = (id) => {
        return this.$http.get('app_dev.php/user/getbyserie/' + id)
    }


}
