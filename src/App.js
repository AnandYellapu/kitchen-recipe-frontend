import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import About from './pages/About';
import Foods from './pages/Foods/Foods';
import FoodDetail from './pages/Foods/FoodDetail';
import Layout from './components/Layout';
import HostLayout from './components/HostLayout';
import HostFoodDetail from './pages/Host/HostFoodDetail';
import EditFood from './components/EditFood';
import CreateFoodForm from './components/CreateFoodForm';
// import LoginPage from './components/LoginPage';
// import RegisterPage from './components/RegisterPage';
// import { UserContextProvider } from './UserContext';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

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
