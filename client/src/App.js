import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Reg} from './auth/reg.js';
import {Login} from './auth/login.js';
import { Home } from './auth/home.js';
import { Profile } from './auth/profile.js';
import { Update } from './auth/update.js';
import { useEffect, useState } from 'react';



const App = () => {
  const [isLoggedIn,setLoggedIn]=useState(false);

  useEffect(()=>{
    const id=localStorage.getItem('userId');
    setLoggedIn(!!id);


  },[]);
 
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
       
        {isLoggedIn?(
          <>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/update" element={<Update />}/>

          </>
        ):(
          <>
          
          <Route path='/register' element={<Reg/>}/>
          <Route path="/login" element={<Login />} />
          </>

        )}
        
      
      </Routes>
    </Router>
  );
};
export default App;



