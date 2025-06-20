import React from 'react';
import Comment from './Comment';

const Comments = (comments) => {
    const Allcomments = comments.comments
    return (
        <div>
            <p className='text-center Allcomments mb-5'>Comments </p>
            <div className=''>
                   {Allcomments.map((comment, index) => (
                <Comment key={index} comment={comment} />
            ))}

            </div>
         


        </div>
    );
};

export default Comments;