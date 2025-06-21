import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext,  useRef } from 'react';
import { AuthContext } from '../AuthProvider';

export default function PrivatePage({ children }) {
  const { user } = useContext(AuthContext);
  const toastShown = useRef(false); 

const location = useLocation()

  if (!user?.email) {
    if (!toastShown.current) {
      toast.error("Please Log In");
      toastShown.current = true;
    }
    return <Navigate to='/Login' state={location.pathname}/>;
  }

  return children;
}
