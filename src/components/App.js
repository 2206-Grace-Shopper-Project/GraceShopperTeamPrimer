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
      <Route path='/orders' element={<Orders setToken={setToken}/>}/>
    </Routes>
    </>
  );
};

export default App;
