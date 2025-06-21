import React, { useContext, useEffect, useState } from 'react';
import { FaComment, FaHeart } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthProvider';
import Comments from '../Components/Comments';
import { ClockLoader } from 'react-spinners';

const FamousDetails = () => {
    const navigate = useNavigate();
    const data = useLoaderData();
    const { user } = useContext(AuthContext);

    const [submitted, setSubmitted] = useState(false);
    const [commentCount, setCommentCount] = useState(data.comments);
    const [likeCount, setLikeCount] = useState(data.likes);
    const [hasLiked, setHasLiked] = useState(false);
    const [comments, setComments] = useState([]);





    useEffect(() => {
        if (user?.uid) {
            fetch(`https://expresso-back-end.vercel.app/hasLiked/${data._id}/${user.uid}`)
                .then(res => res.json())
                .then(data => {
                    setHasLiked(data.hasLiked); // backend should return { hasLiked: true/false }
                });
        }
    }, [user, data._id]);

    useEffect(() => {
        fetch(`https://expresso-back-end.vercel.app/Comment/${data._id}`)
            .then(res => res.json())
            .then(data => {
                setComments(data);
            });
    }, [data._id]);

    const handleComment = (event) => {
        event.preventDefault();
        const comment = event.target.Comment.value;
        if (comment.length > 300) {
            toast.error('Please use less than 300 words');
            return;
        }

        const commentDetails = {
            uid: user?.uid,
            comment,
            pid: data._id,
            auther: user?.displayName,
        };

        setSubmitted(true);
        fetch('https://expresso-back-end.vercel.app/Comment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentDetails)
        })
            .then(res => {
                if (res.status === 200) {
                    setCommentCount(prev => prev + 1);
                    toast.success('Comment added');

                    fetch(`https://expresso-back-end.vercel.app/CommentCount/${data._id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ comments: commentCount + 1 })
                    })
                        .then(res => {
                            if (res.status === 200) toast.success('Comment count updated');
                        });
                }
            });
    };

    const handleLike = () => {
    if (hasLiked) return toast.warning("You already liked this!");

    const newLikeCount = likeCount + 1;
    setLikeCount(newLikeCount);
    setHasLiked(true);

    const likeDetails = {
        uid: user.uid,
        pid: data._id
    };

    // First: Add like entry to "Liked info" collection
    fetch(`https://expresso-back-end.vercel.app/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(likeDetails)
    })
        .then(res => {
            if (res.status === 200) {
                toast.success('Liked!');

                // ✅ Then: Update like count in product main data
                fetch(`https://expresso-back-end.vercel.app/LikeCount/${data._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ likes: newLikeCount })
                })
                    .then(res => {
                        if (res.status === 200) {
                            toast.success('Like count updated');
                        } else {
                            toast.error('Failed to update like count');
                        }
                    });

            } else {
                toast.error('Failed to like');
                setLikeCount(prev => prev - 1);
                setHasLiked(false);
            }
        });
};


    return (
        <div className="min-h-screen bg-cover bg-center mt-4" style={{ backgroundImage: "url('../images/more/11.png')" }}>
            <div className="w-[90%] md:w-[80%] mx-auto py-6">
                <button
                    onClick={() => navigate("/")}
                    className="flex gap-2 items-center text-base md:text-xl border-2 border-black px-4 py-2 mb-4"
                >
                    <GoArrowLeft className="text-2xl" />
                    <span>Back</span>
                </button>

                {data ? (
                    <div className="bg-[#F4F3F0] w-full rounded-md shadow-md p-4 space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="w-full md:w-1/2 flex justify-center">
                                <img src={data.image} alt={data.name} className="w-full max-w-sm rounded-md" />
                            </div>

                            <div className="w-full md:w-1/2 space-y-2">
                                <p className="text-xl font-bold md:text-4xl text-[#6f4e37] mb-2">Niceties</p>
                                <p><span className="font-bold">Name: </span>{data.name}</p>
                                <p><span className="font-bold">Material: </span>{data.material || 'No Information'}</p>
                                <p><span className="font-bold">Category: </span>{data.category || 'No Information'}</p>
                                <p><span className="font-bold">Price: </span>{data.price ? `${data.price}$` : 'No Information'}</p>
                                <p><span className="font-bold">Details: </span>{data.details}</p>
                            </div>

                            <div className='flex justify-around items-center flex-col gap-5 relative'>
                                <p className='bg-red-500 rounded-xl w-5 h-5 text-white text-center absolute z-2 top-4 left-6'>{likeCount}</p>
                                <p className='bg-black rounded-xl w-5 h-5 text-white text-center absolute z-2 bottom-[-4px] left-6'>{commentCount}</p>
                                <button onClick={handleLike} className="bg-red-500 rounded-xl w-10 h-8 text-white flex items-center justify-center cursor-pointer">
                                    <FaHeart />
                                </button>

                                <button
                                    onClick={() => document.getElementById('my_modal_4').showModal()}
                                    className="bg-black rounded-xl w-10 h-8 text-white flex items-center justify-center cursor-pointer"
                                >
                                    <FaComment />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-y-auto max-h-[400px]">
                            <Comments comments={comments} Prodcutinfo={data} />
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-[50vh]">
                        <ClockLoader color="#6f4e37" size={150} />
                    </div>
                )}

                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">Write the comment</h3>
                        <form onSubmit={handleComment} className="card-body">
                            <div className="form-control">
                                <textarea
                                    name='Comment'
                                    placeholder="Not more than 300 words"
                                    className="input text-xl textarea textarea-bordered"
                                    required
                                ></textarea>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-success text-white" type='submit' disabled={submitted}>Submit</button>
                            </div>
                        </form>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn btn-error text-white">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default FamousDetails;
