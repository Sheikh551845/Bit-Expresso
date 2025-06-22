import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider';
import { toast } from 'react-toastify';

const ThirdTier = ({ SecondReplay, onDelete }) => {
    const { user } = useContext(AuthContext);
    const [submitted, setSubmitted] = useState(false);
    const [product, setProduct] = useState({});
    const [formVisible, setFormVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [editText, setEditText] = useState(SecondReplay.replay);
    const SecondReplayData = SecondReplay;

    useEffect(() => {
        fetch(`https://bit-expresso-server.onrender.com/OneCoffee/${SecondReplayData.pid}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [SecondReplayData.pid]);

    const handleSecondReplySubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            fetch(`https://bit-expresso-server.onrender.com/SecondUpdate/${SecondReplayData._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ replay: editText }),
            })
                .then(res => res.json())
                .then(() => {
                    toast.success("Reply updated");
                    setFormVisible(false);
                    setIsEditMode(false);
                });
        } else {
            if (replyText.length > 300) {
                toast.error('Please use less than 300 words');
                return;
            }

            const ReplayDetails = {
                uid: user?.uid,
                replay: replyText,
                pid: SecondReplayData.pid,
                auther: user?.displayName,
                rid: SecondReplayData.rid,
                cid: SecondReplayData.cid
            };

            setSubmitted(true);
            fetch('https://bit-expresso-server.onrender.com/SecondReplay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ReplayDetails)
            }).then(res => {
                if (res.status === 200) {
                    setFormVisible(false);
                    setReplyText('');
                    toast.success('Reply added');

                    const increase = product.comments + 1;
                    fetch(`https://bit-expresso-server.onrender.com/CommentCount/${product._id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ comments: increase })
                    }).then(res => {
                        if (res.status === 200) {
                            toast.success("Comment count updated");
                        }
                    });
                }
            });
        }
    };

    const handleReply = () => {
        setIsEditMode(false);
        setFormVisible(true);
    };

    const handleEdit = () => {
        setIsEditMode(true);
        setFormVisible(true);
    };

    return (
        <div className=''>
            <div className='w-full'>
                <div className="card bg-base-100 w-full shadow-sm p-2 border-t-4 border-green-600 my-1">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="w-full">
                            <h2 className="card-title text-sm md:text-lg">{SecondReplayData.auther}</h2>
                            <p className="text-xs md:text-base break-words">{SecondReplayData.replay}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={handleReply} className="bg-black text-white px-4 py-1 rounded-md text-xs md:text-sm">Reply</button>
                            {user?.uid === SecondReplayData?.uid && (
                                <>
                                    <button onClick={handleEdit} className="bg-green-500 text-white px-4 py-1 rounded-md text-xs md:text-sm">Edit</button>
                                    <button onClick={() => onDelete(SecondReplayData._id)} className="bg-red-500 text-white px-4 py-1 rounded-md text-xs md:text-sm">Delete</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {formVisible && (
                    <form onSubmit={handleSecondReplySubmit} className="card-body px-3 md:px-4">
                        <div className="form-control">
                            <textarea
                                type="text"
                                placeholder="Not more than 300 words"
                                className="input text-sm md:text-base textarea textarea-bordered"
                                name='SecondReplay'
                                value={isEditMode ? editText : replyText}
                                onChange={(e) => isEditMode ? setEditText(e.target.value) : setReplyText(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control mt-4 flex gap-2">
                            <button className="btn btn-success text-white text-xs md:text-base" type='submit' disabled={submitted}>Submit</button>
                            <button type="button" className="btn btn-error text-white text-xs md:text-base" onClick={() => setFormVisible(false)}>Close</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ThirdTier;
