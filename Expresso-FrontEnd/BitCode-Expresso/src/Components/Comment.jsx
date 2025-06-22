import React, { useContext, useEffect, useState } from 'react';
import FirstReplay from './FirstReplay';
import { AuthContext } from '../AuthProvider';
import { toast } from 'react-toastify';

const Comment = ({ comment, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);
  const [FirstReplies, setFirstReplies] = useState([]);
  const CommentData = comment;
  const [formVisible, setFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [editText, setEditText] = useState(CommentData.comment);

  useEffect(() => {
    fetch(`https://bit-expresso-server.onrender.com/FirstReplay/${CommentData._id}`)
      .then(res => res.json())
      .then(data => setFirstReplies(data));
  }, [CommentData._id]);

  const handleFirstReplySubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      fetch(`https://bit-expresso-server.onrender.com/CommentUpdate/${CommentData._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: editText }),
      })
        .then(res => res.json())
        .then(() => {
          toast.success("Comment updated");
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
        pid: CommentData.pid,
        auther: user?.displayName,
        cid: CommentData._id
      };

      setSubmitted(true);
      fetch('https://bit-expresso-server.onrender.com/FirstReplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ReplayDetails)
      }).then(res => {
        if (res.status === 200) {
          toast.success('Reply added');
          setFormVisible(false);
          setReplyText('');
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

  const handleDeleteReply = (id) => {
    fetch(`https://bit-expresso-server.onrender.com/DeleteFirst/${id}`, {
      method: 'DELETE',
    }).then(res => {
      if (res.ok) {
        toast.success("Reply deleted");
        setFirstReplies(prev => prev.filter(r => r._id !== id));
      } else {
        toast.error("Failed to delete reply");
      }
    });
  };

  return (
    <div className='w-[95%] md:w-[90%] mx-auto mt-4 border-t-2 border-black'>
      <div className="card bg-base-100 w-full shadow-sm p-3 md:p-4">
        <div className='flex flex-col md:flex-row justify-between gap-3 items-start md:items-center'>
          <div className='w-full'>
            <h2 className="card-title text-base md:text-lg font-semibold">{CommentData.auther}</h2>
            <p className='text-sm md:text-base break-words'>{CommentData.comment}</p>
          </div>
          <div className='flex flex-wrap gap-2 mt-2 md:mt-0'>
            <button onClick={handleReply} className="bg-black rounded-md px-4 py-1 text-white text-sm">
              Reply
            </button>
            {user?.uid === CommentData.uid && (
              <>
                <button onClick={handleUpdate} className="bg-green-500 rounded-md px-4 py-1 text-white text-sm">
                  Edit
                </button>
                <button onClick={() => onDelete(CommentData._id)} className="bg-red-500 rounded-md px-4 py-1 text-white text-sm">
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {formVisible && (
        <form onSubmit={handleFirstReplySubmit} className="card-body">
          <div className="form-control">
            <textarea
              name={isEditMode ? 'Update' : 'Replay'}
              placeholder="Not more than 300 words"
              className="input text-sm md:text-base textarea textarea-bordered"
              value={isEditMode ? editText : replyText}
              onChange={e => isEditMode ? setEditText(e.target.value) : setReplyText(e.target.value)}
              required
            />
          </div>
          <div className="form-control mt-4 flex gap-2">
            <button className="btn btn-success text-white text-sm md:text-base" type='submit' disabled={submitted}>
              Submit
            </button>
            <button type='button' className="btn btn-error text-white text-sm md:text-base" onClick={() => setFormVisible(false)}>
              Close
            </button>
          </div>
        </form>
      )}

      <div className='w-full flex justify-end'>
        <div className='w-full'>
          {FirstReplies.map((Replay, index) => (
            <FirstReplay key={index} Replay={Replay} onDelete={handleDeleteReply} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
