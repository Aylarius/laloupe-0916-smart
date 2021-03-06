function loginController(userService, sessionFactory, $timeout, $routeParams, $location, $rootScope) {

    this.userService = userService;
    this.sessionFactory = sessionFactory;
    this.$timeout = $timeout;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.$routeParams = $routeParams;

    this.login = () => {
        this.userService.connect({
            email: this.email,
            password: this.password
        }).then((res) => {
            this.sessionFactory.token = res.data.token;
            this.sessionFactory.user = res.data.user;
            this.sessionFactory.isLogged = true;
        this.$rootScope.$emit('loginStatusChanged', true);
            $rootScope.$emit('loginStatusChangedNavbar');
            $rootScope.$emit('loginStatusChangedHomepage');

            this.loginMessage = null;
            this.$location.path('/');
        }).catch((res) => {
            this.sessionFactory.isLogged = false;
            this.$rootScope.$emit('loginStatusChanged', false);
            $rootScope.$emit('loginStatusChangedNavbar');
            $rootScope.$emit('loginStatusChangedHomepage');

            this.loginMessage = {};
            this.loginMessage.type = "error";
            this.loginMessage.title = "Erreur de connexion";
            this.loginMessage.message = res.data;
        });
    };
    this.getAllUsers = (id) => {
        this.userService.getAll().then((response) => {
            this.users = response.data.length;
          })
    }
    this.getAllUsers();



}
