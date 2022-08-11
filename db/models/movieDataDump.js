const getTop250Movies = async () =>{
    try {
    const response = await fetch(`https://imdb-api.com/en/API/Top250Movies/k_ppw0v6m5`,
    {
        method: 'GET',
        redirect: 'follow'
      })
      const result = await response.json()
      const movieList = result.items
    //   console.log(movieList)
      return movieList

    } catch (error) {
        console.error(error)
    }
}
const allMovies = await getTop250Movies()

const allMovieTitles = []

allMovies.map((movie, index)=>{
    console.log(movie.title)
    allMovieTitles[index] = movie.title.replace(/\s+/g, '+')
})

const getDetailsOfMovie = async (movieString) =>{
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=fc79f399&t=${movieString}`)
          const result = await response.json()
        
          return result
    
        } catch (error) {
            console.error(error)
        }
}

const insertMovieIntoDB = async () =>{
    allMovieTitles.map((movieTitle)=>{
        let movieDetails = await getDetailsOfMovie(movieTitle)
        let title = movieDetails.Title
        let genre = movieDetails.Genre
        let year = Number(movieDetails.Year)
        let rated = movieDetails.Rated
        let plot = movieDetails.Plot
        let actors = movieDetails.Actors
        let price = (Math.floor(Math.random() * 20 + 10)) + .99
        let inventory = Math.floor(Math.random() * 10 + 5)

        await createMovie({title, genre, year, rated, plot, actors, price, inventory})
    })
}
