import React, { useState, useEffect } from 'react';
import {  Routes, Route } from 'react-router-dom';
import { getAllMovies } from '../api';
import { grabToken, grabUser } from '../auth';
import {Orders, UserForm, Movies, Carts, Header, Register, Login, Admin, MyReviews} from './'



const App = () => {
  const [token, setToken] = useState(grabToken()) 
  const [allMovies, setAllMovies] = useState([])
  const [userDataObj, setUserDataObj] = useState(grabUser())
  const fetchMovies = async ()=>{
    const movieList = await getAllMovies()
    setAllMovies(movieList)
  } 
useEffect(()=>{
   fetchMovies()

}, [])

  return (
    <>
    <Routes>
      <Route path='/' />
      <Route path='/orders' element={<Orders setToken={setToken} token={token} userDataObj={userDataObj}/>}/>
      <Route path='/users' element={<UserForm setToken={setToken} token={token} userDataObj={userDataObj}/>}/>
      <Route path='/movies' element={<Movies setToken={setToken} token={token} allMovies={allMovies} userDataObj={userDataObj}/>} />
      <Route path='/carts' element={<Carts setToken={setToken} token={token} userDataObj={userDataObj}/> }/>
      <Route path='/header' element={<Header setToken={setToken} token={token} userDataObj={userDataObj}/>}/>
      <Route path='/login' element={<Login setToken={setToken} token={token} userDataObj={userDataObj}/>}/>
      <Route path='/register' element={<Register setToken={setToken} token={token} userDataObj={userDataObj}/>}/>
      <Route path='/admin' element={<Admin setToken={setToken} token={token} userDataObj={userDataObj}/>}/>
      <Route path='/myreviews' element={<MyReviews setToken={setToken} userDataObj={userDataObj}/>}/>





    </Routes>
    </>
  );
};

export default App;
