import axios from 'axios';

// Get all foods
export const getFoods = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/food');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get food by ID
export const getFoodById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/food/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Create a new food
export const createFood = async (foodData) => {
  try {
    const response = await axios.post('http://localhost:8000/api/food', foodData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Update an existing food
export const updateFood = async (id, foodData) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/food/${id}`, foodData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete a food
export const deleteFood = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/food/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
