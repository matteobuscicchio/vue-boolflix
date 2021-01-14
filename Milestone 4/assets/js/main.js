// Milestone 4:
// Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp,
// creando un layout completo simil-Netflix:
// ● Un header che contiene logo e search bar
// ● Dopo aver ricercato qualcosa nella searchbar, i risultati appaiono sotto forma
// di “card” in cui lo sfondo è rappresentato dall’immagine di copertina (consiglio
// la poster_path con w342)
// ● Andando con il mouse sopra una card (on hover), appaiono le informazioni
// aggiuntive già prese nei punti precedenti più la overview

let app = new Vue({
    el: '#app',
    data: {
        genre: '',
        movie: 'movie',
        tv: 'tv',
        language: '',
        it_IT: 'it_IT',
        en_EN: 'en_EN',
        userResearch: '',
        searchResults: [],
        usefullInfo: [],
    },
    methods: {

        /**
         * Questo metodo serve selezionare la ricerca tra film e serie tv.
         * Questo è anche il primo elemento ad essere eseguito
         */
        genreSelector: function(){
            let oneOrtwo = document.getElementById('selettore').value;
            if (oneOrtwo == "film" ) {
                this.genre = this.movie;
            } else if (oneOrtwo == "tv" ){
                this.genre = this.tv;
            }
        },
        languageSelector: function(){
            let lang = document.getElementById('language').value;
            if (lang == "it_IT" ) {
                this.genre = this.it_IT;
            } else if (oneOrtwo == "en_EN" ){
                this.genre = this.en_EN;
            }
        },
        /**
         * Questo metodo è stato rinominato poichè ora è in grado di trovare sia serie tv che film.
         * (il suo nome precedente era: obtainMovieInfo)
         */
        obtainInfo: function(type,lang,find){
            axios.get(`https://api.themoviedb.org/3/search/${type}?api_key=5c002e8033723e03762798df6a4b2e57&language=${lang}&query=${find}`)
			.then(result =>{
                const data = result.data.results;
                const temp = [];
                this.searchResults = data;
                // questa sezione serve a lavorare gli elementi che ci servono
                this.searchResults.forEach(resultTwo => {
                    let vote = Math.round(resultTwo.vote_average/2);
                    const fStar = [];
                    for (var index = 0; index < vote; index++) {
                        fStar.push('star');
                    }
                    // ora tuttle le info lavorate vengono inserrite nell'oggetto che poi verranno mostrate nel html
                    temp.push({
                        title: resultTwo.title || resultTwo.name,
                        original_title: resultTwo.original_title || resultTwo.original_name,
                        original_language: resultTwo.original_language,
                        vote_average: Math.round(resultTwo.vote_average/2),
                        fullStar: fStar,
                        backdrop_path: resultTwo.backdrop_path,
                        // richiesto nella milestone 4
                        overview: resultTwo.overview,
                    });
                    this.usefullInfo = temp;
                });
            });
        },
        obtainLanguage: function(o_l){
            // let language = `assets/img/en.jpeg`;
            let language = `assets/img/flags/${o_l}.png`;
            return language;
        },
        obtainCover: function(img){
            let coverImg = `https://image.tmdb.org/t/p/w780/${img}`;
            return coverImg;
        },
    },
    mounted(){

        // this.obtainMovieInfo(userResearch);
        this.genreSelector();
        this.languageSelector();
	}
})