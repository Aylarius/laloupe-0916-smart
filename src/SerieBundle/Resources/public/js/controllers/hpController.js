function hpController(tmdbService) {

    this.tmdbService = tmdbService;

    this.load = () => {
        this.tmdbService.popular().then((response) => {
            this.results = response.data.results;
            this.slickCurrentIndex = 0;
            this.slickConfig = {
                // dots: true,
                // initialSlide: 0,
                slidesToShow: 3,
                //infinite: true,
                //centerMode: true,
                // variableWidth: true,
                // method: {},
            };
        });
    };

    this.load();

    this.loadMeBanana = (id) => {
      this.tmdbService.sheetSerie(id).then((response) => {
        this.sheetSerie = response.data;
      });
    };

    this.show = false;

    this.isToggled1 = false;
    this.toggleMore = (id) => {
      this.tmdbService.sheetSerie(id).then((response) => {
        this.resultSerie = response.data;
        console.log('more');
        this.isToggled1 = !this.isToggled1;
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
