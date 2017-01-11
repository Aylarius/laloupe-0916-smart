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
        console.log(res.data);
    });
    };

    this.getStats(this.sessionFactory.user.id);


    this.getAllFollowed = (id) => {
        this.serieService.getAllFollowed(id).then((res) => {
            this.series = res.data;
        console.log(this.series);
    })
    };

    this.getAllFollowed(this.sessionFactory.user.id);

}
