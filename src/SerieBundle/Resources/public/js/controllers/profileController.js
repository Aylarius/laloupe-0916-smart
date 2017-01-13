function profileController($location, userService, $rootScope, tmdbService, serieService, sessionFactory) {

    this.$location = $location;
    this.userService = userService;
    this.serieService = serieService;
    this.tmdbService = tmdbService;
    this.sessionFactory = sessionFactory;
    this.$rootScope = $rootScope;

    $('.progress-bar').each(function() {
        $(this).animate({
            width: $(this).attr('data-percent')
        }, 3000);
    });

    this.getStats = (id) => {
        this.userService.getStats(id).then((res) => {
            this.statsSerie = res.data.series;
            this.statsEpisode = res.data.episodes;
            this.statsDuration = res.data.duration;
        console.log(res.data);
    });
    };

    this.getStats(this.sessionFactory.user.id);


    this.getAllFollowed = (id) => {
        this.serieService.getAllFollowed(id).then((res) => {
            this.series = res.data;
            this.arraySeries = [];
            for (let obj of this.series) {
                this.tmdbService.sheetSerie(obj.serieId).then((response) => {
                    this.sheetSerie = response.data;
                    this.arraySeries.push(this.sheetSerie);
                });
            }
        });
    };

    this.getAllFollowed(this.sessionFactory.user.id);

    this.tvShowView = (id) => {
        $location.path("/serie/" + id);
    };
}
