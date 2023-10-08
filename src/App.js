import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './components/Dashboard';
import Foods from './pages/Foods/Foods';
import FoodDetail from './pages/Foods/FoodDetail';
import Layout from './components/Layout';
import HostLayout from './components/HostLayout';
import HostFoodDetail from './pages/Host/HostFoodDetail';
import EditFood from './components/EditFood';
import CreateFoodForm from './components/CreateFoodForm';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Logout from './components/auth/Logout';



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="foods" element={<Foods />} />
          <Route path="foods/:id" element={<FoodDetail />} />
          <Route path="foods/:id/edit" element={<EditFood />} />

          <Route path="host" element={<HostLayout />}>
            <Route path="foods/:id" element={<HostFoodDetail />} />
            <Route path="foods/create" element={<CreateFoodForm />} />
        </Route>

        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;




