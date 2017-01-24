function calendarController($http, tmdbService, serieService, sessionFactory, $timeout) {


    this.$http = $http;
    this.tmdbService = tmdbService;
    this.serieService = serieService;
    this.sessionFactory = sessionFactory;

    this.episodesList = [];

    this.showLoader = true;

    this.getAllFollowed = (id) => {
        this.serieService.getAllFollowed(id).then((res) => {
            this.series = res.data;
            for (let serie of this.series) {
                this.tmdbService.sheetSerie(serie.serieId).then((response) => {
                    this.sheetSerie = response.data;
                    this.nameSerie = response.data.name;
                    this.tmdbService.seasons(serie.serieId, this.sheetSerie.number_of_seasons).then((res) => {
                        this.episodes = res.data.episodes;
                        console.log(this.episodes);
                        for (let episode of this.episodes) {
                            this.episodeB = {};
                            this.episodeB.id = episode.id;
                            this.episodeB.name = serie.name + ' - Saison ' + episode.season_number + ' - Episode ' + episode.episode_number;
                            this.episodeB.startdate = episode.air_date;
                            this.episodeB.url = '#/serie/'+serie.serieId;
                            this.episodeB.color = "#ffa834";
                            this.episodesList.push(this.episodeB);
                        }
                    });
                });
            }
            $timeout(() => {
              this.showLoader = false;
              var sampleEvents = {
                "monthly": this.episodesList
              };
              $('#mycalendar').monthly({
                mode: 'event',
                dataType: 'json',
                weekStart: 'Mon',
                linkCalendarToEventUrl: false,
                events: sampleEvents
              });
            },1000);
            console.log(this.episodesList);
        });
    };

    console.log(this.episodesList);

    this.getAllFollowed(this.sessionFactory.user.id);

}
