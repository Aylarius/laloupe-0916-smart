function userService($http) {

    this.$http = $http;

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

    this.update = (id, user) => {
        return this.$http.put('app_dev.php/user/edit/' + id, user)
    }

    this.delete = (id) => {
        return this.$http.put('app_dev.php/user/delete/' + id)
    }

}
