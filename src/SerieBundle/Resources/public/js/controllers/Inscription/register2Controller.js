function register2Controller(serieService, userService, sessionFactory, $timeout, $routeParams, $location, $rootScope, tmdbService) {

    this.userService = userService;
    this.serieService = serieService;
    this.sessionFactory = sessionFactory;
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.tmdbService = tmdbService;
    this.$timeout = $timeout;

    console.log(this.sessionFactory);
    this.getSerieRegister = () => {
        this.tmdbService.popular().then((response) => {
            this.results = response.data.results.slice(0, 9);
            this.resultsMore = response.data.results.slice(10, 19);
            console.log(response.data.results);
        });
    };

    this.getSerieRegister();

    this.isToggled = false;
    this.toggleMoreInsc = () => {
        this.isToggled = !this.isToggled;
        console.log(this.isToggled);
    };

    // marquage des séries
    this.serieTrack = [];
    this.check = (id) => {
        if (this.serieTrack.indexOf(id) === -1) {
            this.serieTrack.push(id);
        } else {
            this.serieTrack.splice(this.serieTrack.indexOf(id), 1);
        }
        console.log(this.serieTrack);
    };


    this.followInsc = (id) => {
        this.serieService.followInsc(id).then((res) => {
            this.loginMessage = {};
            this.loginMessage.type = "success";
            this.loginMessage.title = "Vous avez bien ajouté ces séris à vos favoris !";
            this.loginMessage.message = "En cours de redirection...";
            this.$timeout(() => {
                this.loginMessage = null;
                this.$location.path('/');
            }, 200);
        }).catch((res) => {
            this.loginMessage = {};
            this.loginMessage.type = "error";
            this.loginMessage.title = "Erreur lors de l'inscription";
            this.loginMessage.message = res.data;
        });
    };


    this.follow = (id) => {
        if (this.serieTrack.indexOf(id) === -1) {
            this.serieTrack.push(id);
        } else {
            this.serieTrack.splice(this.serieTrack.indexOf(id), 1);
        };
        console.log(this.serieTrack);
        this.tmdbService.sheetSerie(id).then((response) => {
            this.sheetSerie = response.data;

        this.serieService.follow({
            id: id,
            duration: this.sheetSerie.episode_run_time[0],
            user_id: this.sessionFactory.user.id
        }).then((res) => {
            this.loginMessage = {};
            this.loginMessage.type = "success";
            this.loginMessage.title = "Vous avez bien ajouté cette série à vos séries favorites !";
            this.loginMessage.message = "En cours de redirection...";
        }).catch((res) => {
            this.loginMessage = {};
            this.loginMessage.type = "error";
            this.loginMessage.title = "Erreur lors du suivi";
            this.loginMessage.message = res.data;
        });
      });

    };



}
