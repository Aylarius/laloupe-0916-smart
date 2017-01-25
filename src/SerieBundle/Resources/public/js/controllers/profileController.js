
function profileController($location, userService, $rootScope, tmdbService, episodeService, serieService, sessionFactory) {

    this.$location = $location;
    this.userService = userService;
    this.episodeService = episodeService;
    this.serieService = serieService;
    this.tmdbService = tmdbService;
    this.sessionFactory = sessionFactory;
    this.$rootScope = $rootScope;



    this.getStats = (id) => {
        this.userService.getStats(id).then((res) => {
            this.statsSerie = res.data.series;
            this.statsEpisode = res.data.episodes;
            this.statsDuration = res.data.duration;
            var days = Math.floor(this.statsDuration / 1440);
            var hours = Math.floor((this.statsDuration % 1440) / 60);
            var mins = Math.floor((this.statsDuration % 1440) % 60);
            if (days > 1) {
              this.statsDays = (days+' jours');
            } else if (days === 1){
              this.statsDays = (days+' jour');
            } else {
              this.statsDays = '';
            }
            if (hours > 1) {
              this.statsHours = (hours+' heures');
            } else if (hours === 1){
              this.statsHours = (hours+' heure');
            } else {
              this.statsHours = '';
            }
            if (mins > 1) {
              this.statsMins = (mins+' minutes');
            } else if (hours === 1){
              this.statsMins = (mins+' minute');
            } else {
              this.statsMins = '';
            }

            if (this.statsMins !='' && this.statsHours !='' && this.statsDays !='') {
              this.statsDurationTime = this.statsDays + ', ' + this.statsHours + ' et ' + this.statsMins;
            } else if (this.statsMins =='' && this.statsHours !='' && this.statsDays !='' ) {
              this.statsDurationTime = this.statsDays + ' et ' + this.statsHours;
            } else if (this.statsMins !='' && this.statsHours !='' && this.statsDays =='' ){
              this.statsDurationTime = this.statsHours + ' et ' + this.statsMins;
            } else if (this.statsMins !='' && this.statsHours =='' && this.statsDays !='' ){
              this.statsDurationTime = this.statsDays + ' et ' + this.statsMins;
            } else if (this.statsMins !='' && this.statsHours =='' && this.statsDays =='' ){
              this.statsDurationTime = this.statsMins;
            } else if (this.statsMins =='' && this.statsHours =='' && this.statsDays !='' ){
              this.statsDurationTime = this.statsDays;
            } else if (this.statsMins =='' && this.statsHours !='' && this.statsDays =='' ){
              this.statsDurationTime = this.statsHours;
            } else {
              this.statsDurationTime = "Aucun épisode vu";
            }

          });
    };

    this.getStats(this.sessionFactory.user.id);


    this.getAllFollowed = (id) => {
        this.serieService.getAllFollowed(id).then((res) => {
            this.series = res.data;
            this.arraySeries = [];
            for (let serie of this.series) {
                this.episodeService.getAllWatched(serie.serieId, this.sessionFactory.user.id).then((res) => {
                    this.serieTrack = res.data;
                    this.tmdbService.sheetSerie(serie.serieId).then((response) => {
                        this.sheetSerie = response.data;
                        this.sheetSerie.pourcent = "progress-bar bar" + Math.round((this.serieTrack.length * 100) / this.sheetSerie.number_of_episodes);
                        this.arraySeries.push(this.sheetSerie);
                    });
                });
            }

        });
    };


    this.getAllFollowed(this.sessionFactory.user.id);


    this.tvShowView = (id) => {
        $location.path("/serie/" + id);
    };


}
