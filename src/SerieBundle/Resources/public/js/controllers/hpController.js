function hpController(tmdbService, $location) {

    this.tmdbService = tmdbService;
    this.$location = $location;

    //BOUTON SUIVRE
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

    //CAROUSEL POPULAIRE
    this.load = () => {
        this.tmdbService.popular().then((response) => {
            this.results = response.data.results;
            let count = 0;
            this.results.forEach((result, indexSerie) => {
                this.results[indexSerie].i = count;
                count++;
                this.tmdbService.sheetSerie(result.id).then((response) => {
                    Object.assign(this.results[indexSerie], response.data);
                });
            });
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

    this.loadById = (id) => {
        this.tmdbService.sheetSerie(id).then((response) => {
            this.sheetSerie = response.data;
        });
    };


    this.show = false;

    this.togglePane = false;


    this.tvShowView = (id) => {
        $location.path("/serie/" + id);
    };


}
