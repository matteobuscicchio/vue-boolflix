// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui 
// possiamo scrivere completamente o parzialmente il nome di un film. 
// Possiamo, cliccando il bottone, cercare sull’API tutti 
// i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo 
// i seguenti valori per ogni
// film trovato:
// 1. Titolo
// 2. Titolo Originale
// 3. Lingua
// 4. Voto

let app = new Vue({
    el: '#app',
    data: {
        userResearch: '',
        moviesInfo: [],
    },

    methods: {

        obtainMovieInfo: function(find){
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=5c002e8033723e03762798df6a4b2e57&language=it&query=${find}`)
			.then(index =>{
				this.moviesInfo = index.data.results;
                console.log(this.moviesInfo);
            });
		},
    },

    mounted(){

		// this.obtainMovieInfo(userResearch);
	}
})