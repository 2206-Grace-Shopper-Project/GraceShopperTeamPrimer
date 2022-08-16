import React, { useState, useEffect } from 'react';
import {  Routes, Route } from 'react-router-dom';
import { grabToken } from '../auth';
import {Orders} from './'

const App = () => {
  const [token, setToken] = useState(grabToken()) 

  return (
    <>
    <Routes>
      <Route path='/' />
      <Route path='/orders' element={<Orders setToken={setToken} token={token}/>}/>
      <Route path='/users' element={<UserForm setToken={setToken} token={token}/>}/>
      <Route path='/movies' element={<Movies setToken={setToken} token={token}/>}/>
      <Route path='/carts' element={<Carts setToken={setToken} token={token}/>}/>
      <Route path='/header' element={<Header setToken={setToken} token={token}/>}/>



    </Routes>
    </>
  );
};

export default App;
