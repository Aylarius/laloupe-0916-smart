function carouselController(tmdbService, $location) {

    this.tmdbService = tmdbService;
    this.$location = $location;

    //CAROUSEL DERNIERS EPISODES
    this.loadrandomEpisode = () => {
        this.tmdbService.randomEpisode().then((response) => {
            this.results = response.data.results;
            let count = 0;
            this.results.forEach((result, indexEpisode) => {
                this.results[indexEpisode].i = count;
                count++;
                this.tmdbService.sheetSerie(result.id).then((response) => {
                    Object.assign(this.results[indexEpisode], response.data);
                });
            });
            this.slickCurrentIndex = 0;
            this.slickConfig = {
                // dots: true,
                // initialSlide: 0,
                slidesToShow: 3,
                infinite: true,
                autoplay: true,
                //centerMode: true,
                // variableWidth: true,
                // method: {},
            };
        });
    };

    this.loadrandomEpisode();

    this.tvShowView = (id) => {
        $location.path("/serie/" + id);
    };
}
