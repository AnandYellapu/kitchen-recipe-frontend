import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const EditFood = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [foodProcess, setFoodProcess] = useState(food ? food.foodProcess : []);
  const [ingredients, setIngredients] = useState([]);
  const [numPersons, setNumPersons] = useState(1);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const fetchedFood = await getFoodById(id);
        setFood(fetchedFood);
        setName(fetchedFood.name);
        setImageUrl(fetchedFood.imageUrl);
        setDescription(fetchedFood.description);
        setType(fetchedFood.type);
        setFoodProcess(fetchedFood.foodProcess);
        setIngredients(JSON.parse(fetchedFood.ingredients));
      } catch (error) {
        console.error(error);
      }
    };

    fetchFood();
  }, [id]);


  const getFoodById = async (id) => {
    try {
      const response = await axios.get(`https://kitchen-recipe.onrender.com/api/food/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateFood = async (id, foodData) => {
  try {
    const response = await axios.put(`https://kitchen-recipe.onrender.com/api/food/${id}`, foodData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


  const handleUpdateFood = async () => {
    try {
      const updatedFood = {
        name,
        imageUrl,
        description,
        type,
        foodProcess: foodProcess || [],
        ingredients,
      };
      await updateFood(id, updatedFood);
      navigate(`/foods/${id}`);
      toast.success('Food successfully updated!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleNumPersonsChange = (event) => {
    setNumPersons(parseInt(event.target.value, 10));
  };

  const parseFraction = (fraction) => {
    const [numerator, denominator] = fraction.split('/');
    if (denominator) {
      return parseFloat(numerator) / parseFloat(denominator);
    }
    return parseFloat(numerator);
  };

  const calculateIngredients = () => {
    if (
  !food ||
  !food.ingredients ||
  !Array.isArray(food.ingredients) ||
  food.ingredients.length === 0
) {
  return [];
}


    const calculatedIngredients = food.ingredients.map((ingredient) => {
      const amountPerPerson = parseFraction(ingredient.amount) * numPersons;
      return {
        item: ingredient.item,
        amount: amountPerPerson,
        unit: ingredient.unit,
      };
    });

    return calculatedIngredients;
  };

  if (!food) {
    return null;
  }

  const calculatedIngredients = calculateIngredients();

  return (
    <div className="edit-food-container">
      <div className="edit-food-form">
        <h2>Edit Food</h2>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="imageUrl">Image URL:</label>
        <input id="imageUrl" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

        <label htmlFor="type">Type:</label>
        <input id="type" type="text" value={type} onChange={(e) => setType(e.target.value)} />

        <label htmlFor="description">Description:</label>
        <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label htmlFor="foodProcess">Process:</label>
        <textarea
          id="foodProcess"
          value={foodProcess ? foodProcess.join('\n') : ''}
          onChange={(e) => setFoodProcess(e.target.value.split('\n'))}
        />

        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          value={
            ingredients.length > 0
              ? ingredients.map((ingredient) => `${ingredient.item},${ingredient.amount},${ingredient.unit}`).join('\n')
              : ''
          }
          onChange={(e) => {
            const ingredientLines = e.target.value.split('\n');
            const parsedIngredients = ingredientLines
              .filter((line) => line.trim() !== '')
              .map((ingredient) => {
                const [item = '', amount = '', unit = ''] = ingredient.split(',');
                return {
                  item: item.trim(),
                  amount: parseFraction(amount.trim()),
                  unit: unit.trim(),
                };
              });
            setIngredients(parsedIngredients);
          }}
        />

        <label htmlFor="numPersons">Number of Persons:</label>
        <input id="numPersons" type="number" min="1" value={numPersons} onChange={handleNumPersonsChange} />

        <h3>Calculated Ingredients:</h3>
        {calculatedIngredients.length > 0 ? (
          <ul>
            {calculatedIngredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.item}: {ingredient.amount} {ingredient.unit}
              </li>
            ))}
          </ul>
        ) : (
          <p>No ingredients available.</p>
        )}

        <button className='submit-button' onClick={handleUpdateFood}>Update Food</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditFood;








