import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/more/logo1.png';
import { AuthContext } from '../AuthProvider';
 


const Nav = () => {
  const {user,logout}=useContext(AuthContext)
    return (
        <div className=' '>
            <div className="navbar bg-[#6f4e37] text-white shadow-sm flex justify-between items-center fixed z-10 mb-[64px] mt-0">
  <div className="flex justify-center items-center gap-2">
    <img className='w-7 h-7 md:w-10 md:h-10 bg-white rounded-full' src={logo} alt="" />
    <p className='text-sm md:text-xl font-bold'>Bit Expresso</p>
  </div>

{/* Menu   */}
<div className='flex justify-between items-center'>
    <ul className='text-xs md:text-xl flex justify-between items-center gap-4'>
 <li><NavLink to="/">Home</NavLink></li>
 <li><NavLink to="/AllProducts">All Products</NavLink></li>
   <li><NavLink to='/About'>About</NavLink></li>
    </ul> 
</div>
{/* menu ends */}

 
    {user && Object.keys(user).length > 0?    
    <div className="flex justify-center items-center gap-2 ">
    <p className="text-white fond-bold text-xs lg:text-xl">{user.displayName}</p>
    
    <div className="avatar">
     
      </div>
    
      <button className="md:btn text-black p-1 md:w-22 md:h-6    md:p-3 bg-white rounded-lg text-xs lg:text-base"
          onClick={logout}
      >Logout</button>

     
    </div> :

<div className="flex justify-center items-center gap-4">
  <NavLink to="/Login">
  <button className="md:btn text-black p-1 md:w-22 md:h-6    md:p-3 bg-white rounded-lg text-xs lg:text-base">Log In</button>
</NavLink>


      
</div>
}
</div>
            
        </div>
    );
};

export default Nav;