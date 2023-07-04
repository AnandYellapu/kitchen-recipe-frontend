import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../index.css';

const FoodDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/food/${id}`);
        console.log(response.data);
        setFood(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFood(params.id);
  }, [params.id]);

  const handleTryFood = () => {
    navigate(`/host/foods/${params.id}`);
  };

  return (
    <div className="food-detail-container">
      {loading ? (
        <h2>Loading....</h2>
      ) : food ? (
        <div className="food-detail">
          <img src={food.imageUrl} alt={food.imageUrl} />
          <h3 className="highlighted-heading" style={{ textAlign: 'center' }}>{food.name}</h3>
          <p>{food.description}</p>
          <button className="link-button" onClick={handleTryFood}>
            Try this Food
          </button>
        </div>
      ) : (
        <h2>Food not found.</h2>
      )}
    </div>
  );
};

export default FoodDetail;
