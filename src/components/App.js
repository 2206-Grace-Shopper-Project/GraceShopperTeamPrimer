import React, { useState, useEffect } from 'react';
import {  Routes, Route } from 'react-router-dom';
import { grabToken } from '../auth';
import {Orders, UserForm, Movies, Carts, Header, Register, Login} from './'


export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

export async function getAllMovies() {
    try {
        const response = await fetch(`${BASE}/movies`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        console.log(result, '!!!!!!!!')
        return result
    } catch (error) {
        
    }

}

const App = () => {
  const [token, setToken] = useState(grabToken()) 
  const [allMovies, setAllMovies] = useState([])

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
      <Route path='/orders' element={<Orders setToken={setToken} token={token}/>}/>
      <Route path='/users' element={<UserForm setToken={setToken} token={token}/>}/>
      <Route path='/movies' element={<Movies setToken={setToken} token={token} allMovies={allMovies}/>}/>
      <Route path='/carts' element={<Carts setToken={setToken} token={token}/>}/>
      <Route path='/header' element={<Header setToken={setToken} token={token}/>}/>
      <Route path='/login' element={<Login setToken={setToken} token={token}/>}/>
      <Route path='/register' element={<Register setToken={setToken} token={token}/>}/>



    </Routes>
    </>
  );
};

export default App;
