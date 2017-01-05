function navbarController(tmdbService, $location, sessionFactory, $rootScope) {

    this.tmdbService = tmdbService;
    this.$location = $location;
    this.isLogged = sessionFactory.isLogged;
    this.sessionFactory = sessionFactory;
    this.$rootScope = $rootScope;

    this.searchView = (query) => {
      $location.path("/resultats/"+query);
      this.isToggled = false;
    };

    //modal connexion
    $('#myModal').on('shown.bs.modal', function() {
        $('#myInput').focus();
    });

    //modal CGU
    $('#CGU').on('shown.bs.modal', function() {
        $('#myInput').focus();
    });

    //Div recherche
    this.isToggled = false;
    this.toggleSearch = () => {
        this.isToggled = !this.isToggled;
        console.log(this.isToggled);
        if (this.isToggled === false) {
            $('#searchHide').hide();
        } else {
            $('#searchHide').show();
        }
    };

    //Logout
    this.logout = () => {
        this.sessionFactory.isLogged = false;
        this.sessionFactory.user = {};
        this.sessionFactory.token = null;
        this.$window.localStorage.token = null;
        this.$window.localStorage.id = {};
        this.$window.localStorage.username = {};
        this.$rootScope.$emit('loginStatusChanged', false);
        this.isLogged = false;
        this.$location.path('/login');
    };

}
