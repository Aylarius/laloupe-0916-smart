function hpController(tmdbService, $location) {

    this.tmdbService = tmdbService;
    this.$location = $location;

    //CAROUSEL POPULAIRE
    this.load = () => {
        this.tmdbService.popular().then((response) => {
            this.results = response.data.results.slice(10, 19);
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
                infinite: true,
                autoplay: true,
                responsive: true,
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

    //BOUTON SUIVRE
    this.series = [];
    this.toggleFollow = (id) => {
        if (!this.series[id]) {
            this.series[id] = false;
        }
        this.series[id] = !this.series[id];
        console.log(this.series);
    };
}
