function navbarController(tmdbService, $location) {

    this.tmdbService = tmdbService;
    this.$location = $location;

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
}
