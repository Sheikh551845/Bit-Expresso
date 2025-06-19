import React from 'react';
import { FaComment, FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { TbListDetails } from 'react-icons/tb';
import { Link, Navigate, NavLink } from 'react-router-dom';

const FamousCard = (data) => {
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
                <div className='flex justify-around items-center flex-col gap-3'>
                    <button className="bg-red-500 rounded-xl w-10 h-8 text-white flex items-center justify-center">
                        <FaHeart />
                    </button>

                    <Link
                       
                        to={`/ProductDetails/${Coffee._id}`}
                        className="bg-[#D2B48C] rounded-xl w-10 h-8 text-white flex items-center justify-center"
                    >
                        <TbListDetails />
                    </Link>

                    <Link
                        
                        to={`/ProductDetails/${Coffee._id}`}
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