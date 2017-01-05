function hpController(tmdbService, $location, $window, userService, sessionFactory, $rootScope) {

    this.tmdbService = tmdbService;
    this.$location = $location;
    this.userService = userService;
    this.isLogged = sessionFactory.isLogged;
    this.sessionFactory = sessionFactory;
    this.$rootScope = $rootScope;


    console.log(sessionFactory.user);


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
                dots: true,
                autoplay: true,
                responsive: [{
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }, {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }]                //centerMode: true,
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
    console.log(sessionFactory.isLogged);

    $rootScope.$on('loginStatusChangedHomepage', (event) => {
            this.isLogged = sessionFactory.isLogged;
      })
        console.log(this.isLogged);

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
