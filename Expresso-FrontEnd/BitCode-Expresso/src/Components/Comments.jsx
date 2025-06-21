import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { toast } from 'react-toastify';

const Comments = ({ comments, Prodcutinfo }) => {

    const [Allcomments, setAllComments] = useState([])
    const [prodcut, setProduct] = useState({})
  

    useEffect(() => {
        setAllComments(comments);
    }, [comments]);




        useEffect(() => {

            fetch(`http://localhost:5000/OneCoffee/${Prodcutinfo._id}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data)

                })


        }, []);
    



    const handleDetele = (id) => {

        fetch(`http://localhost:5000/DeteleComment/${id}`, {
            method: 'DELETE',
        })
            .then((res) => {
                if (res.ok) {
                    toast.success("Comment deleted");
                    setAllComments((Allcomments) => Allcomments.filter(comment => comment._id !== id));


                    const increase = prodcut.comments - 1;

                    fetch(`http://localhost:5000/CommentCount/${prodcut._id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ comments: increase })
                    })
                        .then(res => {
                            console.log(res)

                            if (res.status == 200) {
                                toast.success("Comment decrese by 1")
                            }
                        }
                        )

                } else {
                    toast.error("Failed to delete");
                }
            })




    }


    return (
        <div>
            {Allcomments.length>0? <p className='text-center mb-4 text-3xl text-[#6f4e37] font-bold'>Comments </p>: ""}
            
            <div className=' overflow-y-auto'>
                {Allcomments.map((comment) => (
                    <Comment key={comment._id} comment={comment} onDelete={handleDetele} />
                ))}

            </div>



        </div>
    );
};

export default Comments;