const {
  client,
  createUser,
  createCart,
  createCartMovie,
  createMovie,
  createOrder,
  createReview,
  populateMovieDatabase,
  sampleCall,
  addMovieToDataBase,
  addAddress,
  getAllUserData
} = require('./');
// const fetch = require("node-fetch") 
// globalThis.fetch = fetch
// const movieJSON= require('./models/userData.json')
// const movieData = JSON.parse(movieJSON)
// console.log(movieData.items)
// console.log(typeof populateMovieDatabase, '!!!!!')

async function dropTables(){
  console.log("Starting to drop tables")
  try {
    await client.query(`
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS cart_movies;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS movies;
    DROP TABLE IF EXISTS userData;
    DROP TABLE IF EXISTS users;
    `)

    console.log("Finished dropping tables")
  } catch(error){
    console.log("Error dropping tables")
    throw error
  }
}

async function buildTables() {
  console.log("Starting to build tables")
  try {
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      email varchar(255) UNIQUE,
      name varchar(255) NOT NULL,
      password varchar(255) NOT NULL
    );
    CREATE TABLE userData(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      address varchar(255) NOT NULL,
      UNIQUE ("userId", address)
    );
    CREATE TABLE movies(
      id SERIAL PRIMARY KEY,
      title varchar(255),
      genre varchar(255),
      year INTEGER,
      rated varchar(255),
      plot TEXT,
      actors varchar(255),
      directors varchar(255),
      poster varchar(255),
      price INTEGER,
      inventory INTEGER
    );
    CREATE TABLE cart(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "isPurchased" BOOLEAN DEFAULT false
    );
    CREATE TABLE cart_movies(
      id SERIAL PRIMARY KEY,
      "cartId" INTEGER REFERENCES cart(id),
      "movieId" INTEGER REFERENCES movies(id),
      quantity INTEGER NOT NULL,
      UNIQUE ("cartId", "movieId")
    );
    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      "movieId" INTEGER REFERENCES movies(id),
      "userId" INTEGER REFERENCES users(id),
      review TEXT NOT NULL,
      UNIQUE ("movieId", "userId")
    );
    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      "cartId" INTEGER REFERENCES cart(id),
      address varchar(255) NOT NULL,
      email varchar(255),
      date BIGINT NOT NULL,
      price DECIMAL(10,2) NOT NULL
    );
    `)
   
    console.log("Finished building tables")
  } catch (error) {
    console.log("Error building tables")
    throw error;
  }
}

async function populateInitialData() {
  console.log("Starting to populate initial data")
  try {
    const usersToCreate = [
      { name: "albert", password: "bertie99", email:"albert@hotmail.com"},
      { name: "sandra", password: "sandra123", email:"sandra@hotmail.com"},
      { name: "glamgal", password: "glamgal123", email:"glamgal@hotmail.com"},
    ]
    const users = []
    for (const user of usersToCreate){
    users.push(await createUser(user))
    }
    console.log(users)

    const addressesToAdd = [
      { userId: 1, address: "1245 Bertbert Ave"},
      { userId: 2, address: "12 Fake Street Washington 84322"},
      { userId: 3, address: "1577 Townsend Drive Omaha, NE"}
    ]
    
    const address = await Promise.all(addressesToAdd.map(addAddress))
    console.log(address)

    // console.log('Getting user[1] data')
    // console.log(await getAllUserData({userId: 1}))


    const moviesToCreate = [
      { title:"Give Up The Ghost", genre:"Comedy", year:2021 , rated:"PG", actors:"Isa Arciniegas, Julie Mitre", directors:"Hunter Norris", plot:"Erika visits a psychic to git rid of the nagging ghosts of her past.", price:20 , poster:`https://static.wixstatic.com/media/b1dc41_2c20545f71264caabec0e6e4b43c74a3~mv2.png/v1/fill/w_331,h_503,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Give_Up_the_Ghost_Poster_v3--no_border_p.png`, inventory:1 }
    ]
    const movies = await Promise.all(moviesToCreate.map(createMovie))
    console.log(movies)
    addMovieToDataBase()

    const cartToCreate = [
      { userId:1 }
    ]
    const cart = await Promise.all(cartToCreate.map(createCart))
    console.log(cart)

    // const cartMovieToCreate = [
    //   { cartId:1, movieId:1, quantity:2 }
    // ]
    // const cartMovie = await Promise.all(cartMovieToCreate.map(createCartMovie))
    // console.log(cartMovie)

    const reviewsToCreate = [
      { movieId:1, userId:1, review:"I'm still laughing!" }
    ]
    const reviews = await Promise.all(reviewsToCreate.map(createReview))
    console.log(reviews)

    const ordersToCreate = [
      { cartId:1, address:"1234 Albert Lane", email:"albert@hotmail.com", date:1660157462019 , price:20 }
    ]
    const orders = await Promise.all(ordersToCreate.map(createOrder))
    console.log(orders)

    console.log("Finished populating initial data")
  } catch (error) {
    console.log("Error populating initial data")
    throw error;
  }
}

async function rebuildDB(){
  try {
    client.connect();

    await dropTables();
    await buildTables();
    await populateInitialData()
    console.log('made it to end of rebuildDB')
  } catch(error){
    console.log("Error during rebuildDB")
    throw error
  }
}

const runDB = async () => {
  try {
    await rebuildDB().then(console.log('this should be after all is inputted'))
  } catch (error) {
    console.error('problem over here')
  } finally{
    client.end()
  }
}
runDB()
// await rebuildDB()
//   .catch(console.error)
//   .finally(() => {client.end()
//   console.log('alls well that ends well')});
