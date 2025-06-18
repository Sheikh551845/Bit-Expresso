import React from 'react';

const FamousCard = (data) => {
    const { Coffee } = data



    return (
        <div className=''>
            <div className='bg-[#F5F4F1]  rounded-2xl flex justify-between items-center'>
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
                <div>

                </div>
            </div>
        </div>
    );
};

export default FamousCard;