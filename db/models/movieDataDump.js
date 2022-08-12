const fetch = require("node-fetch") 
const { async } = require("q")
const {createMovie} = require('./movies')
// import fetch from "node-fetch"
const gimmeMovies = async () =>{
   const fetchFunction = await fetch(`https://imdb-api.com/en/API/Top250Movies/k_ppw0v6m5`,
    {
        method: 'GET',
        redirect: 'follow'
      }) 
    //   console.log(fetchFunction, '!!!!!!')
      return fetchFunction
}
const populateMovieDatabase = async () =>{

    const getTop250Movies = async () =>{
         try {
         const response = await gimmeMovies()
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
            allMovieTitles[index] = movie.title.replace(/\s+/g, '+')
        })

        const firstHalf = allMovieTitles.slice(200 , 250)
        const secondHalf = allMovieTitles.slice(121)
        
        // console.log(allMovieTitles)
        const getDetailsOfMovie = async (movieString) =>{
            const url = `https://www.omdbapi.com/?apikey=fc79f399&t=${movieString}`
            try {
                const response = await fetch(url)
                // console.log( response, 'its gonna break!!!!!!!!!!!!')
                
                const result = await response.json()
                
                    // console.log( result, 'the map is working???????')
                  return result
            
                } catch (error) {
                    console.error(error)
                }
        }
// console.log(firstHalf, '!!!!!!!!!!!!')
// for(i = 0; i < firstHalf.length; i++){

// }
const firstHalfMovieDB = (async () => {
    for await (const element of firstHalf) {
    
    const movieDetailedResult = await getDetailsOfMovie(element)

    movieDetailedResult.Price = (Math.floor(Math.random() * 20 + 10))
    movieDetailedResult.Year = Number(movieDetailedResult.Year)
    movieDetailedResult.Inventory = Math.floor(Math.random() * 10 + 5)


    // console.log(sampleMovie, 'hopefully this works')
    const movieDetailedResultObj = {}
    movieDetailedResultObj.title = movieDetailedResult.Title
    movieDetailedResultObj.poster = movieDetailedResult.Poster
    movieDetailedResultObj.directors = movieDetailedResult.Director
    movieDetailedResultObj.genre = movieDetailedResult.Genre
    movieDetailedResultObj.year = movieDetailedResult.Year
    movieDetailedResultObj.rated = movieDetailedResult.Rated
    movieDetailedResultObj.plot = movieDetailedResult.Plot
    movieDetailedResultObj.actors = movieDetailedResult.Actors
    movieDetailedResultObj.price = movieDetailedResult.Price
    movieDetailedResultObj.inventory = movieDetailedResult.Inventory
    console.log(movieDetailedResultObj,",")
    // await createMovie(movieDetailedResultObj)

}})
firstHalfMovieDB()


        // const firstHalfWithData = Promise.all(firstHalf.map(async (movieTitle, index)=>{
        //     const movieData =
        //      await getDetailsOfMovie(movieTitle, index)
        //      return movieData
        // }))
        // console.log(firstHalfWithData[0], "WHAT NOW!!!!!")
        // await Promise.all(firstHalfWithData.map( async (movie) => {
        //     await createMovie(movie)}))
    }

    // sampleMovie.Price = (Math.floor(Math.random() * 20 + 10))
    // sampleMovie.Year = Number(sampleMovie.Year)
    // sampleMovie.Inventory = Math.floor(Math.random() * 10 + 5)


    // console.log(sampleMovie, 'hopefully this works')
    // const sampleMovieObj = {}
    // sampleMovieObj.title = sampleMovie.Title
    // sampleMovieObj.poster = sampleMovie.Poster
    // sampleMovieObj.directors = sampleMovie.Director
    // sampleMovieObj.genre = sampleMovie.Genre
    // sampleMovieObj.year = sampleMovie.Year
    // sampleMovieObj.rated = sampleMovie.Rated
    // sampleMovieObj.plot = sampleMovie.Plot
    // sampleMovieObj.actors = sampleMovie.Actors
    // sampleMovieObj.price = sampleMovie.Price
    // sampleMovieObj.inventory = sampleMovie.Inventory
    // console.log(sampleMovieObj, "what we're about to pass to function")


    const sampleCall = async ()=>{
        const url = `https://www.omdbapi.com/?apikey=fc79f399&t=The+Shawshank+Redemption`
        try {
            const response = await fetch(url)
            // console.log( response, 'its gonna break!!!!!!!!!!!!')
            
            const result = await response.json()
            
                // console.log( result, 'the map is working???????')
            
              return result
        
            } catch (error) {
                console.error(error)
            }
    }
const addMovieToDataBase = async () => {
    const allMovies = [{
        title: 'The Shawshank Redemption',
        poster: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Frank Darabont',
        genre: 'Drama',
        year: 1994,
        rated: 'R',
        plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        actors: 'Tim Robbins, Morgan Freeman, Bob Gunton',
        price: 10,
        inventory: 13
      } ,
      {
        title: 'The Godfather',
        poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Francis Ford Coppola',
        genre: 'Crime, Drama',
        year: 1972,
        rated: 'R',
        plot: 'The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.',
        actors: 'Marlon Brando, Al Pacino, James Caan',
        price: 26,
        inventory: 7
      } ,
      {
        title: 'The Dark Knight',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
        directors: 'Christopher Nolan',
        genre: 'Action, Crime, Drama',
        year: 2008,
        rated: 'PG-13',
        plot: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        actors: 'Christian Bale, Heath Ledger, Aaron Eckhart',
        price: 18,
        inventory: 9
      } ,
      {
        title: 'The Godfather Part II',
        poster: 'https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Francis Ford Coppola',
        genre: 'Crime, Drama',
        year: 1974,
        rated: 'R',
        plot: 'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
        actors: 'Al Pacino, Robert De Niro, Robert Duvall',
        price: 27,
        inventory: 6
      } ,
      {
        title: '12 Angry Men',
        poster: 'https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
        directors: 'Sidney Lumet',
        genre: 'Crime, Drama',
        year: 1957,
        rated: 'Approved',
        plot: 'The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.',
        actors: 'Henry Fonda, Lee J. Cobb, Martin Balsam',
        price: 22,
        inventory: 7
      } ,
      {
        title: "Schindler's List",
        poster: 'https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Steven Spielberg',
        genre: 'Biography, Drama, History',
        year: 1993,
        rated: 'R',
        plot: 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
        actors: 'Liam Neeson, Ralph Fiennes, Ben Kingsley',
        price: 27,
        inventory: 10
      } ,
      {
        title: 'The Lord of the Rings: The Return of the King',
        poster: 'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Peter Jackson',
        genre: 'Action, Adventure, Drama',
        year: 2003,
        rated: 'PG-13',
        plot: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
        actors: 'Elijah Wood, Viggo Mortensen, Ian McKellen',
        price: 29,
        inventory: 10
      } ,
      {
        title: 'Pulp Fiction',
        poster: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Quentin Tarantino',
        genre: 'Crime, Drama',
        year: 1994,
        rated: 'R',
        plot: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',  
        actors: 'John Travolta, Uma Thurman, Samuel L. Jackson',
        price: 21,
        inventory: 8
      } ,
      {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        poster: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg',
        directors: 'Peter Jackson',
        genre: 'Action, Adventure, Drama',
        year: 2001,
        rated: 'PG-13',
        plot: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
        actors: 'Elijah Wood, Ian McKellen, Orlando Bloom',
        price: 27,
        inventory: 13
      } ,
      {
        title: 'The Good, the Bad and the Ugly',
        poster: 'https://m.media-amazon.com/images/M/MV5BNjJlYmNkZGItM2NhYy00MjlmLTk5NmQtNjg1NmM2ODU4OTMwXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'Sergio Leone',
        genre: 'Adventure, Western',
        year: 1966,
        rated: 'R',
        plot: 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.',       
        actors: 'Clint Eastwood, Eli Wallach, Lee Van Cleef',
        price: 14,
        inventory: 13
      } ,
      {
        title: 'Forrest Gump',
        poster: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        directors: 'Robert Zemeckis',
        genre: 'Drama, Romance',
        year: 1994,
        rated: 'PG-13',
        plot: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood swe...',
        actors: 'Tom Hanks, Robin Wright, Gary Sinise',
        price: 18,
        inventory: 6
      } ,
      {
        title: 'Fight Club',
        poster: 'https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'David Fincher',
        genre: 'Drama',
        year: 1999,
        rated: 'R',
        plot: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
        actors: 'Brad Pitt, Edward Norton, Meat Loaf',
        price: 29,
        inventory: 14
      } ,
      {
        title: 'Inception',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
        directors: 'Christopher Nolan',
        genre: 'Action, Adventure, Sci-Fi',
        year: 2010,
        rated: 'PG-13',
        plot: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
        actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
        price: 19,
        inventory: 12
      } ,
      {
        title: 'The Lord of the Rings: The Two Towers',
        poster: 'https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Peter Jackson',
        genre: 'Action, Adventure, Drama',
        year: 2002,
        rated: 'PG-13',
        plot: "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
        actors: 'Elijah Wood, Ian McKellen, Viggo Mortensen',
        price: 13,
        inventory: 13
      } ,
      {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        poster: 'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Irvin Kershner',
        genre: 'Action, Adventure, Fantasy',
        year: 1980,
        rated: 'PG',
        plot: 'After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.',
        actors: 'Mark Hamill, Harrison Ford, Carrie Fisher',
        price: 24,
        inventory: 8
      } ,
      {
        title: 'The Matrix',
        poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',     
        directors: 'Lana Wachowski, Lilly Wachowski',
        genre: 'Action, Sci-Fi',
        year: 1999,
        rated: 'R',
        plot: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
        actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
        price: 15,
        inventory: 7
      } ,
      {
        title: 'Goodfellas',
        poster: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Martin Scorsese',
        genre: 'Biography, Crime, Drama',
        year: 1990,
        rated: 'R',
        plot: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.',
        actors: 'Robert De Niro, Ray Liotta, Joe Pesci',
        price: 24,
        inventory: 6
      } ,
      {
        title: "One Flew Over the Cuckoo's Nest",
        poster: 'https://m.media-amazon.com/images/M/MV5BZjA0OWVhOTAtYWQxNi00YzNhLWI4ZjYtNjFjZTEyYjJlNDVlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        directors: 'Milos Forman',
        genre: 'Drama',
        year: 1975,
        rated: 'R',
        plot: 'A criminal pleads insanity and is admitted to a mental institution, where he rebels against the oppressive nurse and rallies up the scared patients.',
        actors: 'Jack Nicholson, Louise Fletcher, Michael Berryman',
        price: 21,
        inventory: 11
      } ,
      {
        title: 'Se7en',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'David Fincher',
        genre: 'Crime, Drama, Mystery',
        year: 1995,
        rated: 'R',
        plot: 'Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.',
        actors: 'Morgan Freeman, Brad Pitt, Kevin Spacey',
        price: 18,
        inventory: 7
      } ,
      {
        title: 'Seven Samurai',
        poster: 'https://m.media-amazon.com/images/M/MV5BNWQ3OTM4ZGItMWEwZi00MjI5LWI3YzgtNTYwNWRkNmIzMGI5XkEyXkFqcGdeQXVyNDY2MTk1ODk@._V1_SX300.jpg',
        directors: 'Akira Kurosawa',
        genre: 'Action, Drama',
        year: 1954,
        rated: 'Not Rated',
        plot: '"A veteran samurai, gathers six samurais to protect a village from the cruel bandits. As the samurais teach the natives how to defend themselves, the village is attacked by a pack of 40 bandits.',
        actors: 'Toshirô Mifune, Takashi Shimura, Keiko Tsushima',
        price: 14,
        inventory: 10
      } ,
      {
        title: "It's a Wonderful Life",
        poster: 'https://m.media-amazon.com/images/M/MV5BZjc4NDZhZWMtNGEzYS00ZWU2LThlM2ItNTA0YzQ0OTExMTE2XkEyXkFqcGdeQXVyNjUwMzI2NzU@._V1_SX300.jpg',
        directors: 'Frank Capra',
        genre: 'Drama, Family, Fantasy',
        year: 1946,
        rated: 'PG',
        plot: 'An angel is sent from Heaven to help a desperately frustrated businessman by showing him what life would have been like if he had never existed.', 
        actors: 'James Stewart, Donna Reed, Lionel Barrymore',
        price: 18,
        inventory: 9
      } ,
      {
        title: 'The Silence of the Lambs',
        poster: 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Jonathan Demme',
        genre: 'Crime, Drama, Thriller',
        year: 1991,
        rated: 'R',
        plot: 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.',
        actors: 'Jodie Foster, Anthony Hopkins, Lawrence A. Bonney',
        price: 22,
        inventory: 9
      } ,
      {
        title: 'City of God',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTMwYjc5ZmItYTFjZC00ZGQ3LTlkNTMtMjZiNTZlMWQzNzI5XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Fernando Meirelles, Kátia Lund',
        genre: 'Crime, Drama',
        year: 2002,
        rated: 'R',
        plot: "In the slums of Rio, two kids' paths diverge as one struggles to become a photographer and the other a kingpin.",
        actors: 'Alexandre Rodrigues, Leandro Firmino, Matheus Nachtergaele',
        price: 28,
        inventory: 11
      } ,
      {
        title: 'Saving Private Ryan',
        poster: 'https://m.media-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',
        directors: 'Steven Spielberg',
        genre: 'Drama, War',
        year: 1998,
        rated: 'R',
        plot: 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.',
        actors: 'Tom Hanks, Matt Damon, Tom Sizemore',
        price: 24,
        inventory: 7
      } ,
      {
        title: 'Life Is Beautiful',
        poster: 'https://m.media-amazon.com/images/M/MV5BYmJmM2Q4NmMtYThmNC00ZjRlLWEyZmItZTIwOTBlZDQ3NTQ1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        directors: 'Roberto Benigni',
        genre: 'Comedy, Drama, Romance',
        year: 1997,
        rated: 'PG-13',
        plot: 'When an open-minded Jewish waiter and his son become victims of the Holocaust, he uses a perfect mixture of will, humor, and imagination to protect his son from the dangers around their camp.',
        actors: 'Roberto Benigni, Nicoletta Braschi, Giorgio Cantarini',
        price: 21,
        inventory: 6
      } ,
      {
        title: 'The Green Mile',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_SX300.jpg',
        directors: 'Frank Darabont',
        genre: 'Crime, Drama, Fantasy',
        year: 1999,
        rated: 'R',
        plot: 'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and sexual assualt, yet who has a mysterious gift.',
        actors: 'Tom Hanks, Michael Clarke Duncan, David Morse',
        price: 20,
        inventory: 10
      } ,
      {
        title: 'Interstellar',
        poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Christopher Nolan',
        genre: 'Adventure, Drama, Sci-Fi',
        year: 2014,
        rated: 'PG-13',
        plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        actors: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
        price: 27,
        inventory: 8
      } ,
      {
        title: 'Star Wars',
        poster: 'https://m.media-amazon.com/images/M/MV5BNzg4MjQxNTQtZmI5My00YjMwLWJlMjUtMmJlY2U2ZWFlNzY1XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
        directors: 'George Lucas',
        genre: 'Action, Adventure, Fantasy',
        year: 1977,
        rated: 'PG',
        plot: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth ...",
        actors: 'Mark Hamill, Harrison Ford, Carrie Fisher',
        price: 25,
        inventory: 13
      } ,
      {
        title: 'Terminator 2: Judgment Day',
        poster: 'https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'James Cameron',
        genre: 'Action, Sci-Fi',
        year: 1991,
        rated: 'R',
        plot: 'A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten-year-old son John from a more advanced and powerful cyborg.',
        actors: 'Arnold Schwarzenegger, Linda Hamilton, Edward Furlong',
        price: 27,
        inventory: 13
      } ,
      {
        title: 'Back to the Future',
        poster: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        directors: 'Robert Zemeckis',
        genre: 'Adventure, Comedy, Sci-Fi',
        year: 1985,
        rated: 'PG',
        plot: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.',
        actors: 'Michael J. Fox, Christopher Lloyd, Lea Thompson',
        price: 20,
        inventory: 5
      } ,
      {
        title: 'Spirited Away',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Hayao Miyazaki',
        genre: 'Animation, Adventure, Family',
        year: 2001,
        rated: 'PG',
        plot: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
        actors: 'Daveigh Chase, Suzanne Pleshette, Miyu Irino',
        price: 12,
        inventory: 10
      } ,
      {
        title: 'Psycho',
        poster: 'https://m.media-amazon.com/images/M/MV5BNTQwNDM1YzItNDAxZC00NWY2LTk0M2UtNDIwNWI5OGUyNWUxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Alfred Hitchcock',
        genre: 'Horror, Mystery, Thriller',
        year: 1960,
        rated: 'R',
        plot: "A Phoenix secretary embezzles $40,000 from her employer's client, goes on the run, and checks into a remote motel run by a young man under the domination of his mother.",
        actors: 'Anthony Perkins, Janet Leigh, Vera Miles',
        price: 17,
        inventory: 8
      } ,
      {
        title: 'The Pianist',
        poster: 'https://m.media-amazon.com/images/M/MV5BOWRiZDIxZjktMTA1NC00MDQ2LWEzMjUtMTliZmY3NjQ3ODJiXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Roman Polanski',
        genre: 'Biography, Drama, Music',
        year: 2002,
        rated: 'R',
        plot: 'A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II.',
        actors: 'Adrien Brody, Thomas Kretschmann, Frank Finlay',
        price: 17,
        inventory: 14
      } ,
      {
        title: 'Léon: The Professional',
        poster: 'https://m.media-amazon.com/images/M/MV5BODllNWE0MmEtYjUwZi00ZjY3LThmNmQtZjZlMjI2YTZjYmQ0XkEyXkFqcGdeQXVyNTc1NTQxODI@._V1_SX300.jpg',
        directors: 'Luc Besson',
        genre: 'Action, Crime, Drama',
        year: 1994,
        rated: 'R',
        plot: "12-year-old Mathilda is reluctantly taken in by Léon, a professional assassin, after her family is murdered. An unusual relationship forms as she becomes his protégée and learns the assassin's trade.",
        actors: 'Jean Reno, Gary Oldman, Natalie Portman',
        price: 20,
        inventory: 12
      } ,
      {
        title: 'Parasite',
        poster: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
        directors: 'Bong Joon Ho',
        genre: 'Comedy, Drama, Thriller',
        year: 2019,
        rated: 'R',
        plot: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',      
        actors: 'Song Kang-ho, Sun-kyun Lee, Cho Yeo-jeong',
        price: 16,
        inventory: 12
      } ,
      {
        title: 'The Lion King',
        poster: 'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg',
        directors: 'Roger Allers, Rob Minkoff',
        genre: 'Animation, Adventure, Drama',
        year: 1994,
        rated: 'G',
        plot: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
        actors: 'Matthew Broderick, Jeremy Irons, James Earl Jones',
        price: 23,
        inventory: 9
      } ,
      {
        title: 'Gladiator',
        poster: 'https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',     
        directors: 'Ridley Scott',
        genre: 'Action, Adventure, Drama',
        year: 2000,
        rated: 'R',
        plot: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
        actors: 'Russell Crowe, Joaquin Phoenix, Connie Nielsen',
        price: 16,
        inventory: 9
      } ,
      {
        title: 'American History X',
        poster: 'https://m.media-amazon.com/images/M/MV5BZTJhN2FkYWEtMGI0My00YWM4LWI2MjAtM2UwNjY4MTI2ZTQyXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_SX300.jpg',
        directors: 'Tony Kaye',
        genre: 'Crime, Drama',
        year: 1998,
        rated: 'R',
        plot: 'A former neo-nazi skinhead tries to prevent his younger brother from going down the same wrong path that he did.',
        actors: "Edward Norton, Edward Furlong, Beverly D'Angelo",
        price: 25,
        inventory: 9
      } ,
      {
        title: 'The Departed',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_SX300.jpg',
        directors: 'Martin Scorsese',
        genre: 'Crime, Drama, Thriller',
        year: 2006,
        rated: 'R',
        plot: 'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.',
        actors: 'Leonardo DiCaprio, Matt Damon, Jack Nicholson',
        price: 15,
        inventory: 7
      } ,
      {
        title: 'The Usual Suspects',
        poster: 'https://m.media-amazon.com/images/M/MV5BYTViNjMyNmUtNDFkNC00ZDRlLThmMDUtZDU2YWE4NGI2ZjVmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Bryan Singer',
        genre: 'Crime, Drama, Mystery',
        year: 1995,
        rated: 'R',
        plot: 'A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which began when five criminals met at a seemingly random police lineup.',
        actors: 'Kevin Spacey, Gabriel Byrne, Chazz Palminteri',
        price: 18,
        inventory: 8
      } ,
      {
        title: 'The Prestige',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_SX300.jpg',
        directors: 'Christopher Nolan',
        genre: 'Drama, Mystery, Sci-Fi',
        year: 2006,
        rated: 'PG-13',
        plot: 'After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.',
        actors: 'Christian Bale, Hugh Jackman, Scarlett Johansson',
        price: 28,
        inventory: 7
      } ,
      {
        title: 'Casablanca',
        poster: 'https://m.media-amazon.com/images/M/MV5BY2IzZGY2YmEtYzljNS00NTM5LTgwMzUtMzM1NjQ4NGI0OTk0XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',
        directors: 'Michael Curtiz',
        genre: 'Drama, Romance, War',
        year: 1942,
        rated: 'PG',
        plot: 'A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.',
        actors: 'Humphrey Bogart, Ingrid Bergman, Paul Henreid',
        price: 20,
        inventory: 8
      } ,
      {
        title: 'Whiplash',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Damien Chazelle',
        genre: 'Drama, Music',
        year: 2014,
        rated: 'R',
        plot: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
        actors: 'Miles Teller, J.K. Simmons, Melissa Benoist',
        price: 10,
        inventory: 7
      } ,
      {
        title: 'The Intouchables',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_SX300.jpg',
        directors: 'Olivier Nakache, Éric Toledano',
        genre: 'Biography, Comedy, Drama',
        year: 2011,
        rated: 'R',
        plot: 'After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver.',
        actors: 'François Cluzet, Omar Sy, Anne Le Ny',
        price: 13,
        inventory: 11
      } ,
      {
        title: 'Harakiri',
        poster: 'https://m.media-amazon.com/images/M/MV5BYjBmYTQ1NjItZWU5MS00YjI0LTg2OTYtYmFkN2JkMmNiNWVkXkEyXkFqcGdeQXVyMTMxMTY0OTQ@._V1_SX300.jpg',
        directors: 'Masaki Kobayashi',
        genre: 'Action, Drama, Mystery',
        year: 1962,
        rated: 'Not Rated',
        plot: "When a ronin requesting seppuku at a feudal lord's palace is told of the brutal suicide of another ronin who previously visited, he reveals how their pasts are intertwined - and in doing so challenges the clan's integrity.",
        actors: 'Tatsuya Nakadai, Akira Ishihama, Shima Iwashita',
        price: 28,
        inventory: 14
      } ,
      {
        title: 'Grave of the Fireflies',
        poster: 'https://m.media-amazon.com/images/M/MV5BZmY2NjUzNDQtNTgxNC00M2Q4LTljOWQtMjNjNDBjNWUxNmJlXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
        directors: 'Isao Takahata',
        genre: 'Animation, Drama, War',
        year: 1988,
        rated: 'Not Rated',
        plot: 'A young boy and his little sister struggle to survive in Japan during World War II.',
        actors: 'Tsutomu Tatsumi, Ayano Shiraishi, Akemi Yamaguchi',
        price: 23,
        inventory: 14
      } ,
      {
        title: 'Modern Times',
        poster: 'https://m.media-amazon.com/images/M/MV5BYjJiZjMzYzktNjU0NS00OTkxLWEwYzItYzdhYWJjN2QzMTRlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Charles Chaplin',
        genre: 'Comedy, Drama, Romance',
        year: 1936,
        rated: 'G',
        plot: 'The Tramp struggles to live in modern industrial society with the help of a young homeless woman.',
        actors: 'Charles Chaplin, Paulette Goddard, Henry Bergman',
        price: 10,
        inventory: 8
      } ,
      {
        title: 'Once Upon a Time in the West',
        poster: 'https://m.media-amazon.com/images/M/MV5BODQ3NDExOGYtMzI3Mi00NWRlLTkwNjAtNjc4MDgzZGJiZTA1XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'Sergio Leone',
        genre: 'Western',
        year: 1968,
        rated: 'PG-13',
        plot: 'A mysterious stranger with a harmonica joins forces with a notorious desperado to protect a beautiful widow from a ruthless assassin working for the railroad.',
        actors: 'Henry Fonda, Charles Bronson, Claudia Cardinale',
        price: 27,
        inventory: 14
      } ,
      {
        title: 'Top Gun: Maverick',
        poster: 'https://m.media-amazon.com/images/M/MV5BOWQwOTA1ZDQtNzk3Yi00ZmVmLWFiZGYtNjdjNThiYjJhNzRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
        directors: 'Joseph Kosinski',
        genre: 'Action, Drama',
        year: 2022,
        rated: 'PG-13',
        plot: "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
        actors: 'Tom Cruise, Jennifer Connelly, Miles Teller',
        price: 25,
        inventory: 14
      } ,
      {
        title: 'Rear Window',
        poster: 'https://m.media-amazon.com/images/M/MV5BNGUxYWM3M2MtMGM3Mi00ZmRiLWE0NGQtZjE5ODI2OTJhNTU0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        directors: 'Alfred Hitchcock',
        genre: 'Mystery, Thriller',
        year: 1954,
        rated: 'PG',
        plot: 'A wheelchair-bound photographer spies on his neighbors from his Greenwich Village courtyard apartment window, and becomes convinced one of them has committed murder, despite the skepticism of his fashion-model girlfriend.',
        actors: 'James Stewart, Grace Kelly, Wendell Corey',
        price: 13,
        inventory: 7
      } , 
      {
        title: 'Alien',
        poster: 'https://m.media-amazon.com/images/M/MV5BOGQzZTBjMjQtOTVmMS00NGE5LWEyYmMtOGQ1ZGZjNmRkYjFhXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'Ridley Scott',
        genre: 'Horror, Sci-Fi',
        year: 1979,
        rated: 'R',
        plot: 'The crew of a commercial spacecraft encounter a deadly lifeform after investigating an unknown transmission.',
        actors: 'Sigourney Weaver, Tom Skerritt, John Hurt',
        price: 27,
        inventory: 11
      } ,
      {
        title: 'City Lights',
        poster: 'https://m.media-amazon.com/images/M/MV5BY2I4MmM1N2EtM2YzOS00OWUzLTkzYzctNDc5NDg2N2IyODJmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Charles Chaplin',
        genre: 'Comedy, Drama, Romance',
        year: 1931,
        rated: 'G',
        plot: 'With the aid of a wealthy erratic tippler, a dewy-eyed tramp who has fallen in love with a sightless flower girl accumulates money to be able to help her medically.',
        actors: 'Charles Chaplin, Virginia Cherrill, Florence Lee',
        price: 29,
        inventory: 13
      } ,
      {
        title: 'Cinema Paradiso',
        poster: 'https://m.media-amazon.com/images/M/MV5BM2FhYjEyYmYtMDI1Yy00YTdlLWI2NWQtYmEzNzAxOGY1NjY2XkEyXkFqcGdeQXVyNTA3NTIyNDg@._V1_SX300.jpg',
        directors: 'Giuseppe Tornatore',
        genre: 'Drama, Romance',
        year: 1988,
        rated: 'PG',
        plot: "A filmmaker recalls his childhood when falling in love with the pictures at the cinema of his home village and forms a deep friendship with the cinema's projectionist.",
        actors: 'Philippe Noiret, Enzo Cannavale, Antonella Attili',
        price: 12,
        inventory: 11
      } ,
      {
        title: 'Apocalypse Now',
        poster: 'https://m.media-amazon.com/images/M/MV5BYmQyNTA1ZGItNjZjMi00NzFlLWEzMWEtNWMwN2Q2MjJhYzEyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'Francis Ford Coppola',
        genre: 'Drama, Mystery, War',
        year: 1979,
        rated: 'R',
        plot: 'A U.S. Army officer serving in Vietnam is tasked with assassinating a renegade Special Forces Colonel who sees himself as a god.',
        actors: 'Martin Sheen, Marlon Brando, Robert Duvall',
        price: 21,
        inventory: 12
      } ,
      {
        title: 'Memento',
        poster: 'https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Christopher Nolan',
        genre: 'Mystery, Thriller',
        year: 2000,
        rated: 'R',
        plot: "A man with short-term memory loss attempts to track down his wife's murderer.",
        actors: 'Guy Pearce, Carrie-Anne Moss, Joe Pantoliano',
        price: 29,
        inventory: 7
      } ,
      {
        title: 'Indiana Jones and the Raiders of the Lost Ark',
        poster: 'https://m.media-amazon.com/images/M/MV5BNTU2ODkyY2MtMjU1NC00NjE1LWEzYjgtMWQ3MzRhMTE0NDc0XkEyXkFqcGdeQXVyMjM4MzQ4OTQ@._V1_SX300.jpg',
        directors: 'Steven Spielberg',
        genre: 'Action, Adventure',
        year: 1981,
        rated: 'PG',
        plot: 'Archaeology professor Indiana Jones ventures to seize a biblical artefact known as the Ark of the Covenant. While doing so, he puts up a fight against Renee and a troop of Nazis.',
        actors: 'Harrison Ford, Karen Allen, Paul Freeman',
        price: 13,
        inventory: 12
      } ,
      {
        title: 'Django Unchained',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_SX300.jpg',
        directors: 'Quentin Tarantino',
        genre: 'Drama, Western',
        year: 2012,
        rated: 'R',
        plot: 'With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation-owner in Mississippi.',
        actors: 'Jamie Foxx, Christoph Waltz, Leonardo DiCaprio',
        price: 14,
        inventory: 7
      } ,
      {
        title: 'WALL·E',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjExMTg5OTU0NF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_SX300.jpg',
        directors: 'Andrew Stanton',
        genre: 'Animation, Adventure, Family',
        year: 2008,
        rated: 'G',
        plot: 'In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.',  
        actors: 'Ben Burtt, Elissa Knight, Jeff Garlin',
        price: 23,
        inventory: 7
      } ,
      {
        title: 'The Lives of Others',
        poster: 'https://m.media-amazon.com/images/M/MV5BNmQyNmJjM2ItNTQzYi00ZjMxLWFjMDYtZjUyN2YwZDk5YWQ2XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'Florian Henckel von Donnersmarck',
        genre: 'Drama, Mystery, Thriller',
        year: 2006,
        rated: 'R',
        plot: 'In 1984 East Berlin, an agent of the secret police, conducting surveillance on a writer and his lover, finds himself becoming increasingly absorbed by their lives.',
        actors: 'Ulrich Mühe, Martina Gedeck, Sebastian Koch',
        price: 25,
        inventory: 6
      } ,
      {
        title: 'Sunset Blvd.',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTU0NTkyNzYwMF5BMl5BanBnXkFtZTgwMDU0NDk5MTI@._V1_SX300.jpg',
        directors: 'Billy Wilder',
        genre: 'Drama, Film-Noir',
        year: 1950,
        rated: 'Passed',
        plot: 'A screenwriter develops a dangerous relationship with a faded film star determined to make a triumphant return.',
        actors: 'William Holden, Gloria Swanson, Erich von Stroheim',
        price: 21,
        inventory: 6
      } ,
      {
        title: 'Paths of Glory',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTI5Nzc0OTMtYzBkMS00NjkxLThmM2UtNjM2ODgxN2M5NjNkXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg',
        directors: 'Stanley Kubrick',
        genre: 'Drama, War',
        year: 1957,
        rated: 'Approved',
        plot: 'After refusing to attack an enemy position, a general accuses the soldiers of cowardice and their commanding officer must defend them.',
        actors: 'Kirk Douglas, Ralph Meeker, Adolphe Menjou',
        price: 20,
        inventory: 10
      } ,
      {
        title: 'The Shining',
        poster: 'https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        directors: 'Stanley Kubrick',
        genre: 'Drama, Horror',
        year: 1980,
        rated: 'R',
        plot: 'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.',
        actors: 'Jack Nicholson, Shelley Duvall, Danny Lloyd',
        price: 26,
        inventory: 11
      } ,
      {
        title: 'The Great Dictator',
        poster: 'https://m.media-amazon.com/images/M/MV5BMmExYWJjNTktNGUyZS00ODhmLTkxYzAtNWIzOGEyMGNiMmUwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Charles Chaplin',
        genre: 'Comedy, Drama, War',
        year: 1940,
        rated: 'G',
        plot: "Dictator Adenoid Hynkel tries to expand his empire while a poor Jewish barber tries to avoid persecution from Hynkel's regime.",
        actors: 'Charles Chaplin, Paulette Goddard, Jack Oakie',
        price: 18,
        inventory: 5
      } ,
      {
        title: 'Witness for the Prosecution',
        poster: 'https://m.media-amazon.com/images/M/MV5BNDQwODU5OWYtNDcyNi00MDQ1LThiOGMtZDkwNWJiM2Y3MDg0XkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_SX300.jpg',
        directors: 'Billy Wilder',
        genre: 'Crime, Drama, Mystery',
        year: 1957,
        rated: 'Approved',
        plot: 'A veteran British barrister must defend his client in a murder trial that has surprise after surprise.',
        actors: 'Tyrone Power, Marlene Dietrich, Charles Laughton',
        price: 28,
        inventory: 12
      } ,
      {
        title: 'Avengers: Infinity War',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg',
        directors: 'Anthony Russo, Joe Russo',
        genre: 'Action, Adventure, Sci-Fi',
        year: 2018,
        rated: 'PG-13',
        plot: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
        actors: 'Robert Downey Jr., Chris Hemsworth, Mark Ruffalo',
        price: 25,
        inventory: 14
      } ,
      {
        title: 'Aliens',
        poster: 'https://m.media-amazon.com/images/M/MV5BZGU2OGY5ZTYtMWNhYy00NjZiLWI0NjUtZmNhY2JhNDRmODU3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'James Cameron',
        genre: 'Action, Adventure, Sci-Fi',
        year: 1986,
        rated: 'R',
        plot: 'Fifty-seven years after surviving an apocalyptic attack aboard her space vessel by merciless space creatures, Officer Ripley awakens from hyper-sleep and tries to warn anyone who will listen about the predators.',
        actors: 'Sigourney Weaver, Michael Biehn, Carrie Henn',
        price: 23,
        inventory: 11
      } ,
      {
        title: 'American Beauty',
        poster: 'https://m.media-amazon.com/images/M/MV5BNTBmZWJkNjctNDhiNC00MGE2LWEwOTctZTk5OGVhMWMyNmVhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Sam Mendes',
        genre: 'Drama',
        year: 1999,
        rated: 'R',
        plot: "A sexually frustrated suburban father has a mid-life crisis after becoming infatuated with his daughter's best friend.",
        actors: 'Kevin Spacey, Annette Bening, Thora Birch',
        price: 11,
        inventory: 8
      } ,
      {
        title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        poster: 'https://m.media-amazon.com/images/M/MV5BZWI3ZTMxNjctMjdlNS00NmUwLWFiM2YtZDUyY2I3N2MxYTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Stanley Kubrick',
        genre: 'Comedy, War',
        year: 1964,
        rated: 'PG',
        plot: 'An insane American general orders a bombing attack on the Soviet Union, triggering a path to nuclear holocaust that a war room full of politicians and generals frantically tries to stop.',
        actors: 'Peter Sellers, George C. Scott, Sterling Hayden',
        price: 11,
        inventory: 13
      } ,
      {
        title: 'Spider-Man: Into the Spider-Verse',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SX300.jpg',
        directors: 'Bob Persichetti, Peter Ramsey, Rodney Rothman',
        genre: 'Animation, Action, Adventure',
        year: 2018,
        rated: 'PG',
        plot: 'Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.',
        actors: 'Shameik Moore, Jake Johnson, Hailee Steinfeld',
        price: 27,
        inventory: 9
      } ,
      {
        title: 'The Dark Knight Rises',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg',
        directors: 'Christopher Nolan',
        genre: 'Action, Drama',
        year: 2012,
        rated: 'PG-13',
        plot: "Eight years after the Joker's reign of anarchy, Batman, with the help of the enigmatic Catwoman, is forced from his exile to save Gotham City from the brutal guerrilla terrorist Bane.",
        actors: 'Christian Bale, Tom Hardy, Anne Hathaway',
        price: 10,
        inventory: 9
      } ,
      {
        title: 'Oldboy',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTI3NTQyMzU5M15BMl5BanBnXkFtZTcwMTM2MjgyMQ@@._V1_SX300.jpg',
        directors: 'Park Chan-wook',
        genre: 'Action, Drama, Mystery',
        year: 2003,
        rated: 'R',
        plot: 'After being kidnapped and imprisoned for fifteen years, Oh Dae-Su is released, only to find that he must find his captor in five days.',
        actors: 'Choi Min-sik, Yoo Ji-tae, Kang Hye-jeong',
        price: 28,
        inventory: 9
      } ,
      {
        title: 'Joker',
        poster: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
        directors: 'Todd Phillips',
        genre: 'Crime, Drama, Thriller',
        year: 2019,
        rated: 'R',
        plot: 'A mentally troubled stand-up comedian embarks on a downward spiral that leads to the creation of an iconic villain.',
        actors: 'Joaquin Phoenix, Robert De Niro, Zazie Beetz',
        price: 25,
        inventory: 9
      } ,
      {
        title: 'Amadeus',
        poster: 'https://m.media-amazon.com/images/M/MV5BNWJlNzUzNGMtYTAwMS00ZjI2LWFmNWQtODcxNWUxODA5YmU1XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg',
        directors: 'Milos Forman',
        genre: 'Biography, Drama, Music',
        year: 1984,
        rated: 'PG',
        plot: "The life, success and troubles of Wolfgang Amadeus Mozart, as told by Antonio Salieri, the contemporaneous composer who was insanely jealous of Mozart's talent and claimed to have murdered him.",
        actors: 'F. Murray Abraham, Tom Hulce, Elizabeth Berridge',
        price: 16,
        inventory: 14
      } ,
      {
        title: 'Braveheart',
        poster: 'https://m.media-amazon.com/images/M/MV5BMzkzMmU0YTYtOWM3My00YzBmLWI0YzctOGYyNTkwMWE5MTJkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Mel Gibson',
        genre: 'Biography, Drama, History',
        year: 1995,
        rated: 'R',
        plot: 'Scottish warrior William Wallace leads his countrymen in a rebellion to free his homeland from the tyranny of King Edward I of England.',
        actors: 'Mel Gibson, Sophie Marceau, Patrick McGoohan',
        price: 14,
        inventory: 6
      } ,
      {
        title: 'Toy Story',
        poster: 'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg',
        directors: 'John Lasseter',
        genre: 'Animation, Adventure, Comedy',
        year: 1995,
        rated: 'G',
        plot: "A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as top toy in a boy's bedroom.",
        actors: 'Tom Hanks, Tim Allen, Don Rickles',
        price: 23,
        inventory: 13
      } ,
      {
        title: 'Coco',
        poster: 'https://m.media-amazon.com/images/M/MV5BYjQ5NjM0Y2YtNjZkNC00ZDhkLWJjMWItN2QyNzFkMDE3ZjAxXkEyXkFqcGdeQXVyODIxMzk5NjA@._V1_SX300.jpg',
        directors: 'Lee Unkrich, Adrian Molina',
        genre: 'Animation, Adventure, Comedy',
        year: 2017,
        rated: 'PG',
        plot: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
        actors: 'Anthony Gonzalez, Gael García Bernal, Benjamin Bratt',
        price: 28,
        inventory: 9
      } ,
      {
        title: 'The Boat',
        poster: 'https://m.media-amazon.com/images/M/MV5BNDBjMWUxNTUtNjZiNi00YzJhLTgzNzUtMTRiY2FkZmMzYTNjXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg',
        directors: 'Wolfgang Petersen',
        genre: 'Drama, War',
        year: 1981,
        rated: 'R',
        plot: 'The claustrophobic world of a WWII German U-boat; boredom, filth and sheer terror.',
        actors: 'Jürgen Prochnow, Herbert Grönemeyer, Klaus Wennemann',
        price: 16,
        inventory: 9
      } ,
      {
        title: 'Inglourious Basterds',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTJiNDEzOWYtMTVjOC00ZjlmLWE0NGMtZmE1OWVmZDQ2OWJhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg',
        directors: 'Quentin Tarantino',
        genre: 'Adventure, Drama, War',
        year: 2009,
        rated: 'R',
        plot: "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
        actors: 'Brad Pitt, Diane Kruger, Eli Roth',
        price: 19,
        inventory: 11
      } ,
      {
        title: 'Princess Mononoke',
        poster: 'https://m.media-amazon.com/images/M/MV5BNGIzY2IzODQtNThmMi00ZDE4LWI5YzAtNzNlZTM1ZjYyYjUyXkEyXkFqcGdeQXVyODEzNjM5OTQ@._V1_SX300.jpg',
        directors: 'Hayao Miyazaki',
        genre: 'Animation, Adventure, Fantasy',
        year: 1997,
        rated: 'PG-13',
        plot: "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony. In this quest he also meets San, the Mononoke Hime.",
        actors: 'Yôji Matsuda, Yuriko Ishida, Yûko Tanaka',
        price: 18,
        inventory: 12
      } ,
      {
        title: 'Avengers: Endgame',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg',
        directors: 'Anthony Russo, Joe Russo',
        genre: 'Action, Adventure, Drama',
        year: 2019,
        rated: 'PG-13',
        plot: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
        actors: 'Robert Downey Jr., Chris Evans, Mark Ruffalo',
        price: 14,
        inventory: 8
      } ,
      {
        title: 'Once Upon a Time in America',
        poster: 'https://m.media-amazon.com/images/M/MV5BMGFkNWI4MTMtNGQ0OC00MWVmLTk3MTktOGYxN2Y2YWVkZWE2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Sergio Leone',
        genre: 'Crime, Drama',
        year: 1984,
        rated: 'R',
        plot: 'A former Prohibition-era Jewish gangster returns to the Lower East Side of Manhattan 35 years later, where he must once again confront the ghosts and regrets of his old life.',
        actors: 'Robert De Niro, James Woods, Elizabeth McGovern',
        price: 15,
        inventory: 5
      } ,
      {
        title: 'Good Will Hunting',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTI0MzcxMTYtZDVkMy00NjY1LTgyMTYtZmUxN2M3NmQ2NWJhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        directors: 'Gus Van Sant',
        genre: 'Drama, Romance',
        year: 1997,
        rated: 'R',
        plot: 'Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.',
        actors: 'Robin Williams, Matt Damon, Ben Affleck',
        price: 26,
        inventory: 11
      } ,
      {
        title: 'Your Name.',
        poster: 'https://m.media-amazon.com/images/M/MV5BODRmZDVmNzUtZDA4ZC00NjhkLWI2M2UtN2M0ZDIzNDcxYThjL2ltYWdlXkEyXkFqcGdeQXVyNTk0MzMzODA@._V1_SX300.jpg',     
        directors: 'Makoto Shinkai',
        genre: 'Animation, Drama, Fantasy',
        year: 2016,
        rated: 'TV-PG',
        plot: 'Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?',
        actors: 'Ryûnosuke Kamiki, Mone Kamishiraishi, Ryô Narita',
        price: 27,
        inventory: 9
      } ,
      {
        title: 'Toy Story 3',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTgxOTY4Mjc0MF5BMl5BanBnXkFtZTcwNTA4MDQyMw@@._V1_SX300.jpg',
        directors: 'Lee Unkrich',
        genre: 'Animation, Adventure, Comedy',
        year: 2010,
        rated: 'G',
        plot: "The toys are mistakenly delivered to a day-care center instead of the attic right before Andy leaves for college, and it's up to Woody to convince the other toys that they weren't abandoned and to return home.",
        actors: 'Tom Hanks, Tim Allen, Joan Cusack',
        price: 27,
        inventory: 12
      } ,
      {
        title: 'Requiem for a Dream',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTdiNzJlOWUtNWMwNS00NmFlLWI0YTEtZmI3YjIzZWUyY2Y3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Darren Aronofsky',
        genre: 'Drama',
        year: 2000,
        rated: 'Unrated',
        plot: 'The drug-induced utopias of four Coney Island people are shattered when their addictions run deep.',
        actors: 'Ellen Burstyn, Jared Leto, Jennifer Connelly',
        price: 25,
        inventory: 12
      } ,
      {
        title: "Singin' in the Rain",
        poster: 'https://m.media-amazon.com/images/M/MV5BZDRjNGViMjQtOThlMi00MTA3LThkYzQtNzJkYjBkMGE0YzE1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',
        directors: 'Stanley Donen, Gene Kelly',
        genre: 'Comedy, Musical, Romance',
        year: 1952,
        rated: 'G',
        plot: 'A silent film star falls for a chorus girl just as he and his delusionally jealous screen partner are trying to make the difficult transition to talking pictures in 1920s Hollywood.',
        actors: "Gene Kelly, Donald O'Connor, Debbie Reynolds",
        price: 22,
        inventory: 9
      } ,
      {
        title: '3 Idiots',
        poster: 'https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Rajkumar Hirani',
        genre: 'Comedy, Drama',
        year: 2009,
        rated: 'PG-13',
        plot: 'Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently, even as the rest of the world called them "idiots".',
        actors: 'Aamir Khan, Madhavan, Mona Singh',
        price: 20,
        inventory: 11
      } ,
      {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        poster: 'https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
        directors: 'Richard Marquand',
        genre: 'Action, Adventure, Fantasy',
        year: 1983,
        rated: 'PG',
        plot: "After a daring mission to rescue Han Solo from Jabba the Hutt, the Rebels dispatch to Endor to destroy the second Death Star. Meanwhile, Luke struggles to help Darth Vader back from the dark side without falling into the Emperor's...",
        actors: 'Mark Hamill, Harrison Ford, Carrie Fisher',
        price: 12,
        inventory: 6
      } ,
      {
        title: 'High and Low',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTI4NTNhZDMtMWNkZi00MTRmLWJmZDQtMmJkMGVmZTEzODlhXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
        directors: 'Akira Kurosawa',
        genre: 'Crime, Drama, Mystery',
        year: 1963,
        rated: 'Not Rated',
        plot: "An executive of a Yokohama shoe company becomes a victim of extortion when his chauffeur's son is kidnapped by mistake and held for ransom.",      
        actors: 'Toshirô Mifune, Yutaka Sada, Tatsuya Nakadai',
        price: 27,
        inventory: 8
      } ,
      {
        title: '2001: A Space Odyssey',
        poster: 'https://m.media-amazon.com/images/M/MV5BMmNlYzRiNDctZWNhMi00MzI4LThkZTctMTUzMmZkMmFmNThmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Stanley Kubrick',
        genre: 'Adventure, Sci-Fi',
        year: 1968,
        rated: 'G',
        plot: 'After uncovering a mysterious artifact buried beneath the Lunar surface, a spacecraft is sent to Jupiter to find its origins - a spacecraft manned by two men and the supercomputer H.A.L. 9000.',
        actors: 'Keir Dullea, Gary Lockwood, William Sylvester',
        price: 22,
        inventory: 12
      } ,
      {
        title: 'Eternal Sunshine of the Spotless Mind',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_SX300.jpg',
        directors: 'Michel Gondry',
        genre: 'Drama, Romance, Sci-Fi',
        year: 2004,
        rated: 'R',
        plot: 'When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.',
        actors: 'Jim Carrey, Kate Winslet, Tom Wilkinson',
        price: 28,
        inventory: 6
      } ,
      {
        title: 'Reservoir Dogs',
        poster: 'https://m.media-amazon.com/images/M/MV5BZmExNmEwYWItYmQzOS00YjA5LTk2MjktZjEyZDE1Y2QxNjA1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        directors: 'Quentin Tarantino',
        genre: 'Crime, Drama, Thriller',
        year: 1992,
        rated: 'R',
        plot: 'When a simple jewelry heist goes horribly wrong, the surviving criminals begin to suspect that one of them is a police informant.',
        actors: 'Harvey Keitel, Tim Roth, Michael Madsen',
        price: 20,
        inventory: 10
      } ,
      {
        title: 'Capernaum',
        poster: 'https://m.media-amazon.com/images/M/MV5BY2Y3OWNkMTctYzNjYS00NWVkLTg4OWEtY2YxN2I3NDhlYzE0XkEyXkFqcGdeQXVyMTI3ODAyMzE2._V1_SX300.jpg',
        directors: 'Nadine Labaki',
        genre: 'Drama',
        year: 2018,
        rated: 'R',
        plot: 'While serving a five-year sentence for a violent crime, a 12-year-old boy sues his parents for neglect.',
        actors: 'Zain Al Rafeea, Yordanos Shiferaw, Boluwatife Treasure Bankole',
        price: 25,
        inventory: 13
      } ,
      {
        title: 'Lawrence of Arabia',
        poster: 'https://m.media-amazon.com/images/M/MV5BYWY5ZjhjNGYtZmI2Ny00ODM0LWFkNzgtZmI1YzA2N2MxMzA0XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg',
        directors: 'David Lean',
        genre: 'Adventure, Biography, Drama',
        year: 1962,
        rated: 'Approved',
        plot: 'The story of T.E. Lawrence, the English officer who successfully united and led the diverse, often warring, Arab tribes during World War I in order to fight the Turks.',
        actors: "Peter O'Toole, Alec Guinness, Anthony Quinn",
        price: 13,
        inventory: 9
      } ,
      {
        title: 'Citizen Kane',
        poster: 'https://m.media-amazon.com/images/M/MV5BYjBiOTYxZWItMzdiZi00NjlkLWIzZTYtYmFhZjhiMTljOTdkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Orson Welles',
        genre: 'Drama, Mystery',
        year: 1941,
        rated: 'PG',
        plot: "Following the death of publishing tycoon Charles Foster Kane, reporters scramble to uncover the meaning of his final utterance: 'Rosebud.'",       
        actors: 'Orson Welles, Joseph Cotten, Dorothy Comingore',
        price: 13,
        inventory: 5
      } ,
      {
        title: 'The Hunt',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTg2NDg3ODg4NF5BMl5BanBnXkFtZTcwNzk3NTc3Nw@@._V1_SX300.jpg',
        directors: 'Thomas Vinterberg',
        genre: 'Drama',
        year: 2012,
        rated: 'R',
        plot: "A teacher lives a lonely life, all the while struggling over his son's custody. His life slowly gets better as he finds love and receives good news from his son, but his new luck is about to be brutally shattered by an innocent li...",
        actors: 'Mads Mikkelsen, Thomas Bo Larsen, Annika Wedderkopp',
        price: 18,
        inventory: 11
      } ,
      {
        title: 'M',
        poster: 'https://m.media-amazon.com/images/M/MV5BODA4ODk3OTEzMF5BMl5BanBnXkFtZTgwMTQ2ODMwMzE@._V1_SX300.jpg',
        directors: 'Fritz Lang',
        genre: 'Crime, Mystery, Thriller',
        year: 1931,
        rated: 'Passed',
        plot: 'When the police in a German city are unable to catch a child-murderer, other criminals join in the manhunt.',
        actors: 'Peter Lorre, Ellen Widmann, Inge Landgut',
        price: 14,
        inventory: 8
      } ,
      {
        title: 'North by Northwest',
        poster: 'https://m.media-amazon.com/images/M/MV5BZDA3NDExMTUtMDlhOC00MmQ5LWExZGUtYmI1NGVlZWI4OWNiXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
        directors: 'Alfred Hitchcock',
        genre: 'Action, Adventure, Mystery',
        year: 1959,
        rated: 'Approved',
        plot: 'A New York City advertising executive goes on the run after being mistaken for a government agent by a group of foreign spies, and falls for a woman whose loyalties he begins to doubt.',
        actors: 'Cary Grant, Eva Marie Saint, James Mason',
        price: 26,
        inventory: 10
      } ,
      {
        title: 'Vertigo',
        poster: 'https://m.media-amazon.com/images/M/MV5BYTE4ODEwZDUtNDFjOC00NjAxLWEzYTQtYTI1NGVmZmFlNjdiL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
        directors: 'Alfred Hitchcock',
        genre: 'Mystery, Romance, Thriller',
        year: 1958,
        rated: 'PG',
        plot: 'A former San Francisco police detective juggles wrestling with his personal demons and becoming obsessed with the hauntingly beautiful woman he has been hired to trail, who may be deeply disturbed.',
        actors: 'James Stewart, Kim Novak, Barbara Bel Geddes',
        price: 27,
        inventory: 14
      } ,
      {
        title: 'Come and See',
        poster: 'https://m.media-amazon.com/images/M/MV5BODM4Njg0NTAtYjI5Ny00ZjAxLTkwNmItZTMxMWU5M2U3M2RjXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Elem Klimov',
        genre: 'Drama, Thriller, War',
        year: 1985,
        rated: 'Not Rated',
        plot: 'After finding an old rifle, a young boy joins the Soviet resistance movement against ruthless German forces and experiences the horrors of World War II.',
        actors: 'Aleksey Kravchenko, Olga Mironova, Liubomiras Laucevicius',
        price: 29,
        inventory: 11
      } ,
      {
        title: 'Amélie',
        poster: 'https://m.media-amazon.com/images/M/MV5BNDg4NjM1YjMtYmNhZC00MjM0LWFiZmYtNGY1YjA3MzZmODc5XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg',
        directors: 'Jean-Pierre Jeunet',
        genre: 'Comedy, Romance',
        year: 2001,
        rated: 'R',
        plot: 'Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.',
        actors: 'Audrey Tautou, Mathieu Kassovitz, Rufus',
        price: 27,
        inventory: 14
      } ,
      {
        title: 'A Clockwork Orange',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTY3MjM1Mzc4N15BMl5BanBnXkFtZTgwODM0NzAxMDE@._V1_SX300.jpg',
        directors: 'Stanley Kubrick',
        genre: 'Crime, Sci-Fi',
        year: 1971,
        rated: 'X',
        plot: "In the future, a sadistic gang leader is imprisoned and volunteers for a conduct-aversion experiment, but it doesn't go as planned.",
        actors: 'Malcolm McDowell, Patrick Magee, Michael Bates',
        price: 23,
        inventory: 7
      } ,
      {
        title: 'Double Indemnity',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTdlNjgyZGUtOTczYi00MDdhLTljZmMtYTEwZmRiOWFkYjRhXkEyXkFqcGdeQXVyNDY2MTk1ODk@._V1_SX300.jpg',
        directors: 'Billy Wilder',
        genre: 'Crime, Drama, Film-Noir',
        year: 1944,
        rated: 'Passed',
        plot: 'A Los Angeles insurance representative lets an alluring housewife seduce him into a scheme of insurance fraud and murder that arouses the suspicion of his colleague, an insurance investigator.',
        actors: 'Fred MacMurray, Barbara Stanwyck, Edward G. Robinson',
        price: 16,
        inventory: 10
      } ,
      {
        title: 'Full Metal Jacket',
        poster: 'https://m.media-amazon.com/images/M/MV5BNzkxODk0NjEtYjc4Mi00ZDI0LTgyYjEtYzc1NDkxY2YzYTgyXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Stanley Kubrick',
        genre: 'Drama, War',
        year: 1987,
        rated: 'R',
        plot: 'A pragmatic U.S. Marine observes the dehumanizing effects the Vietnam War has on his fellow recruits from their brutal boot camp training to the bloody street fighting in Hue.',
        actors: "Matthew Modine, R. Lee Ermey, Vincent D'Onofrio",
        price: 29,
        inventory: 14
      } ,
      {
        title: 'The Apartment',
        poster: 'https://m.media-amazon.com/images/M/MV5BNzkwODFjNzItMmMwNi00MTU5LWE2MzktM2M4ZDczZGM1MmViXkEyXkFqcGdeQXVyNDY2MTk1ODk@._V1_SX300.jpg',
        directors: 'Billy Wilder',
        genre: 'Comedy, Drama, Romance',
        year: 1960,
        rated: 'Approved',
        plot: 'A Manhattan insurance clerk tries to rise in his company by letting its executives use his apartment for trysts, but complications and a romance of his own ensue.',
        actors: 'Jack Lemmon, Shirley MacLaine, Fred MacMurray',
        price: 25,
        inventory: 11
      } ,
      {
        title: 'Scarface',
        poster: 'https://m.media-amazon.com/images/M/MV5BNjdjNGQ4NDEtNTEwYS00MTgxLTliYzQtYzE2ZDRiZjFhZmNlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Brian De Palma',
        genre: 'Crime, Drama',
        year: 1983,
        rated: 'R',
        plot: 'In 1980 Miami, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.',
        actors: 'Al Pacino, Michelle Pfeiffer, Steven Bauer',
        price: 10,
        inventory: 14
      } ,
      {
        title: 'Ikiru',
        poster: 'https://m.media-amazon.com/images/M/MV5BZTdkN2E5OTYtN2FiMi00YWUwLWEzMGMtZTMzNjY0NjgzYzFiXkEyXkFqcGdeQXVyMTI3ODAyMzE2._V1_SX300.jpg',
        directors: 'Akira Kurosawa',
        genre: 'Drama',
        year: 1952,
        rated: 'Not Rated',
        plot: 'A bureaucrat tries to find meaning in his life after he discovers he has terminal cancer.',
        actors: "Takashi Shimura, Nobuo Kaneko, Shin'ichi Himori",
        price: 13,
        inventory: 8
      } ,
      {
        title: 'The Sting',
        poster: 'https://m.media-amazon.com/images/M/MV5BNGU3NjQ4YTMtZGJjOS00YTQ3LThmNmItMTI5MDE2ODI3NzY3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'George Roy Hill',
        genre: 'Comedy, Crime, Drama',
        year: 1973,
        rated: 'PG',
        plot: 'Two grifters team up to pull off the ultimate con.',
        actors: 'Paul Newman, Robert Redford, Robert Shaw',
        price: 28,
        inventory: 13
      } ,
      {
        title: 'To Kill a Mockingbird',
        poster: 'https://m.media-amazon.com/images/M/MV5BNmVmYzcwNzMtMWM1NS00MWIyLThlMDEtYzUwZDgzODE1NmE2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Robert Mulligan',
        genre: 'Crime, Drama',
        year: 1962,
        rated: 'Approved',
        plot: 'Atticus Finch, a widowed lawyer in Depression-era Alabama, defends a black man against an undeserved sexual assualt charge, and his children against prejudice.',
        actors: 'Gregory Peck, John Megna, Frank Overton',
        price: 11,
        inventory: 13
      } ,
      {
        title: 'Taxi Driver',
        poster: 'https://m.media-amazon.com/images/M/MV5BM2M1MmVhNDgtNmI0YS00ZDNmLTkyNjctNTJiYTQ2N2NmYzc2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Martin Scorsese',
        genre: 'Crime, Drama',
        year: 1976,
        rated: 'R',
        plot: 'A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence and sleaze fuels his urge for violent action.',
        actors: 'Robert De Niro, Jodie Foster, Cybill Shepherd',
        price: 24,
        inventory: 12
      } ,
      {
        title: 'Up',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTk3NDE2NzI4NF5BMl5BanBnXkFtZTgwNzE1MzEyMTE@._V1_SX300.jpg',
        directors: 'Pete Docter, Bob Peterson',
        genre: 'Animation, Adventure, Comedy',
        year: 2009,
        rated: 'PG',
        plot: '78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with balloons, inadvertently taking a young stowaway.',
        actors: 'Edward Asner, Jordan Nagai, John Ratzenberger',
        price: 14,
        inventory: 10
      } ,
      {
        title: 'Heat',
        poster: 'https://m.media-amazon.com/images/M/MV5BYjZjNTJlZGUtZTE1Ny00ZDc4LTgwYjUtMzk0NDgwYzZjYTk1XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Michael Mann',
        genre: 'Action, Crime, Drama',
        year: 1995,
        rated: 'R',
        plot: 'A group of high-end professional thieves start to feel the heat from the LAPD when they unknowingly leave a clue at their latest heist.',
        actors: 'Al Pacino, Robert De Niro, Val Kilmer',
        price: 17,
        inventory: 7
      } ,
      {
        title: 'L.A. Confidential',
        poster: 'https://m.media-amazon.com/images/M/MV5BMDQ2YzEyZGItYWRhOS00MjBmLTkzMDUtMTdjYzkyMmQxZTJlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Curtis Hanson',
        genre: 'Crime, Drama, Mystery',
        year: 1997,
        rated: 'R',
        plot: 'As corruption grows in 1950s Los Angeles, three policemen - one strait-laced, one brutal, and one sleazy - investigate a series of murders with their own brand of justice.',
        actors: 'Kevin Spacey, Russell Crowe, Guy Pearce',
        price: 10,
        inventory: 8
      } ,
      {
        title: 'Metropolis',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTg5YWIyMWUtZDY5My00Zjc1LTljOTctYmI0MWRmY2M2NmRkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Fritz Lang',
        genre: 'Drama, Sci-Fi',
        year: 1927,
        rated: 'Not Rated',
        plot: "In a futuristic city sharply divided between the working class and the city planners, the son of the city's mastermind falls in love with a working-class prophet who predicts the coming of a savior to mediate their differences.",
        actors: 'Brigitte Helm, Alfred Abel, Gustav Fröhlich',
        price: 25,
        inventory: 13
      } ,
      {
        title: 'A Separation',
        poster: 'https://m.media-amazon.com/images/M/MV5BN2JmMjViMjMtZTM5Mi00ZGZkLTk5YzctZDg5MjFjZDE4NjNkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Asghar Farhadi',
        genre: 'Drama',
        year: 2011,
        rated: 'PG-13',
        plot: "A married couple are faced with a difficult decision - to improve the life of their child by moving to another country or to stay in Iran and look after a deteriorating parent who has Alzheimer's disease.",
        actors: 'Payman Maadi, Leila Hatami, Sareh Bayat',
        price: 16,
        inventory: 14
      } ,
      {
        title: 'Incendies',
        poster: 'https://m.media-amazon.com/images/M/MV5BMWE3MGYzZjktY2Q5Mi00Y2NiLWIyYWUtMmIyNzA3YmZlMGFhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Denis Villeneuve',
        genre: 'Drama, Mystery',
        year: 2010,
        rated: 'R',
        plot: "Twins journey to the Middle East to discover their family history and fulfill their mother's last wishes.",
        actors: 'Lubna Azabal, Mélissa Désormeaux-Poulin, Maxim Gaudette',
        price: 22,
        inventory: 5
      } ,
      {
        title: 'Die Hard',
        poster: 'https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'John McTiernan',
        genre: 'Action, Thriller',
        year: 1988,
        rated: 'R',
        plot: 'An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.',
        actors: 'Bruce Willis, Alan Rickman, Bonnie Bedelia',
        price: 14,
        inventory: 7
      } ,
      {
        title: 'Snatch',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTA2NDYxOGYtYjU1Mi00Y2QzLTgxMTQtMWI1MGI0ZGQ5MmU4XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg',
        directors: 'Guy Ritchie',
        genre: 'Comedy, Crime',
        year: 2000,
        rated: 'R',
        plot: 'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.',
        actors: 'Jason Statham, Brad Pitt, Stephen Graham',
        price: 29,
        inventory: 10
      } ,
      {
        title: 'Hamilton',
        poster: 'https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_SX300.jpg',
        directors: 'Thomas Kail',
        genre: 'Biography, Drama, History',
        year: 2020,
        rated: 'PG-13',
        plot: "The real life of one of America's foremost founding fathers and first Secretary of the Treasury, Alexander Hamilton. Captured live on Broadway from the Richard Rodgers Theater with the original Broadway cast.",
        actors: 'Lin-Manuel Miranda, Phillipa Soo, Leslie Odom Jr.',
        price: 26,
        inventory: 11
      } ,
      {
        title: 'Bicycle Thieves',
        poster: 'https://m.media-amazon.com/images/M/MV5BNmI1ODdjODctMDlmMC00ZWViLWI5MzYtYzRhNDdjYmM3MzFjXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Vittorio De Sica',
        genre: 'Drama',
        year: 1948,
        rated: 'Not Rated',
        plot: "In post-war Italy, a working-class man's bicycle is stolen, endangering his efforts to find work. He and his son set out to find it.",
        actors: 'Lamberto Maggiorani, Enzo Staiola, Lianella Carell',
        price: 12,
        inventory: 14
      } ,
      {
        title: 'Indiana Jones and the Last Crusade',
        poster: 'https://m.media-amazon.com/images/M/MV5BY2Q0ODg4ZmItNDZiYi00ZWY5LTg2NzctNmYwZjA5OThmNzE1XkEyXkFqcGdeQXVyMjM4MzQ4OTQ@._V1_SX300.jpg',
        directors: 'Steven Spielberg',
        genre: 'Action, Adventure',
        year: 1989,
        rated: 'PG-13',
        plot: `In 1938, after his father Professor Henry Jones, Sr. goes missing while pursuing the Holy Grail, Professor Henry "Indiana" Jones, Jr. finds himself up against Adolf Hitler's Nazis again to stop them from obtaining its powers.`,
        actors: 'Harrison Ford, Sean Connery, Alison Doody',
        price: 26,
        inventory: 10
      } ,
      {
        title: '1917',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTdmNTFjNDEtNzg0My00ZjkxLTg1ZDAtZTdkMDc2ZmFiNWQ1XkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_SX300.jpg',
        directors: 'Sam Mendes',
        genre: 'Action, Drama, War',
        year: 2019,
        rated: 'R',
        plot: 'April 6th, 1917. As an infantry battalion assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap.',
        actors: 'Dean-Charles Chapman, George MacKay, Daniel Mays',
        price: 20,
        inventory: 7
      } ,
      {
        title: 'Like Stars on Earth',
        poster: 'https://m.media-amazon.com/images/M/MV5BMDhjZWViN2MtNzgxOS00NmI4LThiZDQtZDI3MzM4MDE4NTc0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Aamir Khan, Amole Gupte',
        genre: 'Drama, Family',
        year: 2007,
        rated: 'PG',
        plot: 'An eight-year-old boy is thought to be a lazy trouble-maker, until the new art teacher has the patience and compassion to discover the real problem behind his struggles in school.',
        actors: 'Darsheel Safary, Aamir Khan, Tisca Chopra',
        price: 18,
        inventory: 5
      } ,
      {
        title: 'Downfall',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTU0NTU5NTAyMl5BMl5BanBnXkFtZTYwNzYwMDg2._V1_SX300.jpg',
        directors: 'Oliver Hirschbiegel',
        genre: 'Biography, Drama, History',
        year: 2004,
        rated: 'R',
        plot: "Traudl Junge, the final secretary for Adolf Hitler, tells of the Nazi dictator's final days in his Berlin bunker at the end of WWII.",
        actors: 'Bruno Ganz, Alexandra Maria Lara, Ulrich Matthes',
        price: 24,
        inventory: 11
      } ,
      {
        title: 'For a Few Dollars More',
        poster: 'https://m.media-amazon.com/images/M/MV5BMzJlZTNkYjQtMTE1OS00YTJlLTgxNjItYzg4NTllODdkMzBiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'Sergio Leone',
        genre: 'Western',
        year: 1965,
        rated: 'R',
        plot: 'Two bounty hunters with the same intentions team up to track down an escaped Mexican outlaw.',
        actors: 'Clint Eastwood, Lee Van Cleef, Gian Maria Volontè',
        price: 15,
        inventory: 9
      } ,
      {
        title: 'Batman Begins',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        directors: 'Christopher Nolan',
        genre: 'Action, Crime, Drama',
        year: 2005,
        rated: 'PG-13',
        plot: 'After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.',
        actors: 'Christian Bale, Michael Caine, Ken Watanabe',
        price: 15,
        inventory: 11
      } ,
      {
        title: 'Dangal',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_SX300.jpg',
        directors: 'Nitesh Tiwari',
        genre: 'Action, Biography, Drama',
        year: 2016,
        rated: 'Not Rated',
        plot: 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.',
        actors: 'Aamir Khan, Sakshi Tanwar, Fatima Sana Shaikh',
        price: 14,
        inventory: 7
      } ,
      {
        title: 'The Kid',
        poster: 'https://m.media-amazon.com/images/M/MV5BZjhhMThhNDItNTY2MC00MmU1LTliNDEtNDdhZjdlNTY5ZDQ1XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
        directors: 'Charles Chaplin',
        genre: 'Comedy, Drama, Family',
        year: 1921,
        rated: 'Passed',
        plot: 'The Tramp cares for an abandoned child, but events put their relationship in jeopardy.',
        actors: 'Charles Chaplin, Edna Purviance, Jackie Coogan',
        price: 24,
        inventory: 7
      } ,
      {
        title: 'Some Like It Hot',
        poster: 'https://m.media-amazon.com/images/M/MV5BNzAyOGIxYjAtMGY2NC00ZTgyLWIwMWEtYzY0OWQ4NDFjOTc5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Billy Wilder',
        genre: 'Comedy, Music, Romance',
        year: 1959,
        rated: 'Passed',
        plot: 'After two male musicians witness a mob hit, they flee the state in an all-female band disguised as women, but further complications set in.',      
        actors: 'Marilyn Monroe, Tony Curtis, Jack Lemmon',
        price: 17,
        inventory: 10
      } ,
      {
        title: 'All About Eve',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTY2MTAzODI5NV5BMl5BanBnXkFtZTgwMjM4NzQ0MjE@._V1_SX300.jpg',
        directors: 'Joseph L. Mankiewicz',
        genre: 'Drama',
        year: 1950,
        rated: 'Passed',
        plot: 'A seemingly timid but secretly ruthless ingénue insinuates herself into the lives of an aging Broadway star and her circle of theater friends.',   
        actors: 'Bette Davis, Anne Baxter, George Sanders',
        price: 18,
        inventory: 7
      } ,
      {
        title: 'The Father',
        poster: 'https://m.media-amazon.com/images/M/MV5BZGJhNWRiOWQtMjI4OS00ZjcxLTgwMTAtMzQ2ODkxY2JkOTVlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
        directors: 'Florian Zeller',
        genre: 'Drama, Mystery',
        year: 2020,
        rated: 'PG-13',
        plot: 'A man refuses all assistance from his daughter as he ages. As he tries to make sense of his changing circumstances, he begins to doubt his loved ones, his own mind and even the fabric of his reality.',
        actors: 'Anthony Hopkins, Olivia Colman, Mark Gatiss',
        price: 12,
        inventory: 14
      } ,
      {
        title: 'Spider-Man: No Way Home',
        poster: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg',
        directors: 'Jon Watts',
        genre: 'Action, Adventure, Fantasy',
        year: 2021,
        rated: 'PG-13',
        plot: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
        actors: 'Tom Holland, Zendaya, Benedict Cumberbatch',
        price: 12,
        inventory: 14
      } ,
      {
        title: 'Green Book',
        poster: 'https://m.media-amazon.com/images/M/MV5BYzIzYmJlYTYtNGNiYy00N2EwLTk4ZjItMGYyZTJiOTVkM2RlXkEyXkFqcGdeQXVyODY1NDk1NjE@._V1_SX300.jpg',
        directors: 'Peter Farrelly',
        genre: 'Biography, Comedy, Drama',
        year: 2018,
        rated: 'PG-13',
        plot: 'A working-class Italian-American bouncer becomes the driver for an African-American classical pianist on a tour of venues through the 1960s American South.',
        actors: 'Viggo Mortensen, Mahershala Ali, Linda Cardellini',
        price: 13,
        inventory: 11
      } ,
      {
        title: 'The Wolf of Wall Street',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_SX300.jpg',
        directors: 'Martin Scorsese',
        genre: 'Biography, Comedy, Crime',
        year: 2013,
        rated: 'R',
        plot: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
        actors: 'Leonardo DiCaprio, Jonah Hill, Margot Robbie',
        price: 26,
        inventory: 11
      } ,
      {
        title: 'Judgment at Nuremberg',
        poster: 'https://m.media-amazon.com/images/M/MV5BNDc2ODQ5NTE2MV5BMl5BanBnXkFtZTcwODExMjUyNA@@._V1_SX300.jpg',
        directors: 'Stanley Kramer',
        genre: 'Drama, War',
        year: 1961,
        rated: 'Approved',
        plot: 'In 1948, an American court in occupied Germany tries four Nazis judged for war crimes.',
        actors: 'Spencer Tracy, Burt Lancaster, Richard Widmark',
        price: 20,
        inventory: 8
      } ,
      {
        title: 'Ran',
        poster: 'https://m.media-amazon.com/images/M/MV5BMmU1NGYwZWYtOWExNi00ZTEyLTgwMmUtM2ZlMDVjNWM4YjVlXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'Akira Kurosawa',
        genre: 'Action, Drama, War',
        year: 1985,
        rated: 'R',
        plot: 'In Medieval Japan, an elderly warlord retires, handing over his empire to his three sons. However, he vastly underestimates how the new-found power will corrupt them and cause them to turn on each other...and him.',
        actors: 'Tatsuya Nakadai, Akira Terao, Jinpachi Nezu',
        price: 13,
        inventory: 11
      } ,
      {
        title: 'Casino',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTcxOWYzNDYtYmM4YS00N2NkLTk0NTAtNjg1ODgwZjAxYzI3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
        directors: 'Martin Scorsese',
        genre: 'Crime, Drama',
        year: 1995,
        rated: 'R',
        plot: 'A tale of greed, deception, money, power, and murder occur between two best friends: a mafia enforcer and a casino executive compete against each other over a gambling empire, and over a fast-living and fast-loving socialite.',
        actors: 'Robert De Niro, Sharon Stone, Joe Pesci',
        price: 28,
        inventory: 13
      } ,
      {
        title: 'Unforgiven',
        poster: 'https://m.media-amazon.com/images/M/MV5BODM3YWY4NmQtN2Y3Ni00OTg0LWFhZGQtZWE3ZWY4MTJlOWU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Clint Eastwood',
        genre: 'Drama, Western',
        year: 1992,
        rated: 'R',
        plot: 'Retired Old West gunslinger William Munny reluctantly takes on one last job, with the help of his old partner Ned Logan and a young man, The "Schofield Kid."',
        actors: 'Clint Eastwood, Gene Hackman, Morgan Freeman',
        price: 22,
        inventory: 6
      } ,
      {
        title: "Pan's Labyrinth",
        poster: 'https://m.media-amazon.com/images/M/MV5BYzFjMThiMGItOWRlMC00MDI4LThmOGUtYTNlZGZiYWI1YjMyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'Guillermo del Toro',
        genre: 'Drama, Fantasy, War',
        year: 2006,
        rated: 'R',
        plot: 'In the Falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating fantasy world.',   
        actors: 'Ivana Baquero, Ariadna Gil, Sergi López',
        price: 27,
        inventory: 14
      } ,
      {
        title: 'There Will Be Blood',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjAxODQ4MDU5NV5BMl5BanBnXkFtZTcwMDU4MjU1MQ@@._V1_SX300.jpg',
        directors: 'Paul Thomas Anderson',
        genre: 'Drama',
        year: 2007,
        rated: 'R',
        plot: 'A story of family, religion, hatred, oil and madness, focusing on a turn-of-the-century prospector in the early days of the business.',
        actors: 'Daniel Day-Lewis, Paul Dano, Ciarán Hinds',
        price: 22,
        inventory: 12
      } ,
      {
        title: 'The Sixth Sense',
        poster: 'https://m.media-amazon.com/images/M/MV5BMWM4NTFhYjctNzUyNi00NGMwLTk3NTYtMDIyNTZmMzRlYmQyXkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_SX300.jpg',
        directors: 'M. Night Shyamalan',
        genre: 'Drama, Mystery, Thriller',
        year: 1999,
        rated: 'PG-13',
        plot: 'A frightened, withdrawn Philadelphia boy who communicates with spirits seeks the help of a disheartened child psychologist.',
        actors: 'Bruce Willis, Haley Joel Osment, Toni Collette',
        price: 13,
        inventory: 11
      } ,
      {
        title: 'The Truman Show',
        poster: 'https://m.media-amazon.com/images/M/MV5BMDIzODcyY2EtMmY2MC00ZWVlLTgwMzAtMjQwOWUyNmJjNTYyXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg',
        directors: 'Peter Weir',
        genre: 'Comedy, Drama',
        year: 1998,
        rated: 'PG',
        plot: 'An insurance salesman discovers his whole life is actually a reality TV show.',
        actors: 'Jim Carrey, Ed Harris, Laura Linney',
        price: 13,
        inventory: 13
      } ,
      {
        title: 'A Beautiful Mind',
        poster: 'https://m.media-amazon.com/images/M/MV5BMzcwYWFkYzktZjAzNC00OGY1LWI4YTgtNzc5MzVjMDVmNjY0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        directors: 'Ron Howard',
        genre: 'Biography, Drama',
        year: 2001,
        rated: 'PG-13',
        plot: 'After John Nash, a brilliant but asocial mathematician, accepts secret work in cryptography, his life takes a turn for the nightmarish.',
        actors: 'Russell Crowe, Ed Harris, Jennifer Connelly',
        price: 20,
        inventory: 13
      } ,
      {
        title: 'Monty Python and the Holy Grail',
        poster: 'https://m.media-amazon.com/images/M/MV5BN2IyNTE4YzUtZWU0Mi00MGIwLTgyMmQtMzQ4YzQxYWNlYWE2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Terry Gilliam, Terry Jones',
        genre: 'Adventure, Comedy, Fantasy',
        year: 1975,
        rated: 'PG',
        plot: 'King Arthur and his Knights of the Round Table embark on a surreal, low-budget search for the Holy Grail, encountering many, very silly obstacles.',
        actors: 'Graham Chapman, John Cleese, Eric Idle',
        price: 13,
        inventory: 9
      } ,
      {
        title: 'Yojimbo',
        poster: 'https://m.media-amazon.com/images/M/MV5BZThiZjAzZjgtNDU3MC00YThhLThjYWUtZGRkYjc2ZWZlOTVjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
        directors: 'Akira Kurosawa',
        genre: 'Action, Drama, Thriller',
        year: 1961,
        rated: 'Not Rated',
        plot: 'A crafty ronin comes to a town divided by two criminal gangs and decides to play them against each other to free the town.',
        actors: 'Toshirô Mifune, Eijirô Tôno, Tatsuya Nakadai',
        price: 20,
        inventory: 5
      } ,
      {
        title: 'The Treasure of the Sierra Madre',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTJlZWMxYzEtMjlkMS00ODE0LThlM2ItMDI3NGQ2YjhmMzkxXkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_SX300.jpg',
        directors: 'John Huston',
        genre: 'Adventure, Drama, Western',
        year: 1948,
        rated: 'Passed',
        plot: 'Two down-on-their-luck Americans searching for work in 1920s Mexico convince an old prospector to help them mine for gold in the Sierra Madre Mountains.',
        actors: 'Humphrey Bogart, Walter Huston, Tim Holt',
        price: 29,
        inventory: 10
      } ,
      {
        title: 'Shutter Island',
        poster: 'https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Martin Scorsese',
        genre: 'Mystery, Thriller',
        year: 2010,
        rated: 'R',
        plot: 'In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.',
        actors: 'Leonardo DiCaprio, Emily Mortimer, Mark Ruffalo',
        price: 11,
        inventory: 5
      } ,
      {
        title: 'Jurassic Park',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg',
        directors: 'Steven Spielberg',
        genre: 'Action, Adventure, Sci-Fi',
        year: 1993,
        rated: 'PG-13',
        plot: "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
        actors: 'Sam Neill, Laura Dern, Jeff Goldblum',
        price: 25,
        inventory: 10
      } ,
      {
        title: 'The Great Escape',
        poster: 'https://m.media-amazon.com/images/M/MV5BNzA2NmYxMWUtNzBlMC00MWM2LTkwNmQtYTFlZjQwODNhOWE0XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg',
        directors: 'John Sturges',
        genre: 'Adventure, Drama, History',
        year: 1963,
        rated: 'Approved',
        plot: 'Allied prisoners of war plan for several hundred of their number to escape from a German camp during World War II.',
        actors: 'Steve McQueen, James Garner, Richard Attenborough',
        price: 16,
        inventory: 12
      } ,
      {
        title: 'Rashomon',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjEzMzA4NDE2OF5BMl5BanBnXkFtZTcwNTc5MDI2NQ@@._V1_SX300.jpg',
        directors: 'Akira Kurosawa',
        genre: 'Crime, Drama, Mystery',
        year: 1950,
        rated: 'Not Rated',
        plot: "The assault of a bride and the murder of her samurai husband are recalled from the perspectives of a bandit, the bride, the samurai's ghost and a woodcutter.",
        actors: 'Toshirô Mifune, Machiko Kyô, Masayuki Mori',
        price: 28,
        inventory: 5
      } ,
      {
        title: 'Kill Bill: Vol. 1',
        poster: 'https://m.media-amazon.com/images/M/MV5BNzM3NDFhYTAtYmU5Mi00NGRmLTljYjgtMDkyODQ4MjNkMGY2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Quentin Tarantino',
        genre: 'Action, Crime, Drama',
        year: 2003,
        rated: 'R',
        plot: 'After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her.',
        actors: 'Uma Thurman, David Carradine, Daryl Hannah',
        price: 21,
        inventory: 9
      } ,
      {
        title: 'No Country for Old Men',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjA5Njk3MjM4OV5BMl5BanBnXkFtZTcwMTc5MTE1MQ@@._V1_SX300.jpg',
        directors: 'Ethan Coen, Joel Coen',
        genre: 'Crime, Drama, Thriller',
        year: 2007,
        rated: 'R',
        plot: 'Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.',     
        actors: 'Tommy Lee Jones, Javier Bardem, Josh Brolin',
        price: 28,
        inventory: 12
      } ,
      {
        title: 'Finding Nemo',
        poster: 'https://m.media-amazon.com/images/M/MV5BZTAzNWZlNmUtZDEzYi00ZjA5LWIwYjEtZGM1NWE1MjE4YWRhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Andrew Stanton, Lee Unkrich',
        genre: 'Animation, Adventure, Comedy',
        year: 2003,
        rated: 'G',
        plot: 'After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.',
        actors: 'Albert Brooks, Ellen DeGeneres, Alexander Gould',
        price: 28,
        inventory: 14
      } ,
      {
        title: 'The Elephant Man',
        poster: 'https://m.media-amazon.com/images/M/MV5BMDVjNjIwOGItNDE3Ny00OThjLWE0NzQtZTU3YjMzZTZjMzhkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        directors: 'David Lynch',
        genre: 'Biography, Drama',
        year: 1980,
        rated: 'PG',
        plot: 'A Victorian surgeon rescues a heavily disfigured man who is mistreated while scraping a living as a side-show freak. Behind his monstrous façade, there is revealed a person of kindness, intelligence and sophistication.',
        actors: 'Anthony Hopkins, John Hurt, Anne Bancroft',
        price: 21,
        inventory: 10
      } ,
      {
        title: 'Chinatown',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjJkMDZhYzItZTFhMi00ZGI4LThlNTAtZDNlYmEwNjFkNDYzXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'Roman Polanski',
        genre: 'Drama, Mystery, Thriller',
        year: 1974,
        rated: 'R',
        plot: 'A private detective hired to expose an adulterer in 1930s Los Angeles finds himself caught up in a web of deceit, corruption, and murder.',        
        actors: 'Jack Nicholson, Faye Dunaway, John Huston',
        price: 21,
        inventory: 12
      } ,
      {
        title: 'Raging Bull',
        poster: 'https://m.media-amazon.com/images/M/MV5BYjRmODkzNDItMTNhNi00YjJlLTg0ZjAtODlhZTM0YzgzYThlXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX300.jpg',
        directors: 'Martin Scorsese',
        genre: 'Biography, Drama, Sport',
        year: 1980,
        rated: 'R',
        plot: 'The life of boxer Jake LaMotta, whose violence and temper that led him to the top in the ring destroyed his life outside of it.',
        actors: 'Robert De Niro, Cathy Moriarty, Joe Pesci',
        price: 16,
        inventory: 5
      } ,
      {
        title: 'The Thing',
        poster: 'https://m.media-amazon.com/images/M/MV5BNGViZWZmM2EtNGYzZi00ZDAyLTk3ODMtNzIyZTBjN2Y1NmM1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
        directors: 'John Carpenter',
        genre: 'Horror, Mystery, Sci-Fi',
        year: 1982,
        rated: 'R',
        plot: 'A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.',
        actors: 'Kurt Russell, Wilford Brimley, Keith David',
        price: 22,
        inventory: 14
      } ,
      {
        title: 'Gone with the Wind',
        poster: 'https://m.media-amazon.com/images/M/MV5BYjUyZWZkM2UtMzYxYy00ZmQ3LWFmZTQtOGE2YjBkNjA3YWZlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Victor Fleming, George Cukor, Sam Wood',
        genre: 'Drama, Romance, War',
        year: 1939,
        rated: 'Passed',
        plot: 'The manipulative daughter of a Georgia plantation owner conducts a turbulent romance with a roguish profiteer during the American Civil War and Reconstruction periods.',
        actors: 'Clark Gable, Vivien Leigh, Thomas Mitchell',
        price: 21,
        inventory: 12
      } ,
      {
        title: 'V for Vendetta',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTI5ODc3NzExNV5BMl5BanBnXkFtZTcwNzYxNzQzMw@@._V1_SX300.jpg',
        directors: 'James McTeigue',
        genre: 'Action, Drama, Sci-Fi',
        year: 2006,
        rated: 'R',
        plot: 'In a future British dystopian society, a shadowy freedom fighter, known only by the alias of "V", plots to overthrow the tyrannical government - with the help of a young woman.',
        actors: 'Hugo Weaving, Natalie Portman, Rupert Graves',
        price: 21,
        inventory: 9
      } ,
      {
        title: 'Inside Out',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTgxMDQwMDk0OF5BMl5BanBnXkFtZTgwNjU5OTg2NDE@._V1_SX300.jpg',
        directors: 'Pete Docter, Ronnie Del Carmen',
        genre: 'Animation, Adventure, Comedy',
        year: 2015,
        rated: 'PG',
        plot: 'After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how best to navigate a new city, house, and school.',
        actors: 'Amy Poehler, Bill Hader, Lewis Black',
        price: 22,
        inventory: 12
      } ,
      {
        title: 'Lock, Stock and Two Smoking Barrels',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTAyN2JmZmEtNjAyMy00NzYwLThmY2MtYWQ3OGNhNjExMmM4XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg',
        directors: 'Guy Ritchie',
        genre: 'Action, Comedy, Crime',
        year: 1998,
        rated: 'R',
        plot: 'Eddy persuades his three pals to pool money for a vital poker game against a powerful local mobster, Hatchet Harry. Eddy loses, after which Harry gives him a week to pay back 500,000 pounds.',
        actors: 'Jason Flemyng, Dexter Fletcher, Nick Moran',
        price: 20,
        inventory: 7
      } ,
      {
        title: 'Dial M for Murder',
        poster: 'https://m.media-amazon.com/images/M/MV5BOWIwODIxYWItZDI4MS00YzhhLWE3MmYtMzlhZDIwOTMzZmE5L2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',     
        directors: 'Alfred Hitchcock',
        genre: 'Crime, Thriller',
        year: 1954,
        rated: 'PG',
        plot: 'A former tennis star arranges the murder of his adulterous wife.',
        actors: 'Ray Milland, Grace Kelly, Robert Cummings',
        price: 12,
        inventory: 12
      } ,
      {
        title: 'The Secret in Their Eyes',
        poster: 'https://m.media-amazon.com/images/M/MV5BY2FhZGI5M2QtZWFiZS00NjkwLWE4NWQtMzg3ZDZjNjdkYTJiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Juan José Campanella',
        genre: 'Drama, Mystery, Romance',
        year: 2009,
        rated: 'R',
        plot: 'A retired legal counselor writes a novel hoping to find closure for one of his past unresolved homicide cases and for his unreciprocated love with his superior - both of which still haunt him decades later.',
        actors: 'Ricardo Darín, Soledad Villamil, Pablo Rago',
        price: 20,
        inventory: 12
      } ,
      {
        title: "Howl's Moving Castle",
        poster: 'https://m.media-amazon.com/images/M/MV5BNmM4YTFmMmItMGE3Yy00MmRkLTlmZGEtMzZlOTQzYjk3MzA2XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Hayao Miyazaki',
        genre: 'Animation, Adventure, Family',
        year: 2004,
        rated: 'PG',
        plot: 'When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.',
        actors: 'Chieko Baishô, Takuya Kimura, Tatsuya Gashûin',
        price: 12,
        inventory: 8
      } ,
      {
        title: 'The Bridge on the River Kwai',
        poster: 'https://m.media-amazon.com/images/M/MV5BOGY5NmNlMmQtYzRlYy00NGQ5LWFkYjYtNzExZmQyMTg0ZDA0XkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg',
        directors: 'David Lean',
        genre: 'Adventure, Drama, War',
        year: 1957,
        rated: 'PG',
        plot: 'British POWs are forced to build a railway bridge across the river Kwai for their Japanese captors in occupied Burma, not knowing that the allied forces are planning a daring commando raid through the jungle to destroy it.',
        actors: 'William Holden, Alec Guinness, Jack Hawkins',
        price: 13,
        inventory: 8
      } ,
      {
        title: 'Three Billboards Outside Ebbing, Missouri',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjI0ODcxNzM1N15BMl5BanBnXkFtZTgwMzIwMTEwNDI@._V1_SX300.jpg',
        directors: 'Martin McDonagh',
        genre: 'Comedy, Crime, Drama',
        year: 2017,
        rated: 'R',
        plot: "A mother personally challenges the local authorities to solve her daughter's murder when they fail to catch the culprit.",
        actors: 'Frances McDormand, Woody Harrelson, Sam Rockwell',
        price: 26,
        inventory: 5
      } ,
      {
        title: 'Trainspotting',
        poster: 'https://m.media-amazon.com/images/M/MV5BMzA5Zjc3ZTMtMmU5YS00YTMwLWI4MWUtYTU0YTVmNjVmODZhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Danny Boyle',
        genre: 'Drama',
        year: 1996,
        rated: 'R',
        plot: 'Renton, deeply immersed in the Edinburgh drug scene, tries to clean up and get out, despite the allure of the drugs and influence of friends.',    
        actors: 'Ewan McGregor, Ewen Bremner, Jonny Lee Miller',
        price: 16,
        inventory: 13
      } ,
      {
        title: 'Warrior',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTk4ODk5MTMyNV5BMl5BanBnXkFtZTcwMDMyNTg0Ng@@._V1_SX300.jpg',
        directors: "Gavin O'Connor",
        genre: 'Action, Drama, Sport',
        year: 2011,
        rated: 'PG-13',
        plot: "The youngest son of an alcoholic former boxer returns home, where he's trained by his father for competition in a mixed martial arts tournament - a path that puts the fighter on a collision course with his estranged, older brother.",
        actors: 'Tom Hardy, Nick Nolte, Joel Edgerton',
        price: 27,
        inventory: 7
      } ,
      {
        title: 'Gran Torino',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTc5NTk2OTU1Nl5BMl5BanBnXkFtZTcwMDc3NjAwMg@@._V1_SX300.jpg',
        directors: 'Clint Eastwood',
        genre: 'Drama',
        year: 2008,
        rated: 'R',
        plot: "Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor, Thao Lor, a Hmong teenager who tried to steal Kowalski's prized possession: a 1972 Gran Torino.",
        actors: 'Clint Eastwood, Bee Vang, Christopher Carley',
        price: 15,
        inventory: 11
      } ,
      {
        title: 'Fargo',
        poster: 'https://m.media-amazon.com/images/M/MV5BNDJiZDgyZjctYmRjMS00ZjdkLTkwMTEtNGU1NDg3NDQ0Yzk1XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Joel Coen, Ethan Coen',
        genre: 'Crime, Thriller',
        year: 1996,
        rated: 'R',
        plot: "Minnesota car salesman Jerry Lundegaard's inept crime falls apart due to his and his henchmen's bungling and the persistent police work of the quite pregnant Marge Gunderson.",
        actors: 'William H. Macy, Frances McDormand, Steve Buscemi',
        price: 14,
        inventory: 10
      } ,
      {
        title: 'Everything Everywhere All at Once',
        poster: 'https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_SX300.jpg',
        directors: 'Dan Kwan, Daniel Scheinert',
        genre: 'Action, Adventure, Comedy',
        year: 2022,
        rated: 'R',
        plot: 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.',
        actors: 'Michelle Yeoh, Stephanie Hsu, Ke Huy Quan',
        price: 14,
        inventory: 14
      } ,
      {
        title: 'Prisoners',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTg0NTIzMjQ1NV5BMl5BanBnXkFtZTcwNDc3MzM5OQ@@._V1_SX300.jpg',
        directors: 'Denis Villeneuve',
        genre: 'Crime, Drama, Mystery',
        year: 2013,
        rated: 'R',
        plot: "When Keller Dover's daughter and her friend go missing, he takes matters into his own hands as the police pursue multiple leads and the pressure mounts.",
        actors: 'Hugh Jackman, Jake Gyllenhaal, Viola Davis',
        price: 11,
        inventory: 14
      } ,
      {
        title: 'My Neighbor Totoro',
        poster: 'https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Hayao Miyazaki',
        genre: 'Animation, Comedy, Family',
        year: 1988,
        rated: 'G',
        plot: 'When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby.',        
        actors: 'Hitoshi Takagi, Noriko Hidaka, Chika Sakamoto',
        price: 16,
        inventory: 7
      } ,
      {
        title: 'Million Dollar Baby',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTkxNzA1NDQxOV5BMl5BanBnXkFtZTcwNTkyMTIzMw@@._V1_SX300.jpg',
        directors: 'Clint Eastwood',
        genre: 'Drama, Sport',
        year: 2004,
        rated: 'PG-13',
        plot: 'A determined woman works with a hardened boxing trainer to become a professional.',
        actors: 'Hilary Swank, Clint Eastwood, Morgan Freeman',
        price: 21,
        inventory: 14
      } ,
      {
        title: 'The Gold Rush',
        poster: 'https://m.media-amazon.com/images/M/MV5BZjEyOTE4MzMtNmMzMy00Mzc3LWJlOTQtOGJiNDE0ZmJiOTU4L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',     
        directors: 'Charles Chaplin',
        genre: 'Adventure, Comedy, Drama',
        year: 1925,
        rated: 'Passed',
        plot: 'A prospector goes to the Klondike during the 1890s gold rush in hopes of making his fortune, and is smitten with a girl he sees in a dance hall.', 
        actors: 'Charles Chaplin, Mack Swain, Tom Murray',
        price: 29,
        inventory: 13
      } ,
      {
        title: 'Catch Me If You Can',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTY5MzYzNjc5NV5BMl5BanBnXkFtZTYwNTUyNTc2._V1_SX300.jpg',
        directors: 'Steven Spielberg',
        genre: 'Biography, Crime, Drama',
        year: 2002,
        rated: 'PG-13',
        plot: 'Barely 21 yet, Frank is a skilled forger who has passed as a doctor, lawyer and pilot. FBI agent Carl becomes obsessed with tracking down the con man, who only revels in the pursuit.',
        actors: 'Leonardo DiCaprio, Tom Hanks, Christopher Walken',
        price: 29,
        inventory: 8
      } ,
      {
        title: 'Blade Runner',
        poster: 'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Ridley Scott',
        genre: 'Action, Drama, Sci-Fi',
        year: 1982,
        rated: 'R',
        plot: 'A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.',
        actors: 'Harrison Ford, Rutger Hauer, Sean Young',
        price: 24,
        inventory: 10
      } ,
      {
        title: 'On the Waterfront',
        poster: 'https://m.media-amazon.com/images/M/MV5BY2I0MWFiZDMtNWQyYy00Njk5LTk3MDktZjZjNTNmZmVkYjkxXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
        directors: 'Elia Kazan',
        genre: 'Crime, Drama, Thriller',
        year: 1954,
        rated: 'Approved',
        plot: "An ex-prize fighter turned New Jersey longshoreman struggles to stand up to his corrupt union bosses, including his older brother, as he starts to connect with the grieving sister of one of the syndicate's victims.",
        actors: 'Marlon Brando, Karl Malden, Lee J. Cobb',
        price: 20,
        inventory: 13
      } ,
      {
        title: 'Children of Heaven',
        poster: 'https://m.media-amazon.com/images/M/MV5BZTYwZWQ4ZTQtZWU0MS00N2YwLWEzMDItZWFkZWY0MWVjODVhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Majid Majidi',
        genre: 'Drama, Family, Sport',
        year: 1997,
        rated: 'PG',
        plot: `After a boy loses his sister's pair of shoes, he goes on a series of adventures in order to find them. When he can't, he tries a new way to "win" a new pair.`,
        actors: 'Mohammad Amir Naji, Amir Farrokh Hashemian, Bahare Seddiqi',
        price: 20,
        inventory: 8
      } ,
      {
        title: 'The Third Man',
        poster: 'https://m.media-amazon.com/images/M/MV5BYjE2OTdhMWUtOGJlMy00ZDViLWIzZjgtYjZkZGZmMDZjYmEyXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Carol Reed',
        genre: 'Film-Noir, Mystery, Thriller',
        year: 1949,
        rated: 'Approved',
        plot: 'Pulp novelist Holly Martins travels to shadowy, postwar Vienna, only to find himself investigating the mysterious death of an old friend, Harry Lime.',
        actors: 'Orson Welles, Joseph Cotten, Alida Valli',
        price: 29,
        inventory: 13
      } ,
      {
        title: 'Ben-Hur',
        poster: 'https://m.media-amazon.com/images/M/MV5BNjgxY2JiZDYtZmMwOC00ZmJjLWJmODUtMTNmNWNmYWI5ODkwL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
        directors: 'William Wyler',
        genre: 'Adventure, Drama',
        year: 1959,
        rated: 'G',
        plot: 'After a Jewish prince is betrayed and sent into slavery by a Roman friend in 1st-century Jerusalem, he regains his freedom and comes back for revenge.',
        actors: 'Charlton Heston, Jack Hawkins, Stephen Boyd',
        price: 26,
        inventory: 7
      } ,
      {
        title: 'Before Sunrise',
        poster: 'https://m.media-amazon.com/images/M/MV5BZDdiZTAwYzAtMDI3Ni00OTRjLTkzN2UtMGE3MDMyZmU4NTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Richard Linklater',
        genre: 'Drama, Romance',
        year: 1995,
        rated: 'R',
        plot: 'A young man and woman meet on a train in Europe, and wind up spending one evening together in Vienna. Unfortunately, both know that this will probably be their only night together.',
        actors: 'Ethan Hawke, Julie Delpy, Andrea Eckert',
        price: 11,
        inventory: 6
      } ,
      {
        title: 'Wild Strawberries',
        poster: 'https://m.media-amazon.com/images/M/MV5BYWQxYzdhMDMtNjAyZC00NzE0LWFjYmQtYjk0YzMyYjA5NzZkXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'Ingmar Bergman',
        genre: 'Drama, Romance',
        year: 1957,
        rated: 'Not Rated',
        plot: 'After living a life marked by coldness, an aging professor is forced to confront the emptiness of his existence.',
        actors: 'Victor Sjöström, Bibi Andersson, Ingrid Thulin',
        price: 13,
        inventory: 11
      } ,
      {
        title: '12 Years a Slave',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjExMTEzODkyN15BMl5BanBnXkFtZTcwNTU4NTc4OQ@@._V1_SX300.jpg',
        directors: 'Steve McQueen',
        genre: 'Biography, Drama, History',
        year: 2013,
        rated: 'R',
        plot: 'In the antebellum United States, Solomon Northup, a free black man from upstate New York, is abducted and sold into slavery.',
        actors: 'Chiwetel Ejiofor, Michael Kenneth Williams, Michael Fassbender',
        price: 14,
        inventory: 10
      } ,
      {
        title: 'The General',
        poster: 'https://m.media-amazon.com/images/M/MV5BYmRiMDFlYjYtOTMwYy00OGY2LWE0Y2QtYzQxOGNhZmUwNTIxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Clyde Bruckman, Buster Keaton',
        genre: 'Action, Adventure, Comedy',
        year: 1926,
        rated: 'Passed',
        plot: 'After being rejected by the Confederate military, not realizing it was due to his crucial civilian role, an engineer must single-handedly recapture his beloved locomotive after it is seized by Union spies and return it through ene...',
        actors: 'Buster Keaton, Marion Mack, Glen Cavender',
        price: 12,
        inventory: 5
      } ,
      {
        title: 'Gone Girl',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTk0MDQ3MzAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_SX300.jpg',
        directors: 'David Fincher',
        genre: 'Drama, Mystery, Thriller',
        year: 2014,
        rated: 'R',
        plot: "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
        actors: 'Ben Affleck, Rosamund Pike, Neil Patrick Harris',
        price: 19,
        inventory: 13
      } ,
      {
        title: 'Harry Potter and the Deathly Hallows: Part 2',
        poster: 'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
        directors: 'David Yates',
        genre: 'Adventure, Fantasy, Mystery',
        year: 2011,
        rated: 'PG-13',
        plot: "Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.",
        actors: 'Daniel Radcliffe, Emma Watson, Rupert Grint',
        price: 27,
        inventory: 12
      } ,
      {
        title: 'The Deer Hunter',
        poster: 'https://m.media-amazon.com/images/M/MV5BNDhmNTA0ZDMtYjhkNS00NzEzLWIzYTItOGNkMTVmYjE2YmI3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Michael Cimino',
        genre: 'Drama, War',
        year: 1978,
        rated: 'R',
        plot: 'An in-depth examination of the ways in which the Vietnam War impacts and disrupts the lives of several friends in a small steel mill town in Pennsylvania.',
        actors: 'Robert De Niro, Christopher Walken, John Cazale',
        price: 18,
        inventory: 13
      } ,
      {
        title: 'In the Name of the Father',
        poster: 'https://m.media-amazon.com/images/M/MV5BMmYyOTgwYWItYmU3Ny00M2E2LTk0NWMtMDVlNmQ0MWZiMTMxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Jim Sheridan',
        genre: 'Biography, Crime, Drama',
        year: 1993,
        rated: 'R',
        plot: "A man's coerced confession to an I.R.A. bombing he did not commit results in the imprisonment of his father as well. An English lawyer fights to free them.",
        actors: 'Daniel Day-Lewis, Pete Postlethwaite, Alison Crosbie',
        price: 21,
        inventory: 13
      } ,
      {
        title: 'The Grand Budapest Hotel',
        poster: 'https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_SX300.jpg',
        directors: 'Wes Anderson',
        genre: 'Adventure, Comedy, Crime',
        year: 2014,
        rated: 'R',
        plot: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
        actors: 'Ralph Fiennes, F. Murray Abraham, Mathieu Amalric',
        price: 26,
        inventory: 8
      } ,
      {
        title: 'Mr. Smith Goes to Washington',
        poster: 'https://m.media-amazon.com/images/M/MV5BZTYwYjYxYzgtMDE1Ni00NzU4LWJlMTEtODQ5YmJmMGJhZjI5L2ltYWdlXkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_SX300.jpg',     
        directors: 'Frank Capra',
        genre: 'Comedy, Drama',
        year: 1939,
        rated: 'Passed',
        plot: 'A naive youth leader is appointed to fill a vacancy in the U.S. Senate. His idealistic plans promptly collide with corruption at home and subterfuge from his hero in Washington, but he tries to forge ahead despite attacks on his c...',
        actors: 'James Stewart, Jean Arthur, Claude Rains',
        price: 17,
        inventory: 12
      } ,
      {
        title: 'The Wages of Fear',
        poster: 'https://m.media-amazon.com/images/M/MV5BZDdkNzMwZmUtY2Q5MS00ZmM2LWJhYjItYTBjMWY0MGM4MDRjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
        directors: 'Henri-Georges Clouzot',
        genre: 'Adventure, Drama, Thriller',
        year: 1953,
        rated: 'Not Rated',
        plot: 'In a decrepit South American village, four men are hired to transport an urgent nitroglycerine shipment without the equipment that would make it safe.',
        actors: 'Yves Montand, Charles Vanel, Peter van Eyck',
        price: 18,
        inventory: 6
      } ,
      {
        title: 'Barry Lyndon',
        poster: 'https://m.media-amazon.com/images/M/MV5BNmY0MWY2NDctZDdmMi00MjA1LTk0ZTQtZDMyZTQ1NTNlYzVjXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'Stanley Kubrick',
        genre: 'Adventure, Drama, War',
        year: 1975,
        rated: 'PG',
        plot: "An Irish rogue wins the heart of a rich widow and assumes her dead husband's aristocratic position in 18th-century England.",
        actors: "Ryan O'Neal, Marisa Berenson, Patrick Magee",
        price: 13,
        inventory: 10
      } ,
      {
        title: 'Sherlock Jr.',
        poster: 'https://m.media-amazon.com/images/M/MV5BZWFhOGU5NDctY2Q3YS00Y2VlLWI1NzEtZmIwY2ZiZjY4OTA2XkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_SX300.jpg',
        directors: 'Buster Keaton',
        genre: 'Action, Comedy, Romance',
        year: 1924,
        rated: 'Passed',
        plot: "A film projectionist longs to be a detective, and puts his meagre skills to work when he is framed by a rival for stealing his girlfriend's father's pocketwatch.",
        actors: 'Buster Keaton, Kathryn McGuire, Joe Keaton',
        price: 14,
        inventory: 10
      } ,
      {
        title: 'Memories of Murder',
        poster: 'https://m.media-amazon.com/images/M/MV5BOGViNTg4YTktYTQ2Ni00MTU0LTk2NWUtMTI4OTc1YTM0NzQ2XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg',
        directors: 'Bong Joon Ho',
        genre: 'Crime, Drama, Mystery',
        year: 2003,
        rated: 'Not Rated',
        plot: 'In a small Korean province in 1986, two detectives struggle with the case of multiple young women being found sexually assaulted and murdered by an unknown culprit.',
        actors: 'Song Kang-ho, Kim Sang-kyung, Roe-ha Kim',
        price: 10,
        inventory: 12
      } ,
      {
        title: 'Hacksaw Ridge',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjQ1NjM3MTUxNV5BMl5BanBnXkFtZTgwMDc5MTY5OTE@._V1_SX300.jpg',
        directors: 'Mel Gibson',
        genre: 'Biography, Drama, History',
        year: 2016,
        rated: 'R',
        plot: 'World War II American Army Medic Desmond T. Doss, who served during the Battle of Okinawa, refuses to kill people and becomes the first man in American history to receive the Medal of Honor without firing a shot.',
        actors: 'Andrew Garfield, Sam Worthington, Luke Bracey',
        price: 23,
        inventory: 6
      } ,
      {
        title: 'Klaus',
        poster: 'https://m.media-amazon.com/images/M/MV5BMWYwOThjM2ItZGYxNy00NTQwLWFlZWEtM2MzM2Q5MmY3NDU5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
        directors: 'Sergio Pablos, Carlos Martínez López',
        genre: 'Animation, Adventure, Comedy',
        year: 2019,
        rated: 'PG',
        plot: "A simple act of kindness always sparks another, even in a frozen, faraway place. When Smeerensburg's new postman, Jesper, befriends toymaker Klaus, their gifts melt an age-old feud and deliver a sleigh full of holiday traditions.",
        actors: 'Jason Schwartzman, J.K. Simmons, Rashida Jones',
        price: 12,
        inventory: 5
      } ,
      {
        title: 'The Seventh Seal',
        poster: 'https://m.media-amazon.com/images/M/MV5BM2I1ZWU4YjMtYzU0My00YmMzLWFmNTAtZDJhZGYwMmI3YWQ5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Ingmar Bergman',
        genre: 'Drama, Fantasy',
        year: 1957,
        rated: 'Not Rated',
        plot: 'A knight returning to Sweden after the Crusades seeks answers about life, death, and the existence of God as he plays chess against the Grim Reaper during the Black Plague.',
        actors: 'Max von Sydow, Gunnar Björnstrand, Bengt Ekerot',
        price: 12,
        inventory: 8
      } ,
      {
        title: 'Wild Tales',
        poster: 'https://m.media-amazon.com/images/M/MV5BNGQzY2Y0MTgtMDA4OC00NjM3LWI0ZGQtNTJlM2UxZDQxZjI0XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg',
        directors: 'Damián Szifron',
        genre: 'Comedy, Drama, Thriller',
        year: 2014,
        rated: 'R',
        plot: 'Six short stories that explore the extremities of human behavior involving people in distress.',
        actors: 'Darío Grandinetti, María Marull, Mónica Villa',
        price: 29,
        inventory: 11
      } ,
      {
        title: 'Room',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjE4NzgzNzEwMl5BMl5BanBnXkFtZTgwMTMzMDE0NjE@._V1_SX300.jpg',
        directors: 'Lenny Abrahamson',
        genre: 'Drama, Thriller',
        year: 2015,
        rated: 'R',
        plot: 'Held captive for 7 years in an enclosed space, a woman and her young son finally gain their freedom, allowing the boy to experience the outside world for the first time.',
        actors: 'Brie Larson, Jacob Tremblay, Sean Bridgers',
        price: 21,
        inventory: 8
      } ,
      {
        title: 'Mad Max: Fury Road',
        poster: 'https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'George Miller',
        genre: 'Action, Adventure, Sci-Fi',
        year: 2015,
        rated: 'R',
        plot: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.',
        actors: 'Tom Hardy, Charlize Theron, Nicholas Hoult',
        price: 26,
        inventory: 10
      } ,
      {
        title: 'How to Train Your Dragon',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjA5NDQyMjc2NF5BMl5BanBnXkFtZTcwMjg5ODcyMw@@._V1_SX300.jpg',
        directors: 'Dean DeBlois, Chris Sanders',
        genre: 'Animation, Action, Adventure',
        year: 2010,
        rated: 'PG',
        plot: 'A hapless young Viking who aspires to hunt dragons becomes the unlikely friend of a young dragon himself, and learns there may be more to the creatures than he assumed.',
        actors: 'Jay Baruchel, Gerard Butler, Christopher Mintz-Plasse',
        price: 21,
        inventory: 7
      } ,
      {
        title: 'The Big Lebowski',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTQ0NjUzMDMyOF5BMl5BanBnXkFtZTgwODA1OTU0MDE@._V1_SX300.jpg',
        directors: 'Joel Coen, Ethan Coen',
        genre: 'Comedy, Crime',
        year: 1998,
        rated: 'R',
        plot: `Ultimate L.A. slacker Jeff "The Dude" Lebowski, mistaken for a millionaire of the same name, seeks restitution for a rug ruined by debt collectors, enlisting his bowling buddies for help while trying to find the millionaire's miss...`,
        actors: 'Jeff Bridges, John Goodman, Julianne Moore',
        price: 29,
        inventory: 14
      } ,
      {
        title: 'Mary and Max',
        poster: 'https://m.media-amazon.com/images/M/MV5BMDgzYjQwMDMtNGUzYi00MTRmLWIyMGMtNjE1OGZkNzY2YWIzL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',     
        directors: 'Adam Elliot',
        genre: 'Animation, Comedy, Drama',
        year: 2009,
        rated: 'Not Rated',
        plot: 'A tale of friendship between two unlikely pen pals: Mary, a lonely, eight-year-old girl living in the suburbs of Melbourne, and Max, a forty-four-year old, severely obese man living in New York.',
        actors: 'Toni Collette, Philip Seymour Hoffman, Eric Bana',
        price: 28,
        inventory: 13
      } ,
      {
        title: 'Monsters, Inc.',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTY1NTI0ODUyOF5BMl5BanBnXkFtZTgwNTEyNjQ0MDE@._V1_SX300.jpg',
        directors: 'Pete Docter, David Silverman, Lee Unkrich',
        genre: 'Animation, Adventure, Comedy',
        year: 2001,
        rated: 'G',
        plot: 'In order to power the city, monsters have to scare children so that they scream. However, the children are toxic to the monsters, and after a child gets through, two monsters realize things may not be what they think.',
        actors: 'Billy Crystal, John Goodman, Mary Gibbs',
        price: 15,
        inventory: 11
      } ,
      {
        title: 'Jaws',
        poster: 'https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
        directors: 'Steven Spielberg',
        genre: 'Adventure, Thriller',
        year: 1975,
        rated: 'PG',
        plot: "When a killer shark unleashes chaos on a beach community off Cape Cod, it's up to a local sheriff, a marine biologist, and an old seafarer to hunt the beast down.",
        actors: 'Roy Scheider, Robert Shaw, Richard Dreyfuss',
        price: 17,
        inventory: 10
      } ,
      {
        title: 'The Passion of Joan of Arc',
        poster: 'https://m.media-amazon.com/images/M/MV5BNjBjNDJiYTUtOWY0OS00OGVmLTg2YzctMTE0NzVhODM1ZWJmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Carl Theodor Dreyer',
        genre: 'Biography, Drama, History',
        year: 1928,
        rated: 'Passed',
        plot: "In 1431, Jeanne d'Arc is placed on trial on charges of heresy. The ecclesiastical jurists attempt to force Jeanne to recant her claims of holy visions.",
        actors: 'Maria Falconetti, Eugene Silvain, André Berley',
        price: 16,
        inventory: 5
      } ,
      {
        title: 'Tokyo Story',
        poster: 'https://m.media-amazon.com/images/M/MV5BYWQ4ZTRiODktNjAzZC00Nzg1LTk1YWQtNDFmNDI0NmZiNGIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'Yasujirô Ozu',
        genre: 'Drama',
        year: 1953,
        rated: 'Not Rated',
        plot: 'An old couple visit their children and grandchildren in the city, but receive little attention.',
        actors: 'Chishû Ryû, Chieko Higashiyama, Sô Yamamura',
        price: 22,
        inventory: 13
      } ,
      {
        title: 'Dead Poets Society',
        poster: 'https://m.media-amazon.com/images/M/MV5BOGYwYWNjMzgtNGU4ZC00NWQ2LWEwZjUtMzE1Zjc3NjY3YTU1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        directors: 'Peter Weir',
        genre: 'Comedy, Drama',
        year: 1989,
        rated: 'PG',
        plot: 'Maverick teacher John Keating uses poetry to embolden his boarding school students to new heights of self-expression.',
        actors: 'Robin Williams, Robert Sean Leonard, Ethan Hawke',
        price: 21,
        inventory: 6
      } ,
      {
        title: 'Hotel Rwanda',
        poster: 'https://m.media-amazon.com/images/M/MV5BZGJjYmIzZmQtNWE4Yy00ZGVmLWJkZGEtMzUzNmQ4ZWFlMjRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Terry George',
        genre: 'Biography, Drama, History',
        year: 2004,
        rated: 'PG-13',
        plot: 'Paul Rusesabagina, a hotel manager, houses over a thousand Tutsi refugees during their struggle against the Hutu militia in Rwanda, Africa.',      
        actors: 'Don Cheadle, Sophie Okonedo, Joaquin Phoenix',
        price: 19,
        inventory: 5
      } ,
      {
        title: 'Rocky',
        poster: 'https://m.media-amazon.com/images/M/MV5BNTBkMjg2MjYtYTZjOS00ODQ0LTg0MDEtM2FiNmJmOGU1NGEwXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'John G. Avildsen',
        genre: 'Drama, Sport',
        year: 1976,
        rated: 'PG',
        plot: 'A small-time Philadelphia boxer gets a supremely rare chance to fight the world heavyweight champion in a bout in which he strives to go the distance for his self-respect.',
        actors: 'Sylvester Stallone, Talia Shire, Burt Young',
        price: 14,
        inventory: 9
      } ,
      {
        title: 'Platoon',
        poster: 'https://m.media-amazon.com/images/M/MV5BMzRjZjdlMjQtODVkYS00N2YzLWJlYWYtMGVlN2E5MWEwMWQzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        directors: 'Oliver Stone',
        genre: 'Drama, War',
        year: 1986,
        rated: 'R',
        plot: 'Chris Taylor, a neophyte recruit in Vietnam, finds himself caught in a battle of wills between two sergeants, one good and the other evil. A shrewd examination of the brutality of war and the duality of man in conflict.',
        actors: 'Charlie Sheen, Tom Berenger, Willem Dafoe',
        price: 13,
        inventory: 10
      } ,
      {
        title: 'Ford v Ferrari',
        poster: 'https://m.media-amazon.com/images/M/MV5BM2UwMDVmMDItM2I2Yi00NGZmLTk4ZTUtY2JjNTQ3OGQ5ZjM2XkEyXkFqcGdeQXVyMTA1OTYzOTUx._V1_SX300.jpg',
        directors: 'James Mangold',
        genre: 'Action, Biography, Drama',
        year: 2019,
        rated: 'PG-13',
        plot: 'American car designer Carroll Shelby and driver Ken Miles battle corporate interference and the laws of physics to build a revolutionary race car for Ford in order to defeat Ferrari at the 24 Hours of Le Mans in 1966.',
        actors: 'Matt Damon, Christian Bale, Jon Bernthal',
        price: 10,
        inventory: 13
      } ,
      {
        title: 'Pather Panchali',
        poster: 'https://m.media-amazon.com/images/M/MV5BMmFkNDY5OTktNzY3Yy00OTFlLThhNjktOTRhMmZjZmIxYjAxXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_SX300.jpg',
        directors: 'Satyajit Ray',
        genre: 'Drama',
        year: 1955,
        rated: 'Not Rated',
        plot: 'Impoverished priest Harihar Ray, dreaming of a better life for himself and his family, leaves his rural Bengal village in search of work.',        
        actors: 'Kanu Bannerjee, Karuna Bannerjee, Subir Banerjee',
        price: 11,
        inventory: 10
      } ,
      {
        title: 'Stand by Me',
        poster: 'https://m.media-amazon.com/images/M/MV5BODJmY2Y2OGQtMDg2My00N2Q3LWJmZTUtYTc2ODBjZDVlNDlhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        directors: 'Rob Reiner',
        genre: 'Adventure, Drama',
        year: 1986,
        rated: 'R',
        plot: 'After the death of one of his friends, a writer recounts a childhood journey with his friends to find the body of a missing boy.',
        actors: 'Wil Wheaton, River Phoenix, Corey Feldman',
        price: 22,
        inventory: 11
      } ,
      {
        title: 'The Terminator',
        poster: 'https://m.media-amazon.com/images/M/MV5BYTViNzMxZjEtZGEwNy00MDNiLWIzNGQtZDY2MjQ1OWViZjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        directors: 'James Cameron',
        genre: 'Action, Sci-Fi',
        year: 1984,
        rated: 'R',
        plot: "A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future salvat...",
        actors: 'Arnold Schwarzenegger, Linda Hamilton, Michael Biehn',
        price: 29,
        inventory: 11
      } ,
      {
        title: 'Spotlight',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjIyOTM5OTIzNV5BMl5BanBnXkFtZTgwMDkzODE2NjE@._V1_SX300.jpg',
        directors: 'Tom McCarthy',
        genre: 'Biography, Crime, Drama',
        year: 2015,
        rated: 'R',
        plot: 'The true story of how the Boston Globe uncovered the massive scandal of child molestation and cover-up within the local Catholic Archdiocese, shaking the entire Catholic Church to its core.',
        actors: 'Mark Ruffalo, Michael Keaton, Rachel McAdams',
        price: 19,
        inventory: 6
      } ,
      {
        title: 'Rush',
        poster: 'https://m.media-amazon.com/images/M/MV5BOWEwODJmZDItYTNmZC00OGM4LThlNDktOTQzZjIzMGQxODA4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Ron Howard',
        genre: 'Action, Biography, Drama',
        year: 2013,
        rated: 'R',
        plot: 'The merciless 1970s rivalry between Formula One rivals James Hunt and Niki Lauda.',
        actors: 'Daniel Brühl, Chris Hemsworth, Olivia Wilde',
        price: 24,
        inventory: 14
      } ,
      {
        title: 'Network',
        poster: 'https://m.media-amazon.com/images/M/MV5BNzY0NjU5ODUtOTAzMC00NTU5LWJkZjctYWMyOWY2MTZmOWM1XkEyXkFqcGdeQXVyMTI3ODAyMzE2._V1_SX300.jpg',
        directors: 'Sidney Lumet',
        genre: 'Drama',
        year: 1976,
        rated: 'R',
        plot: "A television network cynically exploits a deranged former anchor's ravings and revelations about the news media for its own profit, but finds that his message may be difficult to control.",
        actors: 'Faye Dunaway, William Holden, Peter Finch',
        price: 24,
        inventory: 12
      } ,
      {
        title: 'Logan',
        poster: 'https://m.media-amazon.com/images/M/MV5BYzc5MTU4N2EtYTkyMi00NjdhLTg3NWEtMTY4OTEyMzJhZTAzXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
        directors: 'James Mangold',
        genre: 'Action, Drama, Sci-Fi',
        year: 2017,
        rated: 'R',
        plot: 'In a future where mutants are nearly extinct, an elderly and weary Logan leads a quiet life. But when Laura, a mutant child pursued by scientists, comes to him for help, he must get her to safety.',
        actors: 'Hugh Jackman, Patrick Stewart, Dafne Keen',
        price: 17,
        inventory: 5
      } ,
      {
        title: 'Into the Wild',
        poster: 'https://m.media-amazon.com/images/M/MV5BNjQ0ODlhMWUtNmUwMS00YjExLWI4MjQtNjVmMmE2Y2E0MGRmXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg',
        directors: 'Sean Penn',
        genre: 'Adventure, Biography, Drama',
        year: 2007,
        rated: 'R',
        plot: 'After graduating from Emory University, top student and athlete Christopher McCandless abandons his possessions, gives his entire $24,000 savings account to charity and hitchhikes to Alaska to live in the wilderness. Along the way...',
        actors: 'Emile Hirsch, Vince Vaughn, Catherine Keener',
        price: 18,
        inventory: 6
      } ,
      {
        title: 'The Wizard of Oz',
        poster: 'https://m.media-amazon.com/images/M/MV5BNjUyMTc4MDExMV5BMl5BanBnXkFtZTgwNDg0NDIwMjE@._V1_SX300.jpg',
        directors: 'Victor Fleming, George Cukor, Mervyn LeRoy',
        genre: 'Adventure, Family, Fantasy',
        year: 1939,
        rated: 'G',
        plot: "Young Dorothy Gale and her dog are swept away by a tornado from their Kansas farm to the magical Land of Oz, and embark on a quest with three new friends to see the Wizard, who can return her to her home and fulfill the others' wi...",
        actors: 'Judy Garland, Frank Morgan, Ray Bolger',
        price: 24,
        inventory: 8
      } ,
      {
        title: 'Ratatouille',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_SX300.jpg',
        directors: 'Brad Bird, Jan Pinkava',
        genre: 'Animation, Adventure, Comedy',
        year: 2007,
        rated: 'G',
        plot: 'A rat who can cook makes an unusual alliance with a young kitchen worker at a famous Paris restaurant.',
        actors: 'Brad Garrett, Lou Romano, Patton Oswalt',
        price: 14,
        inventory: 10
      } ,
      {
        title: 'Groundhog Day',
        poster: 'https://m.media-amazon.com/images/M/MV5BZWIxNzM5YzQtY2FmMS00Yjc3LWI1ZjUtNGVjMjMzZTIxZTIxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Harold Ramis',
        genre: 'Comedy, Drama, Fantasy',
        year: 1993,
        rated: 'PG',
        plot: 'A narcissistic, self-centered weatherman finds himself in a time loop on Groundhog Day, and the day keeps repeating until he gets it right.',      
        actors: 'Bill Murray, Andie MacDowell, Chris Elliott',
        price: 16,
        inventory: 11
      } ,
      {
        title: 'Before Sunset',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTQ1MjAwNTM5Ml5BMl5BanBnXkFtZTYwNDM0MTc3._V1_SX300.jpg',
        directors: 'Richard Linklater',
        genre: 'Drama, Romance',
        year: 2004,
        rated: 'R',
        plot: "Nine years after Jesse and Celine first met, they encounter each other again on the French leg of Jesse's book tour.",
        actors: 'Ethan Hawke, Julie Delpy, Vernon Dobtcheff',
        price: 26,
        inventory: 8
      } ,
      {
        title: 'The Exorcist',
        poster: 'https://m.media-amazon.com/images/M/MV5BYWFlZGY2NDktY2ZjOS00ZWNkLTg0ZDAtZDY4MTM1ODU4ZjljXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'William Friedkin',
        genre: 'Horror',
        year: 1973,
        rated: 'R',
        plot: 'When a 12-year-old girl is possessed by a mysterious entity, her mother seeks the help of two priests to save her.',
        actors: 'Ellen Burstyn, Max von Sydow, Linda Blair',
        price: 13,
        inventory: 12
      } ,
      {
        title: 'The Best Years of Our Lives',
        poster: 'https://m.media-amazon.com/images/M/MV5BY2RmNTRjYzctODI4Ni00MzQyLWEyNTAtNjU0N2JkMTNhNjJkXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'William Wyler',
        genre: 'Drama, Romance, War',
        year: 1946,
        rated: 'Approved',
        plot: 'Three World War II veterans, two of them traumatized or disabled, return home to the American midwest to discover that they and their families have been irreparably changed.',
        actors: 'Myrna Loy, Dana Andrews, Fredric March',
        price: 24,
        inventory: 12
      } ,
      {
        title: 'The Incredibles',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTY5OTU0OTc2NV5BMl5BanBnXkFtZTcwMzU4MDcyMQ@@._V1_SX300.jpg',
        directors: 'Brad Bird',
        genre: 'Animation, Action, Adventure',
        year: 2004,
        rated: 'PG',
        plot: 'While trying to lead a quiet suburban life, a family of undercover superheroes are forced into action to save the world.',
        actors: 'Craig T. Nelson, Samuel L. Jackson, Holly Hunter',
        price: 10,
        inventory: 12
      } ,
      {
        title: 'To Be or Not to Be',
        poster: 'https://m.media-amazon.com/images/M/MV5BODZlOGI5ZjYtN2UwNy00OGY0LTgxY2UtNDZhMzBkN2EyZmIyXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_SX300.jpg',
        directors: 'Ernst Lubitsch',
        genre: 'Comedy, Romance, War',
        year: 1942,
        rated: 'Passed',
        plot: "During the Nazi occupation of Poland, an acting troupe becomes embroiled in a Polish soldier's efforts to track down a German spy.",
        actors: 'Carole Lombard, Jack Benny, Robert Stack',
        price: 15,
        inventory: 11
      } ,
      {
        title: 'The Grapes of Wrath',
        poster: 'https://m.media-amazon.com/images/M/MV5BNzJiOGI2MjctYjUyMS00ZjkzLWE2ZmUtOTg4NTZkOTNhZDc1L2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',     
        directors: 'John Ford',
        genre: 'Drama',
        year: 1940,
        rated: 'Passed',
        plot: 'An Oklahoma family, driven off their farm by the poverty and hopelessness of the Dust Bowl, joins the westward migration to California, suffering the misfortunes of the homeless in the Great Depression.',
        actors: 'Henry Fonda, Jane Darwell, John Carradine',
        price: 13,
        inventory: 5
      } ,
      {
        title: 'The Battle of Algiers',
        poster: 'https://m.media-amazon.com/images/M/MV5BN2M4YTA4ZTEtN2EyNy00YTlmLWE4YzYtYjYyYjRkMWM4ZDM0XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'Gillo Pontecorvo',
        genre: 'Drama, War',
        year: 1966,
        rated: 'Not Rated',
        plot: 'In the 1950s, fear and violence escalate as the people of Algiers fight for independence from the French government.',
        actors: 'Brahim Hadjadj, Jean Martin, Yacef Saadi',
        price: 26,
        inventory: 5
      } ,
      {
        title: 'Rebecca',
        poster: 'https://m.media-amazon.com/images/M/MV5BYTcxYWExOTMtMWFmYy00ZjgzLWI0YjktNWEzYzJkZTg0NDdmL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',     
        directors: 'Alfred Hitchcock',
        genre: 'Drama, Film-Noir, Mystery',
        year: 1940,
        rated: 'Approved',
        plot: "A self-conscious woman juggles adjusting to her new role as an aristocrat's wife and avoiding being intimidated by his first wife's spectral presence.",
        actors: 'Laurence Olivier, Joan Fontaine, George Sanders',
        price: 16,
        inventory: 14
      } ,
      {
        title: "Hachi: A Dog's Tale",
        poster: 'https://m.media-amazon.com/images/M/MV5BNzE4NDg5OWMtMzg3NC00ZDRjLTllMDMtZTRjNWZmNjBmMGZlXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Lasse Hallström',
        genre: 'Biography, Drama, Family',
        year: 2009,
        rated: 'G',
        plot: 'A college professor bonds with an abandoned dog he takes into his home.',
        actors: 'Richard Gere, Joan Allen, Cary-Hiroyuki Tagawa',
        price: 19,
        inventory: 13
      } ,
      {
        title: 'Cool Hand Luke',
        poster: 'https://m.media-amazon.com/images/M/MV5BOWFlNzZhYmYtYTI5YS00MDQyLWIyNTUtNTRjMWUwNTEzNjA0XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg',
        directors: 'Stuart Rosenberg',
        genre: 'Crime, Drama',
        year: 1967,
        rated: 'GP',
        plot: 'A laid back Southern man is sentenced to two years in a rural prison, but refuses to conform.',
        actors: 'Paul Newman, George Kennedy, Strother Martin',
        price: 12,
        inventory: 5
      } ,
      {
        title: 'Amores perros',
        poster: 'https://m.media-amazon.com/images/M/MV5BZjUxNmEwOGItMTBmYi00MWQ1LWExY2MtNDUxMjI0OWM4M2NiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'Alejandro G. Iñárritu',
        genre: 'Drama, Thriller',
        year: 2000,
        rated: 'R',
        plot: "A horrific car accident connects three stories, each involving characters dealing with loss, regret, and life's harsh realities, all in the name of love.",
        actors: 'Emilio Echevarría, Gael García Bernal, Goya Toledo',
        price: 14,
        inventory: 14
      } ,
      {
        title: 'Pirates of the Caribbean: The Curse of the Black Pearl',
        poster: 'https://m.media-amazon.com/images/M/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Gore Verbinski',
        genre: 'Action, Adventure, Fantasy',
        year: 2003,
        rated: 'PG-13',
        plot: `Blacksmith Will Turner teams up with eccentric pirate "Captain" Jack Sparrow to save his love, the governor's daughter, from Jack's former pirate allies, who are now undead.`,
        actors: 'Johnny Depp, Geoffrey Rush, Orlando Bloom',
        price: 10,
        inventory: 8
      } ,
      {
        title: 'La Haine',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTQxOGU0OWUtMzExYy00ZjIxLWJmMzAtNTI1Y2YxYTMxN2RkXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'Mathieu Kassovitz',
        genre: 'Crime, Drama',
        year: 1995,
        rated: 'Not Rated',
        plot: '24 hours in the lives of three young men in the French suburbs the day after a violent riot.',
        actors: 'Vincent Cassel, Hubert Koundé, Saïd Taghmaoui',
        price: 21,
        inventory: 12
      } ,
      {
        title: 'The 400 Blows',
        poster: 'https://m.media-amazon.com/images/M/MV5BYTQ4MjA4NmYtYjRhNi00MTEwLTg0NjgtNjk3ODJlZGU4NjRkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'François Truffaut',
        genre: 'Crime, Drama',
        year: 1959,
        rated: 'Not Rated',
        plot: 'A young boy, left without attention, delves into a life of petty crime.',
        actors: 'Jean-Pierre Léaud, Albert Rémy, Claire Maurier',
        price: 13,
        inventory: 8
      } ,
      {
        title: 'My Father and My Son',
        poster: 'https://m.media-amazon.com/images/M/MV5BNjAzMzEwYzctNjc1MC00Nzg5LWFmMGItMTgzYmMyNTY2OTQ4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        directors: 'Cagan Irmak',
        genre: 'Drama, Family',
        year: 2005,
        rated: 'Not Rated',
        plot: 'The family of a left-wing journalist is torn apart after the military coup of Turkey in 1980.',
        actors: 'Çetin Tekindor, Fikret Kuskan, Hümeyra',
        price: 11,
        inventory: 12
      } ,
      {
        title: 'Persona',
        poster: 'https://m.media-amazon.com/images/M/MV5BYmFlOTcxMWUtZTMzMi00NWIyLTkwOTEtNjIxNmViNzc2Yzc1XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'Ingmar Bergman',
        genre: 'Drama, Thriller',
        year: 1966,
        rated: 'Not Rated',
        plot: 'A nurse is put in charge of a mute actress and finds that their personae are melding together.',
        actors: 'Bibi Andersson, Liv Ullmann, Margaretha Krook',
        price: 13,
        inventory: 8
      } ,
      {
        title: 'It Happened One Night',
        poster: 'https://m.media-amazon.com/images/M/MV5BYzJmMWE5NjAtNWMyZS00NmFiLWIwMDgtZDE2NzczYWFhNzIzXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
        directors: 'Frank Capra',
        genre: 'Comedy, Romance',
        year: 1934,
        rated: 'Passed',
        plot: 'A renegade reporter trailing a young runaway heiress for a big story joins her on a bus heading from Florida to New York, and they end up stuck with each other when the bus leaves them behind at one of the stops.',
        actors: 'Clark Gable, Claudette Colbert, Walter Connolly',
        price: 25,
        inventory: 12
      } ,
      {
        title: 'Life of Brian',
        poster: 'https://m.media-amazon.com/images/M/MV5BMDA1ZWI4ZDItOTRlYi00OTUxLWFlNWQtMzM5NDI0YjA4ZGI2XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        directors: 'Terry Jones',
        genre: 'Comedy',
        year: 1979,
        rated: 'R',
        plot: 'Born on the original Christmas in the stable next door to Jesus Christ, Brian of Nazareth spends his life being mistaken for a messiah.',
        actors: 'Graham Chapman, John Cleese, Michael Palin',
        price: 22,
        inventory: 9
      } ,
      {
        title: 'The Sound of Music',
        poster: 'https://m.media-amazon.com/images/M/MV5BODIxNjhkYjEtYzUyMi00YTNjLWE1YjktNjAyY2I2MWNkNmNmL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        directors: 'Robert Wise',
        genre: 'Biography, Drama, Family',
        year: 1965,
        rated: 'G',
        plot: 'A young novitiate is sent by her convent in 1930s Austria to become a governess to the seven children of a widowed naval officer.',
        actors: 'Julie Andrews, Christopher Plummer, Eleanor Parker',
        price: 27,
        inventory: 13
      } ,
      {
        title: 'The Handmaiden',
        poster: 'https://m.media-amazon.com/images/M/MV5BNDJhYTk2MTctZmVmOS00OTViLTgxNjQtMzQxOTRiMDdmNGRjXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        directors: 'Park Chan-wook',
        genre: 'Drama, Romance, Thriller',
        year: 2016,
        rated: 'Not Rated',
        plot: 'A woman is hired as a handmaiden to a Japanese heiress, but secretly she is involved in a plot to defraud her.',
        actors: 'Kim Min-hee, Ha Jung-woo, Cho Jin-woong',
        price: 16,
        inventory: 9
      } ,
      {
        title: 'Dersu Uzala',
        poster: 'https://m.media-amazon.com/images/M/MV5BYWY0OWJlZTgtMWUzNy00MGJhLTk5YzQtNmY5MDEwOTIxNjMyXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
        directors: 'Akira Kurosawa',
        genre: 'Adventure, Biography, Drama',
        year: 1975,
        rated: 'G',
        plot: 'The Russian army sends an explorer on an expedition to the snowy Siberian wilderness where he makes friends with a seasoned local hunter.',        
        actors: 'Maksim Munzuk, Yuriy Solomin, Mikhail Bychkov',
        price: 25,
        inventory: 14
      } ,
      {
        title: 'Jai Bhim',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTM0NWFjNGYtNjExMS00ZTZlLWFiYmMtZmU4ZjZkMmMxZTNjXkEyXkFqcGdeQXVyODEyNjEwMDk@._V1_SX300.jpg',
        directors: 'T.J. Gnanavel',
        genre: 'Crime, Drama, Mystery',
        year: 2021,
        rated: 'TV-MA',
        plot: 'When a tribal man is arrested for a case of alleged theft, his wife turns to a human-rights lawyer to help bring justice.',
        actors: 'Suriya, Lijo Mol Jose, Manikandan K.',
        price: 15,
        inventory: 5
      } ,
      {
        title: 'Aladdin',
        poster: 'https://m.media-amazon.com/images/M/MV5BY2Q2NDI1MjUtM2Q5ZS00MTFlLWJiYWEtNTZmNjQ3OGJkZDgxXkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg',
        directors: 'Ron Clements, John Musker',
        genre: 'Animation, Adventure, Comedy',
        year: 1992,
        rated: 'G',
        plot: 'A kindhearted street urchin and a power-hungry Grand Vizier vie for a magic lamp that has the power to make their deepest wishes come true.',      
        actors: 'Scott Weinger, Robin Williams, Linda Larkin',
        price: 13,
        inventory: 5
      } ,
      {
        title: 'Gandhi',
        poster: 'https://m.media-amazon.com/images/M/MV5BMzJiZDRmOWUtYjE2MS00Mjc1LTg1ZDYtNTQxYWJkZTg1OTM4XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg',
        directors: 'Richard Attenborough',
        genre: 'Biography, Drama',
        year: 1982,
        rated: 'PG',
        plot: 'The life of the lawyer who became the famed leader of the Indian revolts against the British rule through his philosophy of nonviolent protest.',  
        actors: 'Ben Kingsley, John Gielgud, Rohini Hattangadi',
        price: 17,
        inventory: 11
      } ,
      {
        title: 'The Help',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTM5OTMyMjIxOV5BMl5BanBnXkFtZTcwNzU4MjIwNQ@@._V1_SX300.jpg',
        directors: 'Tate Taylor',
        genre: 'Drama',
        year: 2011,
        rated: 'PG-13',
        plot: "An aspiring author during the civil rights movement of the 1960s decides to write a book detailing the African American maids' point of view on the white families for which they work, and the hardships they go through on a daily b...",
        actors: 'Emma Stone, Viola Davis, Octavia Spencer',
        price: 26,
        inventory: 10
      } ,
      {
        title: 'The Iron Giant',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjIxNDU2Njk0OV5BMl5BanBnXkFtZTgwODc3Njc3NjE@._V1_SX300.jpg',
        directors: 'Brad Bird',
        genre: 'Animation, Action, Adventure',
        year: 1999,
        rated: 'PG',
        plot: 'A young boy befriends a giant robot from outer space that a paranoid government agent wants to destroy.',
        actors: 'Eli Marienthal, Harry Connick Jr., Jennifer Aniston',
        price: 21,
        inventory: 13
      }]


      const movies = await Promise.all(allMovies.map(createMovie))
}






module.exports = {
    populateMovieDatabase,
    sampleCall,
    addMovieToDataBase
}

