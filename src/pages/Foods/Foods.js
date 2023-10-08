import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      console.error('Token is missing. Redirecting to login.');
      // Redirect the user to the login page or handle it as needed
      // Example: navigate('/login');
      return;
    }

    console.log('Token:', token);

    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };

    axios
      .get('https://kitchen-recipe.onrender.com/api/food', { headers })
      .then((response) => {
        const data = response.data;
        console.log(data); // Log the entire response data
        setFoods(data.data);

        // Check if the user is an admin
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userRole = decodedToken.user.role;
        setIsAdmin(userRole === 'admin');

        // Log whether the user is an admin or not
        console.log(`User is ${userRole === 'admin' ? 'admin' : 'not admin'}`);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.error('Invalid token. Redirecting to login.');
          // Example: navigate('/login');
        } else {
          console.error(error);
        }
      });
  }, []);

  const handleCreateFood = () => {
    navigate('/host/foods/create');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFoods = foods.filter((food) => {
    const nameMatch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const typeMatch = food.type.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || typeMatch;
  });

  if (foods.length === 0) {
    return <p className='loading'>Loading...</p>;
  }

  return (
    <div className="foods-container">
      <h1 className="foods-title">Foods</h1>
      <div className="foods-header">
        {isAdmin && (
          <div>
            <AddCircleOutlineIcon
              onClick={handleCreateFood}
              style={{
                fontSize: '40px',
                color: 'black',
                marginLeft: '50px',
                marginBottom: '18px',
                background: 'linear-gradient(45deg, #FF9F00, #FFC837)',
                borderRadius: '10px',
                padding: '10px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
              }}
            />
          </div>
        )}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <SearchIcon className="search-icon" />
        </div>
      </div>

      {filteredFoods.length > 0 ? (
        <div className="food-list">
          {filteredFoods.map((food) => {
            return (
              <div key={food._id} className="food-item">
                <Link to={`/foods/${food._id}`}>
                  <img src={food.imageUrl} alt={food.name} className="food-image" />
                  <h3 className="food-name">{food.name}</h3>
                  <p className="food-type">Type: {food.type}</p>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p className='no-food'>No foods found.</p>
      )}
    </div>
  );
};

export default Foods;
