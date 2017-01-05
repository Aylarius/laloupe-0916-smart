function profileController($location, userService, sessionFactory) {

    this.$location = $location;
    this.userService = userService;
    this.sessionFactory = sessionFactory;

    $('.progress-bar').each(function() {
        $(this).animate({
            width: $(this).attr('data-percent')
        }, 3000);
    });


}
