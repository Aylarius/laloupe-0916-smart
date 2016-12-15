function serieController(tmdbService) {

    this.tmdbService = tmdbService;

    this.load = () => {
      this.tmdbService.sheetSerie().then((response) => {
        this.sheetSerie = response.data;
      });
    };

    this.load();

    this.getPeople = () => {
      this.tmdbService.people().then((response) => {
        this.people = response.data;
      });
    };

    this.getPeople();

    this.getSeasons = () => {
      this.tmdbService.seasons().then((response) => {
        this.seasons = response.data;
      });
    };

    this.getSeasons();


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
