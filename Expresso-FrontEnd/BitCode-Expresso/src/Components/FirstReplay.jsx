import React, { useContext, useEffect, useState } from 'react';
import SecondReplay from './SecondReplay';
import { AuthContext } from '../AuthProvider';
import { toast } from 'react-toastify';

const FirstReplay = (Replay) => {

    const { user } = useContext(AuthContext)
    const [submitted, setSubmitted] = useState(false)
    const [prodcut, setProduct] = useState({})
    const [SecondReplies, setSecondReplies] = useState([])
    const ReplayData = Replay.Replay
    const [form, setForm] = useState("hidden")

    useEffect(() => {


        fetch(`http://localhost:5000/FamousOne/${ReplayData.pid}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data)

            })
    }

        , [])







    useEffect(() => {


        fetch(`http://localhost:5000/SecondReplay/${ReplayData._id}`)
            .then(res => res.json())
            .then(data => {
                setSecondReplies(data)

            })
    }

        , [])


    




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
            "rid": `${ReplayData._id}`,
            "cid": `${ReplayData.cid}`
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
        <div className='flex justify-end items-end '>
            <div className=' w-[95%] '>
                <div className=''>
                    <div className='w-full flex justify-end items-end  mt-2 '>
                        <div className="card bg-base-100 min-w-full shadow-sm p-2 border-t-3 border-amber-700">

                            <div className='flex justify-between items-center'>
                                <div>
                                    <h2 className="card-title">{ReplayData.auther}</h2>
                                    <p className='text-xl'>{ReplayData.replay}</p>
                                </div>
                                <div className='flex justify-between items-center gap-3'>
                                    <button

                                        onClick={() => handleSecondReplay()}
                                        className="bg-black rounded-xl w-12 h-8 text-white flex items-center justify-center cursor-pointer p-2 "
                                    >
                                        Replay
                                    </button>

                                    {user?.uid === ReplayData.uid ? <div className='flex justify-between items-center gap-3'> <button


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
                <div className='w-full '>
                    
                                        {SecondReplies?.map((SeconddReplay, index) => (
                                           <SecondReplay keys={index} SecondReplay={SeconddReplay}></SecondReplay>
                                        ))}
                               
                    
                </div>

            </div>

        </div>

    );
};

export default FirstReplay;


