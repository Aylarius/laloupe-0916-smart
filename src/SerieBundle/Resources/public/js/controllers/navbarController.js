function navbarController(tmdbService, $location, sessionFactory, $rootScope, $window) {

    this.tmdbService = tmdbService;
    this.$location = $location;
    this.isLogged = sessionFactory.isLogged;
    this.sessionFactory = sessionFactory;
    this.$rootScope = $rootScope;

    this.query = "";

    this.searchView = (query) => {
        if (query != '') {
            this.isToggled = false;
            $location.path("/resultats/" + query);
            this.query = "";
        }
    };

    //modal CGU
    $('#CGU').on('shown.bs.modal', function() {
        $('#myInput').focus();
    });

    //Div recherche
    this.isToggled = false;
    this.toggleSearch = () => {
        this.isToggled = !this.isToggled;
        if (this.isToggled === false) {
            $('#searchHide').hide();
        } else {
            $('#searchHide').show();
        }
    };

    $rootScope.$on('loginStatusChangedNavbar', (event) => {
        this.isLogged = sessionFactory.isLogged;
    });

    //Logout
    this.logout = () => {
        this.sessionFactory.isLogged = false;
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('currentUser');
        this.sessionFactory.user = {};
        this.sessionFactory.token = null;
        this.$rootScope.$emit('loginStatusChanged', false);
        $rootScope.$emit('loginStatusChangedNavbar');
        $rootScope.$emit('loginStatusChangedHomepage');
        this.isLogged = false;
        this.$location.path('/connexion');
    };

    // Close collapsed navbar on click outside the navbar
    $(function() {
        $(document).click(function(event) {
            $('.navbar-collapse').collapse('hide');
        });
    });
}
