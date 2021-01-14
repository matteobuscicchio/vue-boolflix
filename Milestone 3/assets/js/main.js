// Milestone 3:
// In questa milestone come prima cosa aggiungiamo la copertina del film o della serie
// al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo
// perché poi potremo generare da quella porzione di URL tante dimensioni diverse.
// Dovremo prendere quindi l’URL base delle immagini di TMDB:
// https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare
// (troviamo tutte le dimensioni possibili a questo link:
// https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400) per poi aggiungere la
// parte finale dell’URL passata dall’API.
// Esempio di URL:
// https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png

let app = new Vue({
    el: '#app',
    data: {
        genre: '',
        movie: 'movie',
        tv: 'tv',
        userResearch: '',
        searchResults: [],
        usefullInfo: [],
        flags: ["it", "en", "de", "es", "fr"],
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
            } else if (oneOrtwo == "tv" ) {
                this.genre = this.tv;
            }
        },

        /**
         * Questo metodo è stato rinominato poichè ora è in grado di trovare sia serie tv che film.
         * (il suo nome precedente era: obtainMovieInfo)
         */
        obtainInfo: function(type,find){
            axios.get(`https://api.themoviedb.org/3/search/${type}?api_key=5c002e8033723e03762798df6a4b2e57&language=it_IT&query=${find}`)
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
    },
    mounted(){

        // this.obtainMovieInfo(userResearch);
        this.genreSelector();
	}
})