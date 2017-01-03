function profileController(Bouchonnage_profile, $location) {

    this.Bouchonnage_profile.html = Bouchonnage_profile;
    this.$location = $location;

    $('.progress-bar').each(function() {
        $(this).animate({
            width: $(this).attr('data-percent')
        }, 3000);
    });


}
