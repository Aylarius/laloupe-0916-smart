function hpController(tmdbService) {

    this.tmdbService = tmdbService;

    this.load = () => {
        this.tmdbService.popular().then((response) => {
            this.results = response.data.results;
            this.slickConfig = {
              initialSlide: 0,
              slidesToShow: 3,
              variableWidth: true
            };
        });
    };

    this.load();

    this.show = false;

    this.toggleMore = (index) => {
      console.log(
        index
      );
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
