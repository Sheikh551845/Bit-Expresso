import React, {  useContext, useEffect, useState } from 'react';
import { FaArrowLeft, FaComment, FaHeart } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthProvider';
import Comments from '../Components/Comments';
import { ClockLoader } from 'react-spinners';






const FamousDetails = () => {
    const navigate = useNavigate();
    const data = useLoaderData()
    const [submitted, setSubmitted] = useState(false)
    const { user } = useContext(AuthContext)
    const [commentCount, setCommentCount] = useState(data.comments)
    const [likeCount, setLikeCount] = useState(data.likes)
    const [comments, setcomments] = useState([])




    useEffect(() => {

        fetch(`http://localhost:5000/Comment/${data._id}`)
            .then(res => res.json())
            .then(data => {
                setcomments(data)
            })
    }, [])
    //   





    const handleComment = (event) => {

        event.preventDefault();
        const comment = event.target.Comment.value;
        if (comment.length > 300) {
            toast.error('Please use less than 300 word');
            return;
        }

        const commentDetails = {
            "uid": `${user.uid}`,
            "comment": `${comment}`,
            "pid": `${data._id}`,
            "auther": `${user.displayName}`
        }
        setSubmitted(true)
        fetch('http://localhost:5000/Comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentDetails)
        })
            .then(res => {

                if (res.status == 200) {
                    setCommentCount(data.comments + 1)
                    toast.success('Comment added')

                    const increase = data.comments + 1;

                    fetch(`http://localhost:5000/FamousCommentCount/${data._id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ comments: increase })
                    })
                        .then(res => {
                            console.log(res)

                            if (res.status == 200) {
                                toast.success("Comment increase by 1")
                            }
                        }
                        )




                }
            })





    }



    return (
        <div>
            <div className='bg-cover bg-center text-black  items-center mt-4 min-h-screen' style={{ backgroundImage: "url('../images/more/11.png')" }} >

                <div className='w-[80%] mx-auto' >

                    <div>

                        <button onClick={() => navigate(-1)} className='flex gap-1 justify-center items-center text-base md:text-xl border-2 border-black p-3'>
                            <div className='text-3xl'>
                                <GoArrowLeft />
                            </div>

                            <p>Back</p>
                        </button>
                    </div>

                    {data ?
                        <div className='bg-[#F4F3F0] w-full min-h-fit md:h-[500px] mt-2 md:mt-4'>
                            <div className=' flex justify-around items-center'>
                                <div>
                                    <img src={data.image} alt="" />
                                </div>
                                <div>
                                    <p className='text-xl font-bold md:text-4xl text-[#6f4e37] mb-4'>Niceties</p>
                                    <div className='text-base font-normal '>
                                        <p>
                                            <span className='font-bold'>Name: </span> {data.name}
                                        </p>
                                        <p>
                                            <span className='font-bold'>Material: </span>{data.material ? data.material : "No Information"}
                                        </p>
                                        <p>
                                            <span className='font-bold'>Category: </span>{data.category ? data.category : "No Information"}
                                        </p>
                                        <p>
                                            <span className='font-bold'>Price: </span>{data.price ? data.price : "No Information"}$
                                        </p>
                                        <p>
                                            <span className='font-bold'>Details: </span>{data.details}
                                        </p>

                                    </div>
                                </div>

                                <div className='flex justify-around items-center flex-col gap-5 relative'>
                                    <p className='bg-red-500 rounded-xl w-5 h-5 text-white text-center absolute z-2 top-4 left-6'>{likeCount}</p>
                                    <p className='bg-black rounded-xl w-5 h-5 text-white text-center absolute z-2 bottom-[-4px] left-6'>{commentCount}</p>
                                    <button className="bg-red-500 rounded-xl w-10 h-8 text-white flex items-center justify-center cursor-pointer ">
                                        <FaHeart />
                                    </button>

                                    <button
                                        onClick={() => document.getElementById('my_modal_4').showModal()}

                                        className="bg-black rounded-xl w-10 h-8 text-white flex items-center justify-center cursor-pointer "
                                    >
                                        <FaComment />
                                    </button>
                                </div>
                            </div>
                            <div className=''>
                              
                                    <Comments comments={comments} />
                              

                            </div>
                        </div>
                        : <div className='flex justify-center items-center h-[50vh]'><ClockLoader color="#6f4e37"
                            size={150} /></div>}


                    <dialog id="my_modal_4" className="modal">
                        <div className="modal-box w-11/12 max-w-5xl">
                            <h3 className="font-bold text-lg">Write the comment</h3>

                            <form onSubmit={handleComment} className="card-body">

                                <div className="form-control">

                                    <textarea type="text" placeholder="Not more than 300 words" className="input text-xl" name='Comment' required ></textarea>
                                </div>


                                <div className="form-control mt-6 p-0">
                                    <button className="btn btn-success text-white" type='submit'
                                        disabled={submitted}>Submit</button>
                                </div>

                            </form>


                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button, it will close the modal */}
                                    <button className="btn btn-error text-white">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>


                </div>

            </div>



        </div>


    );
};

export default FamousDetails;


