function serieController(tmdbService) {

    this.tmdbService = tmdbService;

    this.load = () => {
      this.tmdbService.sheetSerie().then((response) => {
        this.sheetSerie = response.data;
      });
    };

    this.load();

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
