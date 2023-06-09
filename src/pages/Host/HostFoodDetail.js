// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import './Host.css'

// const HostFoodDetail = () => {
//   const navigate = useNavigate();
//   const params = useParams();
//   const [food, setFood] = useState(null);
//   const [numPersons, setNumPersons] = useState(1);

//   useEffect(() => {
//     const fetchFood = async () => {
//       try {
//         const response = await axios.get(`https://kitchen-recipe.onrender.com/api/food/${params.id}`);
//         console.log("API response:", response.data);
//         setFood(response.data.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     console.log("Fetching food...");
//     fetchFood();
//   }, [params.id]);

//   const handleDeleteFood = async () => {
//     try {
//       await axios.delete(`https://kitchen-recipe.onrender.com/api/food/${params.id}`);
//       navigate('/foods');
//       toast.success('Food remove Successfully!');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleEditFood = () => {
//     navigate(`/foods/${params.id}/edit`);
//   };

//   const handleNumPersonsChange = (event) => {
//     setNumPersons(parseInt(event.target.value));
//   };

//   const calculateIngredients = () => {
//     if (!food || !food.ingredients || food.ingredients.length === 0) {
//       return null;
//     }

//     const calculatedIngredients = food.ingredients.map((ingredient) => {
//       const amountPerPerson = (ingredient.amount / 1) * numPersons;
//       return {
//         item: ingredient.item,
//         amount: amountPerPerson,
//         unit: ingredient.unit,
//       };
//     });

//     return calculatedIngredients;
//   };

//   return (
//     <div className="host-food-detail-container">
//       {food ? (
//         <div className="host-food-detail">
//           <img src={food.imageUrl} alt={food.name} />
//           <h3 style={{ textDecoration: 'underline' }}>{food.name}</h3>
//           <h2 style={{ textDecoration: 'underline' }}>Preparation:</h2>
//           {Array.isArray(food.foodProcess) && food.foodProcess.length > 0 ? (
//             <ol>
//               {food.foodProcess.map((step, index) => (
//                 <li key={index}>{step}</li>
//               ))}
//             </ol>
//           ) : (
//             <p>No preparation steps available.</p>
//           )}

//           <div className="ingredient-calculation">
//             <h2 style={{ textDecoration: 'underline' }}>Ingredients:</h2>
//             <div className="num-persons">
//               <label htmlFor="numPersons">Number of Persons:</label>
//               <input
//                 type="number"
//                 id="numPersons"
//                 min="1"
//                 value={numPersons}
//                 onChange={handleNumPersonsChange}
//               />
//             </div>
            
//             {calculateIngredients() ? (
//             <table>
//               <thead>
//                 <tr>
//                   <th>Ingredient</th>
//                   <th>Amount</th>
//                   <th>Unit</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {calculateIngredients().map((ingredient, index) => (
//                   <tr key={index}>
//                     <td>{ingredient.item}</td>
//                     <td>{ingredient.amount}</td>
//                     <td>{ingredient.unit}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//               <p>No ingredients available.</p>
//             )}
//           </div>
//           <div className="icon-container">
//           <EditIcon onClick={handleEditFood} className="edit-icon" />
//           <DeleteIcon onClick={handleDeleteFood} className="delete-icon" />
//             </div>
//         </div>
//       ) : (
//         <h2>Loading....</h2>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default HostFoodDetail;





import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Host.css';

const HostFoodDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [food, setFood] = useState(null);
  const [numPersons, setNumPersons] = useState(1);
  const [previousData] = useState(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`https://kitchen-recipe.onrender.com/api/food/${params.id}`);
        console.log("API response:", response.data);
        setFood(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    console.log("Fetching food...");
    fetchFood();
  }, [params.id]);

  const handleDeleteFood = async () => {
    try {
      await axios.delete(`https://kitchen-recipe.onrender.com/api/food/${params.id}`);
      navigate('/foods');
      toast.success('Food removed Successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditFood = () => {
    navigate(`/foods/${params.id}/edit`,{ state: { previousData } });
  };

  const handleNumPersonsChange = (event) => {
    setNumPersons(parseInt(event.target.value));
  };

  const calculateIngredients = () => {
    if (!food || !food.ingredients || food.ingredients.length === 0) {
      return null;
    }

    const calculatedIngredients = food.ingredients.map((ingredient) => {
      const amountPerPerson = (ingredient.amount / 1) * numPersons;
      return {
        item: ingredient.item,
        amount: amountPerPerson,
        unit: ingredient.unit,
      };
    });

    return calculatedIngredients;
  };

  return (
    <div className="host-food-detail-container">
      {food ? (
        <div className="host-food-detail">
          <img src={food.imageUrl} alt={food.name} className='food-food-img'/>
          <h3 className="food-name">{food.name}</h3>
          <h2 className="section-heading">Preparation:</h2>
          {Array.isArray(food.foodProcess) && food.foodProcess.length > 0 ? (
            <ol>
              {food.foodProcess.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          ) : (
            <p>No preparation steps available.</p>
          )}

          <div className="ingredient-calculation">
            <h2 className="section-heading">Ingredients:</h2>
            <div className="num-persons">
              <label htmlFor="numPersons">Number of Persons:</label>
              <input
                type="number"
                id="numPersons"
                min="1"
                value={numPersons}
                onChange={handleNumPersonsChange}
              />
            </div>
            
            {calculateIngredients() ? (
              <table>
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Amount</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {calculateIngredients().map((ingredient, index) => (
                    <tr key={index}>
                      <td>{ingredient.item}</td>
                      <td>{ingredient.amount}</td>
                      <td>{ingredient.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No ingredients available.</p>
            )}
          </div>
          <div className="icon-container">
            <EditIcon onClick={handleEditFood} className="edit-icon" />
            <DeleteIcon onClick={handleDeleteFood} className="delete-icon" />
          </div>
        </div>
      ) : (
        <h2>Loading....</h2>
      )}
      <ToastContainer />
    </div>
  );
};

export default HostFoodDetail;

