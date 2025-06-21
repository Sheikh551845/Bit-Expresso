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
    fetch(`http://localhost:5000/FirstReplay/${CommentData._id}`)
      .then(res => res.json())
      .then(data => setFirstReplies(data));
  }, [CommentData._id]);

  const handleFirstReplySubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
  
      fetch(`http://localhost:5000/CommentUpdate/${CommentData._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: editText }),
      })
        .then(res => res.json())
        .then(() => {
          toast.success("Comment updated");
          setFormVisible(false);
          setIsEditMode(false);
          setEditText('')
        });

    console.log(typeof(editText))
    } else {
      // ADD a new reply
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

      console.log(ReplayDetails)

      setSubmitted(true);
      fetch('http://localhost:5000/FirstReplay', {
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
    fetch(`http://localhost:5000/DeleteFirst/${id}`, {
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
    <div className='w-[90%] mx-auto mt-4 border-t-3 border-black'>
      <div className="card bg-base-100 w-full shadow-sm p-2">
        <div className='flex justify-between items-center'>
          <div>
            <h2 className="card-title">{CommentData.auther}</h2>
            <p className='text-xl'>{CommentData.comment}</p>
          </div>
          <div className='flex gap-3'>
            <button onClick={handleReply} className="bg-black rounded-xl w-12 h-8 text-white flex items-center justify-center p-2">Reply</button>
            {user?.uid === CommentData.uid && (
              <>
                <button onClick={handleUpdate} className="bg-green-500 rounded-xl w-12 h-8 text-white flex items-center justify-center p-2">Edit</button>
                <button onClick={() => onDelete(CommentData._id)} className="bg-red-500 rounded-xl w-12 h-8 text-white flex items-center justify-center p-2">Delete</button>
              </>
            )}
          </div>
        </div>
      </div>

      {formVisible && (
        <form onSubmit={handleFirstReplySubmit} className="card-body">
          {!isEditMode ? (
            <div className="form-control">
              <textarea
                name='Replay'
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
