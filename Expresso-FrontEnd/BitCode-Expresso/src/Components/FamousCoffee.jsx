import React, { useEffect } from 'react';
import chobi from '../images/more/1.png';
import { useState } from 'react';
import FamousCard from './FamousCard';
import { ClockLoader } from 'react-spinners';



const FamousCoffee = () => {
    const [FamousCoffee, setFamousCoffee] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/AllCoffees')
            .then(res => res.json())
            .then(data => {
                setFamousCoffee(data.slice(0,6));
              
            })

    },
        [])

    return (
        <div className=" relative  md:h-[100vh] mt-10 ">
          

            <div className="hidden md:block md:absolute md:inset-0 md:z-7">
                <img src={chobi} className="max-h-screen w-screen " alt="" />
            </div>


      
            <div className='absolute z-8 md:inset-0 w-full'>
                <div className=" w-[80%] mx-auto flex flex-col justify-center items-center text-center ">
                <p className="text-[#6f4e37]">--- Sip & Savor ---</p>
                <p className="text-2xl font-bold text-[#6f4e37]">Our Popular Products</p>

                {FamousCoffee.length === 0 ? <div className='flex justify-center items-center h-[50vh]'><ClockLoader color="#6f4e37"
                        size={150} />
                    </div> : <div className='grid grid-col-1 md:grid-cols-2 w-full gap-2 mt-2 p-3'>
                        {FamousCoffee.map((Coffee, index) => (
                            <FamousCard Coffee={Coffee} key={index} />
                        ))}
                    </div>}

            </div>

            </div>
            

        </div>

    );
};

export default FamousCoffee;