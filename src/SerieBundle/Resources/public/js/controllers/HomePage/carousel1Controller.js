function carousel1Controller(tmdbService, $location) {

    this.tmdbService = tmdbService;
    this.$location = $location;

    //CAROUSEL DERNIERS EPISODES
    this.loadTopRatedEpisode = () => {
        this.tmdbService.topRatedEpisode().then((response) => {
            this.results = response.data.results.slice(15, 19);
            let count = 0;
            this.results.forEach((result, indexTopRatedEpisode) => {
                this.results[indexTopRatedEpisode].i = count;
                count++;
                this.tmdbService.sheetSerie(result.id).then((response) => {
                    Object.assign(this.results[indexTopRatedEpisode], response.data);
                });
            });
            this.slickCurrentIndex = 0;
            this.slickConfig = {
                // dots: true,
                // initialSlide: 0,
                slidesToShow: 1,
                infinite: true,
                autoplay: true,
                //centerMode: true,
                // variableWidth: true,
                // method: {},
            };
        });
    };

    this.loadTopRatedEpisode();

}
