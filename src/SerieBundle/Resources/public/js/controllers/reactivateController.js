function reactivateController(userService, sessionFactory, $timeout, $routeParams, $location, $rootScope) {

    this.userService = userService;
    this.sessionFactory = sessionFactory;
    this.$timeout = $timeout;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.$routeParams = $routeParams;

    this.reactivate = () => {
        this.userService.reactivate({
            email: this.email,
            password: this.password,
            deactivate: false
        }).then((res) => {
            this.sessionFactory.token = res.data.token;
        this.sessionFactory.user = res.data.user;
        this.sessionFactory.isLogged = true;
        this.$rootScope.$emit('loginStatusChanged', true);
        $rootScope.$emit('loginStatusChangedNavbar');
        $rootScope.$emit('loginStatusChangedHomepage');
        this.reactivateMessage = null;
        this.$timeout(() => {
            this.$location.path('/');
    }, 2000);
    }).catch((res) => {
            this.sessionFactory.isLogged = false;
        this.$rootScope.$emit('loginStatusChanged', false);
        $rootScope.$emit('loginStatusChangedNavbar');
        $rootScope.$emit('loginStatusChangedHomepage');
        this.reactivateMessage = {};
        this.reactivateMessage.type = "error";
        this.reactivateMessage.title = "Erreur de réactivation";
        this.reactivateMessage.message = res.data;
        this.$timeout(() => {
        this.$location.path('/connexion');
    }, 2000);

    });
    };
}