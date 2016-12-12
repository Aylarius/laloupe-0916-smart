function hpController(tmdbService) {

    this.tmdbService = tmdbService;

    this.load = () => {
        this.tmdbService.popular().then((response) => {
            this.results = response.data.results;
            this.slickCurrentIndex = 0;
            this.slickConfig = {
              // dots: true,
              // initialSlide: 0,
              slidesToShow: 3,
              // infinite: true,
              // centerMode: true,
              // variableWidth: true,
              // method: {},
              event: {
                afterChange: function(event, slick, currentSlide, nextSlide) {
                  this.slickCurrentIndex = currentSlide;
                  console.log(this.slickCurrentIndex);
                }
              }
            };
        });
    };

    this.load();

    this.show = false;

    this.isToggled1 = false;
    this.toggleMore = () => {
        this.isToggled1 = !this.isToggled1;
    };
    if (this.isToggled1 === true) {
        $('.card-block').show = true;
    }

    this.isToggled = false;
    $('#star').hide();
    this.toggleFollow = () => {
        this.isToggled = !this.isToggled;
        console.log(this.isToggled);
        if (this.isToggled === false) {
            $('#star').hide();
            $('#star-empty').show();
        } else {
            $('#star-empty').hide();
            $('#star').show();
        }
    };
}
