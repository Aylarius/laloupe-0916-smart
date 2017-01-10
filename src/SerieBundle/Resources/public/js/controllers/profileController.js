function profileController($location, userService, tmdbService, serieService, sessionFactory) {

    this.$location = $location;
    this.userService = userService;
    this.serieService = serieService;
    this.tmdbService = tmdbService;
    this.sessionFactory = sessionFactory;

    $('.progress-bar').each(function() {
        $(this).animate({
            width: $(this).attr('data-percent')
        }, 3000);
    });

    this.getAllFollowed = (id) => {
        this.serieService.getAllFollowed(id).then((res) => {
            this.series = res.data;
        });
    };

    this.getAllFollowed(this.sessionFactory.user.id);


}
