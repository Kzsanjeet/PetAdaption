import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import SignUp from './components/SignUp.jsx'
import SignIn from './components/SignIn.jsx'
import NotFound from './components/NotFound.jsx'
import Dashboard from './components/Dashboard.jsx'
import Layout from './components/Layout.jsx'
import AdminLayout from './components/AdminLayout.jsx'
import './index.css'
import AddShelter from './components/AddShelter.jsx'
import ShelterLogin from './components/ShelterLogin.jsx'
import ShelterDashboard from './components/ShelterDashboard.jsx'
import PetList from './components/PetList.jsx'
import ShelterLayout from './components/ShelterLayout.jsx'
import Navbar from './components/Navbar.jsx'
import Admin from './components/Admin.jsx'
import AdminRegister from './components/AdminRegister.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import CategoryPets from './components/CategoryPets.jsx'
import FilterPets from './components/FilterPets.jsx'
import Feedback from './components/feedback.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><App/></Layout>
  },
  {
    path: '/signup',
    element: <SignUp/>
  },
  {
    path: '/signin',
    element:<SignIn/>
  },
  {
    path: '/dashboard',
    element: <AdminLayout><Dashboard /></AdminLayout>
  },
  {
    path:'/addshelter',
    element: <AddShelter />
  },
  {
    path:'/shelterlogin',
    element: <Layout><ShelterLogin /></Layout>
  },
  {
    path:'/shelterdashboard',
    element: <ShelterLayout><ShelterDashboard /></ShelterLayout>
  },
  {
    path: '/petlist',
    element: <ShelterLayout><PetList /></ShelterLayout>
  },
  {
    path: '/admin',
    element:<Layout><Admin /></Layout>
  },
  {
    path: '/admin-register',
    element:<Layout><AdminRegister /></Layout>
  },
  {
    path: '/detail/:id',
    element:<Layout><ProductDetail /></Layout>
  },
  {
    path:'/category/:dog',
    element: <Layout><CategoryPets category ="dog"/></Layout>
  },
  {
    path:'/filterpets',
    element:<Layout><FilterPets /></Layout>
  },
  {
    path:'/addfeedback',
    elemment: <Feedback />
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router ={router} />
  </React.StrictMode>,
)
