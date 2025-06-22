
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,  signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { auth } from './Firebase.config';



export const AuthContext = createContext(null);







export default function AuthProvider({children}) {


 
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [CartData, setCartData] = useState([])

  const [allComment, setAllComments]=useState([])
  const [allFirst, setAllFirst]=useState([])
  const [allSecond, setAllSecond]=useState([])




  useEffect(()=>{
   fetch(`https://bit-expresso-server.onrender.com/AllComment`)
            .then(res => res.json())
            .then(data => {
                setAllComments(data)

            })


  },
  [])

  useEffect(()=>{
   fetch(`https://bit-expresso-server.onrender.com/AllFirst`)
            .then(res => res.json())
            .then(data => {
                setAllFirst(data)

            })


  },
  [])

    useEffect(()=>{
   fetch(`https://bit-expresso-server.onrender.com/AllSecond`)
            .then(res => res.json())
            .then(data => {
                setAllSecond(data)

            })


  },
  [])
 


  

//Email
const crateEmailUser = (email, password)=>
{
  setLoading(true)
  return createUserWithEmailAndPassword(auth, email, password)
}

//Email login

const login=(email,password)=>
{
  setLoading(true)
   return signInWithEmailAndPassword(auth,email,password)
}

//Log Out

const logout=()=>
{
  return signOut(auth)
}



   //Observer
   useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false)
       
    });
}, [])

const update=(name)=>
{
  return updateProfile(auth.currentUser,{displayName: name})
}

  


   
   

  const authInformation ={
    data,

    crateEmailUser,
    login,
    user,
    logout,
    update,
    allComment,
    allFirst,
    allSecond
   
  }
 
    
   

   
  return (
   <AuthContext.Provider value={authInformation}>
    {children}
   </AuthContext.Provider>
  )
}
