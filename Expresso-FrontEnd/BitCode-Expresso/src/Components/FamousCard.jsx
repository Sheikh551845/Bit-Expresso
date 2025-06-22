import React from 'react';
import { FaComment, FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { TbListDetails } from 'react-icons/tb';
import { Link, Navigate, NavLink, useLocation } from 'react-router-dom';

const FamousCard = (data) => {
    const location = useLocation()
    const { Coffee } = data

 

    return (
        <div className=''>
            <div className='bg-[#F5F4F1]  rounded-2xl flex justify-between items-center px-8'>
                <div className=' '>
                    <img className='w-[140px] h-[180px] p-3' src={Coffee.image} alt="" />
                </div>
                <div className='text-start'>
                    <p>
                        <span className='font-bold'>Name: </span>{Coffee.name}
                    </p>
                    <p>
                        <span className='font-bold'>Category: </span>{Coffee.category}
                    </p>
                    <p>
                        <span className='font-bold'>Price: </span>{Coffee.price}$
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
                                    to={`/FamousDetails/${Coffee._id}` }
                                    className="bg-red-500 rounded-xl w-10 h-8 text-white flex items-center justify-center cursor-pointer"
                                state={{ from: location.pathname }}
                                >
                                    <FaHeart />
                                </Link>
                
                              
                                <Link
                                    to={`/FamousDetails/${Coffee._id}`}
                                   state={{ from: location.pathname }}
                                    className="bg-[#D2B48C] rounded-xl w-10 h-8 text-white flex items-center justify-center"
                                >
                                    <TbListDetails />
                                </Link>
                
                         
                                <Link
                                    to={`/FamousDetails/${Coffee._id}`}
                                     state={{ from: location.pathname }}
                                    className="bg-black rounded-xl w-10 h-8 text-white flex items-center justify-center cursor-pointer"
                                >
                                    <FaComment />
                                </Link>
                            </div>
            </div>
        </div>
    );
};

export default FamousCard;