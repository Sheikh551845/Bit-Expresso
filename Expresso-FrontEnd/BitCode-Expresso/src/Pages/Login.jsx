import React, { useContext, useEffect, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthProvider';




export default function Login() {


    const { login, user } = useContext(AuthContext)

    const [CheckUser, setCheckUser]=useState({})
      const navigate = useNavigate();
      const location=useLocation()

 useEffect(()=>{
    setCheckUser(user)
 },[user])

 useEffect(()=>{ if(CheckUser){
    navigate(location.state)
 }
 },[CheckUser,navigate,location])




  

    const handleSubmit = (event) => {
        event.preventDefault();




        const email = event.target.email.value;
        const password = event.target.password.value;



        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }


        // login
        login(email, password)
            .then(() => {
                toast.success('User logged in successfully');
                navigate('/')
            })
            .catch(error => {
                toast.error(error.message)
            })




    }
    return (
        <div className="md:h-screen mx-auto my-auto">
            <div className="relative flex  w-72  md:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mx-auto mt-32">
                <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-r from-[#6f4e37] to-[#4b2c1c]  bg-clip-border text-white shadow-lg shadow-[#4b2c1c]">
                    <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
                        Sign In
                    </h3>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit} className="card-body">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Email</span>
                            </label>
                            <input type="text" placeholder="email" className="input input-bordered" name='email' required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Password</span>
                            </label>
                            <input type="text" placeholder="password" className="input input-bordered" name='password' required />
                        </div>
                        <div className="form-control mt-6 p-0">
                            <button className="btn  bg-gradient-to-r from-[#6f4e37] to-[#4b2c1c] text-white" type='submit'>Log In</button>
                        </div>

                    </form>
                    <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
                        Don't have an account?
                        <a
                            href="/Registration"
                            className="ml-1 block font-sans text-sm font-bold leading-normal text-pink-500 antialiased"
                        >
                            Registration
                        </a>
                    </p>

                </div>
            </div>
        </div>

    )
}