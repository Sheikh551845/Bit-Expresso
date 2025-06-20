import React from 'react';
import SecondReplay from './SecondReplay';

const FirstReplay = () => {
    return (

            <div className='w-full relative  '>
                        <div className='[w-90%] bg-yellow-200 '>
                         Hello
                       </div>
                       <div className='w-full flex justify-end items-end  mt-2 absolute'>
                                   <div className='w-[90%] bg-green-200'>
                                         <SecondReplay></SecondReplay>
                                    </div>
                                   </div>
                       
                   </div>
    );
};

export default FirstReplay;