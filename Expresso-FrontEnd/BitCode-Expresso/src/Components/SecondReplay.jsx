import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider';
import { toast } from 'react-toastify';
import ThirdTier from './ThirdTier';

const SecondReplay = ({ SecondReplay, onDelete }) => {
    const { user } = useContext(AuthContext);
    const [submitted, setSubmitted] = useState(false);
    const [SecondReplies, setSecondReplies] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [editText, setEditText] = useState(SecondReplay.replay);
    const SecondReplayData = SecondReplay;

    useEffect(() => {
        fetch(`https://expresso-back-end.vercel.app/SecondReplay/${SecondReplayData._id}`)
            .then(res => res.json())
            .then(data => setSecondReplies(data));
    }, [SecondReplayData._id]);

    const handleSecondReplySubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            // PATCH (Update) SecondReplay
            fetch(`https://expresso-back-end.vercel.app/SecondUpdate/${SecondReplayData._id}`, {
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
            // POST (Create) Second-level reply
            if (replyText.length > 300) {
                toast.error('Please use less than 300 words');
                return;
            }

            const ReplayDetails = {
                uid: user?.uid,
                replay: replyText,
                pid: SecondReplayData.pid,
                auther: user?.displayName,
                rid: SecondReplayData._id,
                cid: SecondReplayData.cid,
            };

            setSubmitted(true);
            fetch('https://expresso-back-end.vercel.app/SecondReplay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ReplayDetails),
            }).then(res => {
                if (res.status === 200) {
                    toast.success('Reply added');
                    setFormVisible(false);
                    setReplyText('');
                }
            });
        }
    };

    const handleEdit = () => {
        setIsEditMode(true);
        setFormVisible(true);
    };

    const handleReply = () => {
        setIsEditMode(false);
        setFormVisible(true);
    };

    const handleDeleteChild = (id) => {
        fetch(`https://expresso-back-end.vercel.app/DeteleSecond/${id}`, {
            method: 'DELETE',
        }).then((res) => {
            if (res.ok) {
                toast.success("Reply deleted");
                setSecondReplies(prev => prev.filter(r => r._id !== id));
            } else {
                toast.error("Failed to delete");
            }
        });
    };

    return (
        <div className='flex justify-end items-end'>
            <div className='w-[95%]'>
                <div className='w-full'>
                    <div className="card bg-base-100 w-full shadow-sm p-2 border-t-4 border-green-600 my-1">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="w-full">
                                <h2 className="card-title text-base md:text-lg">{SecondReplayData.auther}</h2>
                                <p className="text-sm md:text-base break-words">{SecondReplayData.replay}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={handleReply} className="bg-black text-white px-4 py-1 rounded-md text-sm">Reply</button>
                                {user?.uid === SecondReplayData?.uid && (
                                    <>
                                        <button onClick={handleEdit} className="bg-green-500 text-white px-4 py-1 rounded-md text-sm">Edit</button>
                                        <button onClick={() => onDelete(SecondReplayData._id)} className="bg-red-500 text-white px-4 py-1 rounded-md text-sm">Delete</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shared form for Reply or Edit */}
                {formVisible && (
                    <form onSubmit={handleSecondReplySubmit} className="card-body">
                        <div className="form-control">
                            <textarea
                                type="text"
                                placeholder="Not more than 300 words"
                                className="input text-xl"
                                name='SecondReplay'
                                value={isEditMode ? editText : replyText}
                                onChange={(e) => isEditMode ? setEditText(e.target.value) : setReplyText(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control mt-6 p-0 flex gap-2">
                            <button className="btn btn-success text-white" type='submit' disabled={submitted}>Submit</button>
                            <button type="button" className="btn btn-error text-white" onClick={() => setFormVisible(false)}>Close</button>
                        </div>
                    </form>
                )}

                {SecondReplies.map(child => (
                    <ThirdTier key={child._id} SecondReplay={child} onDelete={handleDeleteChild} />
                ))}
            </div>
        </div>
    );
};

export default SecondReplay;
