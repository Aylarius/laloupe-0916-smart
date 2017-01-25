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
            for (let x = 0; x < this.series.length; x++) {
                this.tmdbService.sheetSerie(this.series[x].serieId).then((response) => {
                    this.sheetSerie = response.data;
                    this.nameSerie = response.data.name;
                    this.tmdbService.seasons(this.series[x].serieId, this.sheetSerie.number_of_seasons).then((res) => {
                        this.episodes = res.data.episodes;
                        console.log(this.episodes);
                        for (let i = 0; i < this.episodes.length;i++) {
                            this.episodeB = {};
                            this.episodeB.id = this.episodes[i].id;
                            this.episodeB.name = this.series[x].name + ' - Saison ' + this.episodes[i].season_number + ' - Episode ' + this.episodes[i].episode_number;
                            this.episodeB.startdate = this.episodes[i].air_date;
                            this.episodeB.url = '#!/serie/' + this.series[x].serieId;
                            this.episodeB.color = "#ffa834";
                            if (this.episodes[i].air_date) {
                                this.episodesList.push(this.episodeB);
                            }
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
            }, 1000);
            console.log(this.episodesList);
        });
    };

    console.log(this.episodesList);

    this.getAllFollowed(this.sessionFactory.user.id);

}
