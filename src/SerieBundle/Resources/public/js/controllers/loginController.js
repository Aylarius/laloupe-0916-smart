function loginController(userService, sessionFactory, $timeout, $routeParams, $location, $rootScope) {

    this.userService = userService;
    this.sessionFactory = sessionFactory;
    this.$timeout = $timeout;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.$routeParams = $routeParams;

    this.login = () => {
        this.userService.connect({
            username: this.username,
            password: this.password
        }).then((res) => {
            this.sessionFactory.token = res.data.token;
            this.sessionFactory.user = res.data.user;
            this.sessionFactory.isLogged = true;
            this.$rootScope.$emit('loginStatusChanged', true);
            this.loginMessage = null;
            this.$location.path('/');
        }).catch(() => {
            this.sessionFactory.isLogged = false;
            this.$rootScope.$emit('loginStatusChanged', false);
            this.loginMessage = {};
            this.loginMessage.type = "error";
            this.loginMessage.title = "Erreur de connexion";
            this.loginMessage.message = "Une erreur s'est produite lors de votre connexion.";
        });
    };

    this.conditions = false;
    this.createAccount = () => {
        this.userService.create({
            username: this.username,
            password: this.password,
            passwordConf: this.passwordConf,
            email: this.email,
            conditions: this.conditions
        }).then((res) => {
        this.loginMessage = {};
        this.loginMessage.type = "success";
        this.loginMessage.title = "Votre compte a bien été créé !";
        this.loginMessage.message = "En cours de redirection...";
        this.$timeout(() => {
            this.loginMessage = null;
            this.$location.path('/connexion');
        }, 200);
    }).catch((res) => {
        this.loginMessage = {};
        this.loginMessage.type = "error";
        this.loginMessage.title = "Erreur lors de l'inscription";
        this.loginMessage.message = res.data;
    });
    };

}
