import React from 'react';
import first from '../images/icons/1.png';
import Second from '../images/icons/2.png';
import third from '../images/icons/3.png';
import fourth from '../images/icons/4.png';

const Tags = () => {
    return (
        <div>
            <div className=" h-[25vh] bg-cover bg-center text-black shadow-sm items-center p-4" style={{ backgroundImage: "url('./src/images/more/10.png')" }}>
                <div className='w-[80%] flex justify-between items-center mx-auto '>
                    <div >
                        <div className='' >
                            <img className='w-15 h-15' src={first} alt="" />
                        </div>
                        <div>
                            <p className='text-xl font-bold pb-1'>
                                Awesome Aroma
                            </p>
                            <p>
                                You will definitely be a fan of the design <br></br> & aroma of your coffee
                            </p>
                        </div>
                    </div>

                       <div >
                        <div className='' >
                            <img className='w-15 h-15' src={Second} alt="" />
                        </div>
                        <div>
                            <p className='text-xl font-bold pb-1'>
                                High Quality
                            </p>
                            <p>
                               We served the coffee to you maintaining <br></br> the best quality
                            </p>
                        </div>
                    </div>

                       <div >
                        <div className='' >
                            <img className='w-15 h-15' src={third} alt="" />
                        </div>
                        <div>
                            <p className='text-xl font-bold pb-1'>
                               Pure Grades
                            </p>
                            <p>
                                The coffee is made of the green coffee beans <br></br>which you will love
                            </p>
                        </div>
                    </div>

                        <div >
                        <div className='' >
                            <img className='w-15 h-15' src={fourth} alt="" />
                        </div>
                        <div>
                            <p className='text-xl font-bold pb-1'>
                               Proper Roasting
                            </p>
                            <p>
                               Your coffee is brewed by first roasting <br></br>the green coffee beans
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Tags;