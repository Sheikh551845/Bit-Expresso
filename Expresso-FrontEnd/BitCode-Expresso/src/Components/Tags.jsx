import React from 'react';
import first from '../images/icons/1.png';
import second from '../images/icons/2.png';
import third from '../images/icons/3.png';
import fourth from '../images/icons/4.png';

const Tags = () => {
    return (
        <div className="w-full bg-cover bg-center shadow-sm" style={{ backgroundImage: "url('./src/images/more/10.png')" }}>
            <div className="w-full md:w-[80%] mx-auto px-4 py-6 md:py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-center text-black">
                {/* Tag Item */}
                <div className="flex flex-col items-center text-center">
                    <img className="w-10 h-10 md:w-16 md:h-16 mb-2" src={first} alt="Awesome Aroma" />
                    <p className="text-sm md:text-xl font-bold">Awesome Aroma</p>
                    <p className="text-xs md:text-base">
                        You will definitely be a fan of the design <br /> & aroma of your coffee
                    </p>
                </div>

                {/* Tag Item */}
                <div className="flex flex-col items-center text-center">
                    <img className="w-10 h-10 md:w-16 md:h-16 mb-2" src={second} alt="High Quality" />
                    <p className="text-sm md:text-xl font-bold">High Quality</p>
                    <p className="text-xs md:text-base">
                        We served the coffee to you maintaining <br /> the best quality
                    </p>
                </div>

                {/* Tag Item */}
                <div className="flex flex-col items-center text-center">
                    <img className="w-10 h-10 md:w-16 md:h-16 mb-2" src={third} alt="Pure Grades" />
                    <p className="text-sm md:text-xl font-bold">Pure Grades</p>
                    <p className="text-xs md:text-base">
                        The coffee is made of the green coffee beans <br /> which you will love
                    </p>
                </div>

                {/* Tag Item */}
                <div className="flex flex-col items-center text-center">
                    <img className="w-10 h-10 md:w-16 md:h-16 mb-2" src={fourth} alt="Proper Roasting" />
                    <p className="text-sm md:text-xl font-bold">Proper Roasting</p>
                    <p className="text-xs md:text-base">
                        Your coffee is brewed by first roasting <br /> the green coffee beans
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Tags;
