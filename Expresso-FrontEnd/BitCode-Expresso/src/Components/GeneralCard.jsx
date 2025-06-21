import React from 'react';
import { FaComment, FaHeart } from 'react-icons/fa';
import { TbListDetails } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const GeneralCard = ({ Coffee }) => {
    return (
        <div className="bg-[#F5F4F1] rounded-2xl flex flex-col md:flex-row justify-between items-center p-4 shadow-md hover:shadow-xl transition-shadow duration-300">
            
            <div className="flex-shrink-0">
                <img
                    className="w-[140px] h-[180px] object-cover rounded-xl"
                    src={Coffee.image}
                    alt={Coffee.name}
                />
            </div>

            <div className="flex-grow px-6 py-3 w-full md:w-auto text-left">
                <p>
                    <span className="font-bold">Name: </span>{Coffee.name}
                </p>
                <p>
                    <span className="font-bold">Category: </span>{Coffee.category}
                </p>
                <p>
                    <span className="font-bold">Price: </span>{Coffee.price}$
                </p>
            </div>

       
            <div className="relative flex flex-col items-center gap-5 md:gap-6">
               
                <p className="bg-red-500 rounded-xl w-5 h-5 text-white text-center absolute top-4 left-6 select-none text-xs font-semibold">
                    {Coffee.likes || 0}
                </p>

                <p className="bg-black rounded-xl w-5 h-5 text-white text-center absolute bottom-[-4px] left-6 select-none text-xs font-semibold">
                    {Coffee.comments || 0}
                </p>

             
                <Link
                    to={`/FamousDetails/${Coffee._id}`}
                    className="bg-red-500 rounded-xl w-10 h-8 text-white flex items-center justify-center cursor-pointer"
               
                >
                    <FaHeart />
                </Link>

              
                <Link
                    to={`/FamousDetails/${Coffee._id}`}
                    className="bg-[#D2B48C] rounded-xl w-10 h-8 text-white flex items-center justify-center"
                >
                    <TbListDetails />
                </Link>

         
                <Link
                    to={`/FamousDetails/${Coffee._id}`}
                    className="bg-black rounded-xl w-10 h-8 text-white flex items-center justify-center cursor-pointer"
                >
                    <FaComment />
                </Link>
            </div>
        </div>
    );
};

export default GeneralCard;
