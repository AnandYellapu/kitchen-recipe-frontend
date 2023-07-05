// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

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

//   const createFood = async (foodData) => {
//     try {
//       await axios.post('https://kitchen-recipe.onrender.com/api/food', foodData);
//     } catch (error) {
//       console.error('Error creating food:', error);
//       throw new Error('Failed to create food');
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
//         <h2 className="form-heading">Create Food</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-field">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={foodData.name}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-field">
//             <label htmlFor="type">Type:</label>
//             <input
//               type="text"
//               id="type"
//               name="type"
//               value={foodData.type}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-field">
//             <label htmlFor="description">Description:</label>
//             <textarea
//               id="description"
//               name="description"
//               value={foodData.description}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-field">
//             <label htmlFor="imageUrl">Image URL:</label>
//             <input
//               type="text"
//               id="imageUrl"
//               name="imageUrl"
//               value={foodData.imageUrl}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-field">
//             <label htmlFor="foodProcess">Process:</label>
//             <textarea
//               id="foodProcess"
//               name="foodProcess"
//               value={foodData.foodProcess.join('\n')}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-field">
//             <label htmlFor="ingredients">Ingredients:</label>
//             <textarea
//               id="ingredients"
//               name="ingredients"
//               value={JSON.stringify(foodData.ingredients, null, 2)}
//               onChange={handleInputChange}
//             />
//           </div>
//           <button type="submit" className="submit-button">Add on</button>
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
  const [isFormComplete, setIsFormComplete] = useState(false);
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

    // Check if all fields are filled
    const formFields = ['name', 'type', 'description', 'imageUrl', 'foodProcess', 'ingredients'];
    const isComplete = formFields.every((field) => {
      const fieldValue = foodData[field];
      if (typeof fieldValue === 'string') {
        return fieldValue.trim() !== '';
      }
      return !!fieldValue; // Check if field value exists
    });
    setIsFormComplete(isComplete);
  };

  const createFood = async (foodData) => {
    try {
      await axios.post('https://kitchen-recipe.onrender.com/api/food', foodData);
    } catch (error) {
      console.error('Error creating food:', error);
      throw new Error('Failed to create food');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    const isEmpty = Object.values(foodData).some((value) => {
      if (typeof value === 'string') {
        return value.trim() === '';
      }
      return !value; // Check if field value exists
    });
    if (isEmpty) {
      alert('Please fill in all the fields.');
      return;
    }

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
        <h2 className="form-heading">Create Food</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={foodData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="type">Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              value={foodData.type}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={foodData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={foodData.imageUrl}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="foodProcess">Process:</label>
            <textarea
              id="foodProcess"
              name="foodProcess"
              value={foodData.foodProcess.join('\n')}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="ingredients">Ingredients:</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={JSON.stringify(foodData.ingredients, null, 2)}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="submit-button" disabled={!isFormComplete}>
            Add on
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateFoodForm;
