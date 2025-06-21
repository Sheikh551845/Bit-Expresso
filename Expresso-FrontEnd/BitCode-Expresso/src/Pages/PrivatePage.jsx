import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useRef } from 'react';
import { AuthContext } from '../AuthProvider';

export default function PrivatePage({ children }) {
  const { user } = useContext(AuthContext);
  const toastShown = useRef(false); 

  if (!user?.email) {
    if (!toastShown.current) {
      toast.error("Please Log In");
      toastShown.current = true;
    }
    return <Navigate to='/Login' />;
  }

  return children;
}
