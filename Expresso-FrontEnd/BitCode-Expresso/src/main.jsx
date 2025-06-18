import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './Pages/Home.jsx';
import ErrorPage from './Pages/Error.jsx';
import { ToastContainer } from 'react-toastify';
import About from './Pages/About.jsx';
import AllProducts from './Pages/AllProducts.jsx';
import AuthProvider from './AuthProvider.jsx';
import Login from './Pages/Login.jsx';
import Registration from './Pages/Registration.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children:
      [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: "/About",
          element: <About></About>
        },
        {
          path: "/AllProducts",
          element: <AllProducts></AllProducts>
        },
        {
          path:"/Login",
          element:<Login></Login>
        },
        {
          path:"/Registration",
          element: <Registration></Registration>
        }
      ]

  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>

      <RouterProvider router={router} />


    </AuthProvider>



  </StrictMode>,
)
