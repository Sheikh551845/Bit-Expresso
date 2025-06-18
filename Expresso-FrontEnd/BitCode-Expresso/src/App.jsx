import React from 'react';
import Nav from './Components/Nav';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer';




const App = () => {
  return (
    <div>
      <div className='fixed z-10 mb-[64px] mt-0'>
  <Nav></Nav>
      </div>
     
     <div className="min-h-screen"> 
         <Outlet></Outlet>
        </div>
      <Footer></Footer>
      
    </div>
  );
};

export default App;