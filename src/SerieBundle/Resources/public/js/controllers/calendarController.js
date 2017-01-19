function calendarController($http) {

    this.$http = $http;

    // var array = [];
    // this.array = array;
    this.test = () => {
        this.$http.get("https://api.themoviedb.org/3/tv/60735?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR").then((response) => {
            this.results = response.data.last_air_date;
            var array = [];
            array.push({
                "id": 1,
                "name": "bfoviugsdvlikhdlhvjezlkdjhfgvzlkjhgrflkj",
                "startdate": this.results,
                "color": "#99CCCC"
            });
            var sampleEvents = {
                "monthly": array
            };
            console.log(array);
            console.log(sampleEvents);

            $(window).load(function() {
              $('#mycalendar').monthly({
                mode: 'event',
                dataType: 'json',
                events: sampleEvents
              });
            });
        });
    };
    this.test();

    // 
    // var sampleEvents = {
    //     "monthly": [{
    //             "id": 1,
    //             "name": "Whole month event",
    //             "startdate": "2017-01-20",
    //             // "enddate": "",
    //             // "starttime": "",
    //             // "endtime": "",
    //             "color": "#99CCCC",
    //             // "url": ""
    //         },
    //         {
    //             "id": 2,
    //             "name": "Test encompasses month",
    //             "startdate": "2017-01-25",
    //             "enddate": "",
    //             "starttime": "",
    //             "endtime": "",
    //             "color": "#CC99CC",
    //             "url": ""
    //         }
    //     ]
    // };
}
