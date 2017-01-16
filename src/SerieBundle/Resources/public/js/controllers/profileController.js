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
            var days = Math.floor(this.statsDuration / 1440);
            var hours = Math.floor((this.statsDuration % 1440) / 60);
            var mins = Math.floor((this.statsDuration % 1440) % 60);
            if (days > 1) {
              this.statsDurationTime = (days+' jours, ') + (hours > 0 ? hours+' heures' : '') + ' et ' + (mins > 1 ? mins+' minutes' : mins+' minute');
            } else if (days === 1 ) {
              this.statsDurationTime = (days+' jour, ') + (hours > 0 ? hours+' heures' : '') + ' et ' + (mins > 1 ? mins+' minutes' : mins+' minute');
            } else {
              this.statsDurationTime = (hours > 0 ? hours+' heures' : '') + ' et ' + (mins > 1 ? mins+' minutes' : mins+' minute');
            }
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
