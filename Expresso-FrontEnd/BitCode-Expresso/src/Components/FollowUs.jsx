import React from 'react';
import one from '../images/cups/Rectangle 9.png';
import two from '../images/cups/Rectangle 10.png';
import three from '../images/cups/Rectangle 11.png';
import four from '../images/cups/Rectangle 12.png';
import five from '../images/cups/Rectangle 13.png';
import six from '../images/cups/Rectangle 14.png';
import seven from '../images/cups/Rectangle 15.png';
import eight from '../images/cups/Rectangle 16.png';


const FollowUs = () => {
    return (
        <div><div className=" w-[80%] mx-auto flex flex-col justify-center items-center text-center my-10">
                <p className="text-[#6f4e37]">--- Follow Us ---</p>
                <p className="text-2xl font-bold text-[#6f4e37]">On Facebook</p>

                <div className='grid grid-cols-4 w-full gap-1 md:gap-2 mt-2 p-1 md:p-3'>
                    <img className='w-[212px] h-[250px] md:w-[312px] md:h-[350px]' src={one} alt="" />
                    <img className='w-[212px] h-[250px] md:w-[312px] md:h-[350px]' src={two} alt="" />
                    <img className='w-[212px] h-[250px] md:w-[312px] md:h-[350px]' src={three} alt="" />
                    <img className='w-[212px] h-[250px] md:w-[312px] md:h-[350px]' src={four} alt="" />
                    <img className='w-[212px] h-[250px] md:w-[312px] md:h-[350px]' src={five} alt="" />
                    <img className='w-[212px] h-[250px] md:w-[312px] md:h-[350px]' src={six} alt="" />
                    <img className='w-[212px] h-[250px] md:w-[312px] md:h-[350px]' src={seven} alt="" />
                    <img className='w-[212px] h-[250px] md:w-[312px] md:h-[350px]' src={eight} alt="" />
                </div>
            </div>
        </div>
    );
};

export default FollowUs;