import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/more/logo1.png';


const Nav = () => {
    return (
        <div className=' '>
            <div className="navbar bg-[#6f4e37] text-white shadow-sm flex justify-between items-center fixed z-10 mb-[64px] mt-0">
  <div className="flex justify-center items-center gap-2">
    <img className='w-10 h-10 bg-white rounded-full' src={logo} alt="" />
    <p className='text-xl font-bold'>Bit Expresso</p>
  </div>

{/* Menu   */}
<div className='flex justify-between items-center'>
    <ul className='flex justify-between items-center gap-4'>
 <li><NavLink to="/">Home</NavLink></li>
 <li><NavLink to="/AllProducts">All Products</NavLink></li>
   <li><NavLink to='/About'>About</NavLink></li>
    </ul> 
</div>
{/* menu ends */}

  <div className="flex-none">
  
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
            
        </div>
    );
};

export default Nav;