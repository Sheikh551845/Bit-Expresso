import React, {  useContext, useState } from 'react';
import { FaArrowLeft, FaComment, FaHeart } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthProvider';



const ProductDetails = () => {
    const navigate = useNavigate();
    const data = useLoaderData()
    const [submitted, setSubmitted]=useState(false)
    const {user}=useContext(AuthContext)
    
    console.log(data.likes)



    const handleComment = (event) => {
        
            event.preventDefault();
            const comment = event.target.Comment.value;
            if (comment.length > 300) {
                toast.error('Please use less than 300 word');
                return;
            }
            
            const commentDetails ={
                "uid":`${user.uid}`,
                 "comment": `${comment}`,
                 "pid":`${data._id}`
            }

        console.log(commentDetails)

         setSubmitted(true)
         event.target.reset();
   
        }

        

    return (
        <div className='bg-cover bg-center text-black shadow-sm items-center p-4 h-screen' style={{ backgroundImage: "url('../images/more/11.png')" }} >

            <div className='w-[80%] mx-auto' >

                <div>

                    <button onClick={() => navigate(-1)} className='flex gap-1 justify-center items-center text-base md:text-xl border-2 border-black p-3'>
                        <div className='text-3xl'>
                            <GoArrowLeft />
                        </div>

                        <p>Back</p>
                    </button>
                </div>

                {data ? <div className='bg-[#F4F3F0] w-full h-[300px] md:h-[500px] mt-2 md:mt-4 flex justify-around items-center'>
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
                        <p className='bg-red-500 rounded-xl w-5 h-5 text-white text-center absolute z-2 top-4 left-6'>{data.likes}</p>
                          <p className='bg-black rounded-xl w-5 h-5 text-white text-center absolute z-2 bottom-[-4px] left-6'>{data.comments}</p>
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


                </div> : <div className='flex justify-center items-center h-[50vh]'><ClockLoader color="#6f4e37"
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

    );
};

export default ProductDetails;


