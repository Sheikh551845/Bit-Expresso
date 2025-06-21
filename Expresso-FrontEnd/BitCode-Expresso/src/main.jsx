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
import ProductDetails from './Pages/ProductDetails.jsx';
import Test from './Pages/test.jsx';
import FamousDetails from './Pages/FamousDetail.jsx';
import PrivateRoute from './Pages/PrivatePage.jsx';
import PrivatePage from './Pages/PrivatePage.jsx';





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
          path: "/FamousDetails/:id",
          element:<PrivatePage><FamousDetails/></PrivatePage> ,
          loader: async ({ params }) => {
            return fetch(`http://localhost:5000/FamousOne/${params.id}`);
          },
        },

         {
          path: "/GeneralDetails/:id",
          element: <PrivateRoute><FamousDetails></FamousDetails></PrivateRoute>,
          loader: async ({ params }) => {
            return fetch(`http://localhost:5000/General/${params.id}`);
          },
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
          path: "/Login",
          element: <Login></Login>
        },
        {
          path: "/Registration",
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
