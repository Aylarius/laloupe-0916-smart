function tmdbService($http) {

    this.$http = $http;


    this.popular = () => {
        return this.$http.get("https://api.themoviedb.org/3/discover/tv?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR&sort_by=popularity.desc");
    };

    this.sheetSerie = (id) => {
        return this.$http.get("https://api.themoviedb.org/3/tv/"+ id +"?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR");
    };

    this.lastEpisode = () => {
        return this.$http.get("https://api.themoviedb.org/3/discover/tv?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR&sort_by=first_air_date.desc&air_date.gte=2016-12-15&air_date.lte=2016-12-17&page=1&timezone=America/New_York&include_null_first_air_dates=false")
    }

    this.people = () => {
      return this.$http.get("https://api.themoviedb.org/3/tv/60735/credits?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR");
    };

    this.seasons = () => {
      return this.$http.get("https://api.themoviedb.org/3/tv/60735/season/1?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR");
    };

    this.search = (query, page) => {
      return this.$http.get("https://api.themoviedb.org/3/search/tv?api_key=fc533e12b849e49e74ab5d046165bcc7&language=fr-FR&query="+ query +"&page="+ page);
    };

}
