import React from 'react';

const Banner = () => {
    return (
        <div>
            <div className='bg-cover bg-center h-[75vh] flex items-center' style={{ backgroundImage: "url('./src/images/more/3.png')" }}>
              <div className='w-[80%] text-white text-start flex justify-end  '>
                <div>
               <p className='font-bold text-2xl'>
                Would you like a Cup of Delicious Coffee?
              </p>
              <p className='py-4'>
                It's coffee time - Sip & Savor - Relaxation in every sip! Get the nostalgia back!! Your companion of <br></br> every moment!!! Enjoy the beautiful moments and make them memorable.
              </p>
            <button  className='btn btn-active btn-warning text-white'> Learn More</button>
                </div>
              
              </div>
            </div>
            
        </div>
    );
};

export default Banner;