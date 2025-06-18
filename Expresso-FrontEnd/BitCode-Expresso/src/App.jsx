import React from 'react';
import Nav from './Components/Nav';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';




const App = () => {
  return (
    <div>
      <div className='h-[64px]'>
       <Nav></Nav>
      </div>
     
     <div className="min-h-[calc(100vh-64px)]"> 
         <Outlet></Outlet>
        </div>
      <Footer></Footer>
        <ToastContainer></ToastContainer>
    </div>
  );
};

export default App;