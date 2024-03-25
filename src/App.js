import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import CreateRecipe from './components/CreateRecipe';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import EditRecipe from './components/EditRecipe';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
     
        <Route path='/create' element={<>
          <Header />
          <CreateRecipe />
        </>} />
        <Route path='/all' element={<>
          <Header />
          <RecipeList />
        </>} />
        <Route path='/get/:id' element={<>
          <Header />
          <RecipeDetails />
        </>} />
        <Route path='/update/:id' element={<>
          <Header />
          <EditRecipe />
        </>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
