// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createFood } from '../api/foodApi';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// function CreateFoodForm() {
//   const [foodData, setFoodData] = useState({
//     name: '',
//     type: '',
//     description: '',
//     imageUrl: '',
//     foodProcess: [],
//     ingredients: [],
//   });
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'foodProcess') {
//       // Handle food process steps as an array
//       const foodProcessSteps = value.split('\n');
//       setFoodData((prevData) => ({
//         ...prevData,
//         [name]: foodProcessSteps,
//       }));
//     } else if (name === 'ingredients') {
//       try {
//         const ingredientList = JSON.parse(value);
//         setFoodData((prevData) => ({
//           ...prevData,
//           ingredients: ingredientList,
//         }));
//       } catch (error) {
//         console.error('Invalid JSON input:', error);
//       }
//     } else {
//       setFoodData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createFood(foodData);
//       toast.success('Food created successfully!');
//       navigate('/foods');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="create-food-container">
//       <div className="create-food-form">
//         <h2 style={{ textAlign: 'center', textDecoration: 'underline' }}>Create Food</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={foodData.name}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="type">Type:</label>
//             <input
//               type="text"
//               id="type"
//               name="type"
//               value={foodData.type}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="description">Description:</label>
//             <textarea
//               id="description"
//               name="description"
//               value={foodData.description}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="imageUrl">Image URL:</label>
//             <input
//               type="text"
//               id="imageUrl"
//               name="imageUrl"
//               value={foodData.imageUrl}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="foodProcess">Process:</label>
//             <textarea
//               id="foodProcess"
//               name="foodProcess"
//               value={foodData.foodProcess.join('\n')}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="ingredients">Ingredients:</label>
//             <textarea
//               id="ingredients"
//               name="ingredients"
//               value={JSON.stringify(foodData.ingredients, null, 2)}
//               onChange={handleInputChange}
//             />
//           </div>
//           <button type="submit">Add on</button>
//         </form>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default CreateFoodForm;










import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function CreateFoodForm() {
  const [foodData, setFoodData] = useState({
    name: '',
    type: '',
    description: '',
    imageUrl: '',
    foodProcess: [],
    ingredients: [],
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'foodProcess') {
      const foodProcessSteps = value.split('\n');
      setFoodData((prevData) => ({
        ...prevData,
        [name]: foodProcessSteps,
      }));
    } else if (name === 'ingredients') {
      try {
        const ingredientList = JSON.parse(value);
        setFoodData((prevData) => ({
          ...prevData,
          ingredients: ingredientList,
        }));
      } catch (error) {
        console.error('Invalid JSON input:', error);
      }
    } else {
      setFoodData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const createFood = async (foodData) => {
    try {
      await axios.post('http://localhost:8000/api/food', foodData);
    } catch (error) {
      console.error('Error creating food:', error);
      throw new Error('Failed to create food');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFood(foodData);
      toast.success('Food created successfully!');
      navigate('/foods');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-food-container">
      <div className="create-food-form">
        <h2 style={{ textAlign: 'center', textDecoration: 'underline' }}>Create Food</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={foodData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="type">Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              value={foodData.type}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={foodData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={foodData.imageUrl}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="foodProcess">Process:</label>
            <textarea
              id="foodProcess"
              name="foodProcess"
              value={foodData.foodProcess.join('\n')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="ingredients">Ingredients:</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={JSON.stringify(foodData.ingredients, null, 2)}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Add on</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateFoodForm;
