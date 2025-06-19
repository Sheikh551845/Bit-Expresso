import React from 'react';
import { FaArrowLeft, FaComment, FaHeart } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
     const navigate = useNavigate();
     const data =useLoaderData()
     console.log(data)
    
    return (
        <div className='bg-cover bg-center text-black shadow-sm items-center p-4 h-screen' style={{ backgroundImage: "url('../images/more/11.png')" }} >

            <div className='w-[80%] mx-auto' >
              
                <div>
                    
                    <button  onClick={() => navigate(-1)} className='flex gap-1 justify-center items-center text-base md:text-xl border-2 border-black p-3'>
                        <div className='text-3xl'>
                            <GoArrowLeft />
                        </div>

                        <p>Back</p>
                    </button>
                </div>
                
               {data?<div className='bg-[#F4F3F0] w-full h-[300px] md:h-[500px] mt-2 md:mt-4 flex justify-around items-center'>
                    <div>
                        <img src={data.image} alt="" />
                    </div>
                    <div>
                         <p className='text-xl font-bold md:text-4xl text-[#6f4e37] mb-4'>Niceties</p>
                         <div className='text-base font-normal '>
                            <p>
                            <span className='font-bold'>Name: </span> {data.name}
                            </p>
                             <p>
                            <span className='font-bold'>Material: </span>{data.material? data.material: "No Information"}
                            </p>
                             <p>
                            <span className='font-bold'>Category: </span>{data.category? data.category: "No Information"}
                            </p>
                              <p>
                            <span className='font-bold'>Price: </span>{data.price? data.price: "No Information"}$
                            </p>
                              <p>
                            <span className='font-bold'>Details: </span>{data.details}
                            </p>
                            
                         </div>
                    </div>

                     <div className='flex justify-around items-center flex-col gap-3'>
                                        <button className="bg-red-500 rounded-xl w-10 h-8 text-white flex items-center justify-center cursor-pointer">
                                            <FaHeart />
                                        </button>
                    
                                        <button
                                            
                                            
                                            className="bg-black rounded-xl w-10 h-8 text-white flex items-center justify-center cursor-pointer"
                                        >
                                           <FaComment />
                                        </button>
                    
                                       
                    
                    
                    
                                    </div>


                </div> :<div className='flex justify-center items-center h-[50vh]'><ClockLoader color="#6f4e37"
                        size={150} /></div>}
                
            </div>
        </div>

    );
};

export default ProductDetails;