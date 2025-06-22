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
    fetch(`https://bit-expresso-server.onrender.com/SecondReplay/${ReplayData._id}`)
      .then(res => res.json())
      .then(data => setSecondReplies(data));
  }, [ReplayData._id]);

  const handleSecondReplySubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      fetch(`https://bit-expresso-server.onrender.com/FirstUpdate/${ReplayData._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replay: editText }),
      })
        .then(res => res.json())
        .then(() => {
          toast.success("Reply updated");
          setFormVisible(false);
          setIsEditMode(false);
          setEditText('');
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
      fetch('https://bit-expresso-server.onrender.com/SecondReplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ReplayDetails)
      }).then(res => {
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
    fetch(`https://bit-expresso-server.onrender.com/DeteleSecond/${id}`, {
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
      <div className='w-full md:w-[95%]'>
        <div className='w-full flex justify-end items-end mt-2'>
          <div className="card bg-base-100 w-full shadow-sm p-3 md:p-4 border-t-4 border-amber-700">
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-3'>
              <div className='w-full'>
                <h2 className="card-title text-sm md:text-lg font-semibold">{ReplayData.auther}</h2>
                <p className='text-sm md:text-base break-words'>{ReplayData.replay}</p>
              </div>
              <div className='flex flex-wrap gap-2'>
                <button onClick={handleReply} className="bg-black text-white px-4 py-1 rounded-md text-sm">Reply</button>
                {user?.uid === ReplayData.uid && (
                  <>
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-1 rounded-md text-sm">Edit</button>
                    <button onClick={() => onDelete(ReplayData._id)} className="bg-red-500 text-white px-4 py-1 rounded-md text-sm">Delete</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {formVisible && (
          <form onSubmit={handleSecondReplySubmit} className="card-body px-3 md:px-4">
            <div className="form-control">
              <textarea
                name={isEditMode ? 'Update' : 'SecondReply'}
                placeholder="Not more than 300 words"
                className="input text-sm md:text-base textarea textarea-bordered"
                value={isEditMode ? editText : replyText}
                onChange={e => isEditMode ? setEditText(e.target.value) : setReplyText(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-4 flex gap-2">
              <button className="btn btn-success text-white text-sm md:text-base" type='submit' disabled={submitted}>Submit</button>
              <button type='button' className="btn btn-error text-white text-sm md:text-base" onClick={() => setFormVisible(false)}>Close</button>
            </div>
          </form>
        )}

        <div className='w-full'>
          {SecondReplies.map((secondReplay, index) => (
            <SecondReplay key={index} SecondReplay={secondReplay} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirstReplay;
