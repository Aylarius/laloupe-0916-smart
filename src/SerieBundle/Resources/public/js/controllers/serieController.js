function serieController(tmdbService, $routeParams, $location) {

    this.tmdbService = tmdbService;
    this.$routeParams = $routeParams;
    this.$location = $location;

    this.getSheetSerie = (id) => {
      this.tmdbService.sheetSerie(id).then((response) => {
        this.sheetSerie = response.data;
        console.log(response.data);
      });
      this.tmdbService.seasons(id, 1).then((response) => {
        this.seasons = response.data;
        console.log(this.seasons);

      });
    };

    this.getSheetSerie($routeParams.id);

    this.getPeople = (id) => {
      this.tmdbService.people(id).then((response) => {
        this.people = response.data;
      });
    };

    this.getPeople($routeParams.id);

    this.getSeasons = (id, season) => {
      this.tmdbService.seasons(id, season).then((response) => {
        this.seasons = response.data;
      });
    };


    this.isToggled = false;
    $('#star').hide();
    this.toggleFollow = () => {
        this.isToggled = !this.isToggled;
        console.log(this.isToggled);
        if (this.isToggled === false) {
            $('#star').hide();
            $('#star-empty').show();
        } else {
            $('#star-empty').hide();
            $('#star').show();
        }
    };

}
