
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,  signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { auth } from './Firebase.config';



export const AuthContext = createContext(null);







export default function AuthProvider({children}) {


 
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [CartData, setCartData] = useState([])
 


  

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

  


   
   
    // useEffect(()=>{
    // fetch("https://zt-ech-backend-i7c5jj7n8-sheikh-mohammads-projects.vercel.app/AllProducts")
    // .then ((res)=> res.json())
    // .then((data)=>setData(data))
    // } ,[])


    // useEffect(()=>{
    //   fetch("https://zt-ech-backend-i7c5jj7n8-sheikh-mohammads-projects.vercel.app/MyCart")
    //   .then ((res)=> res.json())
    //   .then((data)=>{setCartData(data)
    //   })
    //   } ,[])

  const authInformation ={
    data,

    crateEmailUser,
    login,
    user,
    logout,
    loading,
    update,
    CartData,
    setCartData,
   
  }
 
    
   

   
  return (
   <AuthContext.Provider value={authInformation}>
    {children}
   </AuthContext.Provider>
  )
}
