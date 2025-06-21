import React from 'react';
import Comment from './Comment';

const Comments = (comments) => {
    const Allcomments = comments.comments


   
    return (
        <div>
            <p className='text-center mb-5 '>Comments </p>
            <div className=' overflow-y-auto'>
                   {Allcomments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
            ))}

            </div>
         


        </div>
    );
};

export default Comments;