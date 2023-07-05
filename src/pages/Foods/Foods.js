import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://kitchen-recipe.onrender.com/api/food')
      .then((response) => {
        const data = response.data;
        console.log(data); // Log the entire response data
        setFoods(data.data);
      })
      .catch((error) => console.error(error));
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
    return <p>Loading...</p>;
  }

  return (
    <div className="foods-container">
      <h1 className="foods-title">Foods</h1>
      <div className="foods-header">
        <div>
          <AddCircleOutlineIcon
            onClick={handleCreateFood}
           style={{
              fontSize: '40px',
              color: 'black',
              marginLeft: '50px',
              marginBottom:'18px',
              background: 'linear-gradient(45deg, #FF9F00, #FFC837)',
              borderRadius: '10px',
              padding: '10px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
            }}
           
          />
        </div>
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
        <p>No foods found.</p>
      )}
    </div>
  );
};

export default Foods;
