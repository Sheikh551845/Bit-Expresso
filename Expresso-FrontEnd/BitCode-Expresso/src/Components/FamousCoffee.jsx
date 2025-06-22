import React, { useEffect, useState } from 'react';
import chobi from '../images/more/1.png';
import FamousCard from './FamousCard';
import { ClockLoader } from 'react-spinners';

const FamousCoffee = () => {
    const [FamousCoffee, setFamousCoffee] = useState([]);

    useEffect(() => {
        fetch('https://bit-expresso-server.onrender.com/AllCoffees')
            .then(res => res.json())
            .then(data => {
                setFamousCoffee(data.slice(0, 6));
            });
    }, []);

    return (
        <div className="relative w-full mt-10">
          
            <div className="hidden md:block fixed top-0 left-0 w-full h-full -z-10">
                <img src={chobi} alt="" className="w-full h-full object-cover" />
            </div>

           
            <div className="w-[90%] md:w-[80%] mx-auto py-10 md:py-20">
                <div className="text-center mb-8">
                    <p className="text-[#6f4e37]">--- Sip & Savor ---</p>
                    <p className="text-2xl md:text-4xl font-bold text-[#6f4e37]">Our Popular Products</p>
                </div>

                {FamousCoffee.length === 0 ? (
                    <div className="flex justify-center items-center h-[50vh]">
                        <ClockLoader color="#6f4e37" size={150} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FamousCoffee.map((coffee, index) => (
                            <FamousCard Coffee={coffee} key={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FamousCoffee;
