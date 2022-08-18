import React, { useState, useEffect } from 'react';
import {  Routes, Route } from 'react-router-dom';
import { getAllMovies } from '../api';
import { grabToken, grabUser } from '../auth';
import {Orders, UserForm, Movies, Carts, Header, Register, Login, Admin, MyReviews, WrongPage, MoviePage, AllOrders, AllUsers} from './'
import { specificMovieList } from './Movies';



const App = () => {
  
  const [token, setToken] = useState(grabToken()) 
  const [allMovies, setAllMovies] = useState([])
  const [userDataObj, setUserDataObj] = useState(grabUser())
  const [filteredMovieList, setFilteredMovieList] = useState([])

  const fetchMovies = async ()=>{
    const movieList = await getAllMovies()
    console.log('main all fetch')
    console.log(movieList, 'what happened')
    setAllMovies(movieList)
  } 
  const fetchMoviesToShowDefault = async ()=>{
    const searchMethod = 'id'
    const searchFlow = 'ASC'
    const limitNumber = 50
    const offsetNumber = 0
    const defaultList = await specificMovieList(searchMethod, searchFlow, limitNumber, offsetNumber)
    console.log('filter fetch')

    setFilteredMovieList(defaultList)
  }
useEffect(()=>{
   fetchMovies()
   fetchMoviesToShowDefault()
}, [])

  return (
    <>
    <Routes>
      <Route exact path='/' element={<Header setToken={setToken} token={token} userDataObj={userDataObj}/>}>
      <Route index element={<Movies setToken={setToken} token={token} allMovies={allMovies} userDataObj={userDataObj} filteredMovieList={filteredMovieList} setFilteredMovieList={setFilteredMovieList} setAllMovies={setAllMovies}/>} />

      <Route path="/movies/:movieTitle" element={ <MoviePage userDataObj={userDataObj} token={token} allMovies={allMovies}/> } />
      <Route path='/orders' element={<Orders setToken={setToken} token={token} userDataObj={userDataObj}/>}/>

      <Route path='/users' element={<UserForm setToken={setToken} token={token} userDataObj={userDataObj}/>}/>

      <Route path='/all-orders' element={<AllOrders setToken={setToken} token={token} userDataObj={userDataObj}/>}/>
      <Route path='/all-users' element={<AllUsers setToken={setToken} token={token} userDataObj={userDataObj}/>}/>

      

      <Route path='/carts' element={<Carts setToken={setToken} token={token} userDataObj={userDataObj}/> }/>

      <Route path='/login' element={<Login setToken={setToken} token={token} userDataObj={userDataObj}/>}/>

      <Route path='/register' element={<Register setToken={setToken} token={token} userDataObj={userDataObj}/>}/>

      <Route path='/admin' element={<Admin setToken={setToken} token={token} userDataObj={userDataObj}/>}/>

      <Route path='/myreviews' element={<MyReviews setToken={setToken} token={token} userDataObj={userDataObj}/>}/>
      </Route>
      <Route path="*" element={<WrongPage />} />






    </Routes>
    </>
  );
};

export default App;
