import React from 'react';
import FirstReplay from './FirstReplay';

const Comment = (comment) => {
   
    const data = comment.comment

    return (
        
        <div className='w-[90%]  mx-auto'>
             <div className='[w-90%] bg-red-50 mx-auto'>
              {data.comment}
            </div>
            <div className='w-full flex justify-end items-end'>
            <div className='w-[90%] bg-green-200 mt-2 mx-auto'>
                   <FirstReplay></FirstReplay>
             </div>
            </div>
          
            
        </div>
    );
};

export default Comment;