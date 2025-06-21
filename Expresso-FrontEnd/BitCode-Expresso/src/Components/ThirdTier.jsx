import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider';
import { toast } from 'react-toastify';

const ThirdTier = (SecondReplay) => {
    const { user } = useContext(AuthContext)
    const [submitted, setSubmitted] = useState(false)
    const [prodcut, setProduct] = useState({})
    const [SecondReplies, setSecondReplies] = useState([])
    const [form, setForm] = useState("hidden")
    const SecondReplayData = SecondReplay.SecondReplay



    useEffect(() => {


        fetch(`http://localhost:5000/SecondReplay/${SecondReplayData._id}`)
            .then(res => res.json())
            .then(data => {
                setSecondReplies(data)

            })
    }

        , [])




    useEffect(() => {


        fetch(`http://localhost:5000/FamousOne/${SecondReplayData.pid}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data)

            })
    }

        , [])


    console.log(`i am inside ${SecondReplayData._id}`)

    console.log(SecondReplies)









    const handleSecondReplay = (event) => {

        setForm("block")



        event.preventDefault();
        const Replay = event.target.SecondReplay.value;
        if (Replay.length > 300) {
            toast.error('Please use less than 300 word');
            return;
        }

        const ReplayDetails = {
            "uid": `${user?.uid}`,
            "replay": `${Replay}`,
            "pid": `${prodcut._id}`,
            "auther": `${user?.displayName}`,
            "rid": `${SecondReplayData.rid}`,
            "cid": `${SecondReplayData.cid}`
        }
        setSubmitted(true)
        fetch('http://localhost:5000/SecondReplay', {
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

            <div className=''>
                <div className='w-full'>

        
                        <div
                            className="card bg-base-100 w-full shadow-sm p-2 border-t-4 border-green-600 my-1 "
                            
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                {/* Author and Reply Content */}
                                <div className="w-full">
                                    <h2 className="card-title text-base md:text-lg">{SecondReplayData.auther}</h2>
                                    <p className="text-sm md:text-base break-words">{SecondReplayData.replay}</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex  gap-2">
                                    <button
                                        onClick={() => handleSecondReplay()}
                                        className="bg-black text-white px-4 py-1 rounded-md text-sm"
                                    >
                                        Reply
                                    </button>

                                    {user?.uid === SecondReplayData?.uid && (
                                        <>
                                            <button className="bg-green-500 text-white px-4 py-1 rounded-md text-sm">
                                                Edit
                                            </button>
                                            <button className="bg-red-500 text-white px-4 py-1 rounded-md text-sm">
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
          







                </div>
                <form onSubmit={handleSecondReplay} className={`card-body ${form}`}>

                    <div className="form-control">

                        <textarea type="text" placeholder="Not more than 300 words" className="input text-xl" name='SecondReplay' required ></textarea>
                    </div>


                    <div className="form-control mt-6 p-0 flex gap-2 ">
                        <button className="btn btn-success text-white" type='submit'
                            disabled={submitted}>Submit</button>

                        <button className="btn btn-error text-white" type='submit'
                            onClick={() => setForm("hidden")}>Close</button>
                        <button></button>
                    </div>

                </form>

               
            </div>

    );
};

export default ThirdTier;