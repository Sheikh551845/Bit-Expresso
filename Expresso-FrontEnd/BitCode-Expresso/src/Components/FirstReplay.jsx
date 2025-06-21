import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../AuthProvider';
import { toast } from 'react-toastify';
import SecondReplay from './SecondReplay';

const FirstReplay = ({ Replay, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);
  const [SecondReplies, setSecondReplies] = useState([]);
  const ReplayData = Replay;
  const [formVisible, setFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [editText, setEditText] = useState(ReplayData.replay);

  useEffect(() => {
    fetch(`http://localhost:5000/SecondReplay/${ReplayData._id}`)
      .then(res => res.json())
      .then(data => setSecondReplies(data));
  }, [ReplayData._id]);

  const handleSecondReplySubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      fetch(`http://localhost:5000/FirstUpdate/${ReplayData._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replay: editText }),
      })
        .then(res => res.json())
        .then(() => {
          toast.success("Reply updated");
          setFormVisible(false);
          setIsEditMode(false);
          setEditText('')
        });
    } else {
      if (replyText.length > 300) {
        toast.error('Please use less than 300 words');
        return;
      }

      const ReplayDetails = {
        uid: user?.uid,
        replay: replyText,
        pid: ReplayData.pid,
        auther: user?.displayName,
        rid: ReplayData._id,
        cid: ReplayData.cid
      };

      setSubmitted(true);
      fetch('http://localhost:5000/SecondReplay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ReplayDetails)
      })
        .then(res => {
          if (res.status === 200) {
            setFormVisible(false);
            setReplyText('');
            toast.success('Reply added');
          }
        });
    }
  };

  const handleUpdate = () => {
    setIsEditMode(true);
    setFormVisible(true);
  };

  const handleReply = () => {
    setIsEditMode(false);
    setFormVisible(true);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/DeteleSecond/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok) {
        toast.success("Reply deleted");
        setSecondReplies((prev) => prev.filter(r => r._id !== id));
      } else {
        toast.error("Failed to delete");
      }
    });
  };

  return (
    <div className='flex justify-end items-end'>
      <div className='w-[95%]'>
        <div className='w-full flex justify-end items-end mt-2'>
          <div className="card bg-base-100 min-w-full shadow-sm p-2 border-t-3 border-amber-700">
            <div className='flex justify-between items-center'>
              <div>
                <h2 className="card-title">{ReplayData.auther}</h2>
                <p className='text-xl'>{ReplayData.replay}</p>
              </div>
              <div className='flex gap-3'>
                <button onClick={handleReply} className="bg-black rounded-xl w-12 h-8 text-white flex items-center justify-center p-2">Reply</button>
                {user?.uid === ReplayData.uid && (
                  <>
                    <button onClick={handleUpdate} className="bg-green-500 rounded-xl w-12 h-8 text-white flex items-center justify-center p-2">Edit</button>
                    <button onClick={() => onDelete(ReplayData._id)} className="bg-red-500 rounded-xl w-12 h-8 text-white flex items-center justify-center p-2">Delete</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {formVisible && (
          <form onSubmit={handleSecondReplySubmit} className="card-body">
            {!isEditMode ? (
              <div className="form-control">
                <textarea
                  name='SecondReply'
                  placeholder="Not more than 300 words"
                  className="input text-xl"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  required
                />
              </div>
            ) : (
              <div className="form-control">
                <textarea
                  name='Update'
                  placeholder="Not more than 300 words"
                  className="input text-xl"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="form-control mt-6 flex gap-2">
              <button className="btn btn-success text-white" type='submit' disabled={submitted}>Submit</button>
              <button type='button' className="btn btn-error text-white" onClick={() => setFormVisible(false)}>Close</button>
            </div>
          </form>
        )}

        <div className='w-full'>
          {SecondReplies?.map((secondReplay, index) => (
            <SecondReplay key={index} SecondReplay={secondReplay} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirstReplay;
