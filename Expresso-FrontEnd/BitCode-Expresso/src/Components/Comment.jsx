import React, { useContext, useEffect, useState, } from 'react';
import FirstReplay from './FirstReplay';

import { FaComment } from 'react-icons/fa';
import { AuthContext } from '../AuthProvider';
import { toast } from 'react-toastify';

const Comment = (comment) => {

    const { user } = useContext(AuthContext)
    const [submitted, setSubmitted] = useState(false)
    const [prodcut, setProduct] = useState({})
    const [FirstReplies, setFirstReplies] = useState([])
    const CommentData = comment.comment
    const [form, setForm] = useState("hidden")




    useEffect(() => {


        fetch(`http://localhost:5000/FamousOne/${CommentData.pid}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data)

            })
    }

        , [])







    useEffect(() => {


        fetch(`http://localhost:5000/FirstReplay/${CommentData._id}`)
            .then(res => res.json())
            .then(data => {
                setFirstReplies(data)

            })
    }

        , [])




    const handleFirstReplay = (event) => {

        setForm("block")



        event.preventDefault();
        const Replay = event.target.Replay.value;
        if (Replay.length > 300) {
            toast.error('Please use less than 300 word');
            return;
        }

        const ReplayDetails = {
            "uid": `${user?.uid}`,
            "replay": `${Replay}`,
            "pid": `${prodcut._id}`,
            "auther": `${user?.displayName}`,
            "cid": `${CommentData._id}`
        }
        setSubmitted(true)
        fetch('http://localhost:5000/FirstReplay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ReplayDetails)
        })
            .then(res => {

                if (res.status == 200) {
                    setForm("hidden")

                    toast.success('Comment added')

                    const increase = prodcut.comments + 1;

                    fetch(`http://localhost:5000/FamousCommentCount/${prodcut._id}`, {
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

        <div className='w-[90%]  mx-auto mt-4 border-t-3 border-black'>
            <div className="card bg-base-100 w-full shadow-sm p-2">

                <div className='flex justify-between items-center'>
                    <div>
                        <h2 className="card-title">{CommentData.auther}</h2>
                        <p className='text-xl'>{CommentData.comment}</p>
                    </div>
                    <div className='flex justify-between items-center gap-3'>
                        <button
                            onClick={() => handleFirstReplay()}

                            className="bg-black rounded-xl w-12 h-8 text-white flex items-center justify-center cursor-pointer p-2 "
                        >
                            Replay
                        </button>

                        {user?.uid === CommentData.uid ? <div className='flex justify-between items-center gap-3'> <button


                            className="bg-green-500 rounded-xl w-12 h-8 text-white flex items-center justify-center cursor-pointer p-2 "
                        >
                            Edit
                        </button>
                            <button


                                className="bg-red-500 rounded-xl w-12 h-8 text-white flex items-center justify-center cursor-pointer p-2 "
                            >
                                Delete
                            </button></div> : ''}


                    </div>

                </div>


            </div>
            <form onSubmit={handleFirstReplay} className={`card-body ${form}`}>

                <div className="form-control">

                    <textarea type="text" placeholder="Not more than 300 words" className="input text-xl" name='Replay' required ></textarea>
                </div>


                <div className="form-control mt-6 p-0 flex gap-2 ">
                    <button className="btn btn-success text-white" type='submit'
                        disabled={submitted}>Submit</button>

                    <button className="btn btn-error text-white" type='submit'
                        onClick={() => setForm("hidden")}>Close</button>
                    <button></button>
                </div>

            </form>
            <div className='w-full flex justify-end items-end'>

                {FirstReplies[0]?.cid == CommentData._id ? <div className='w-full'>
                    {FirstReplies.map((Replay, index) => (
                        <FirstReplay key={index} Replay={Replay} />
                    ))}
                </div> : ''}
                {/* {FirstReplies[0].cid} */}



            </div>


        </div>
    );
};

export default Comment;