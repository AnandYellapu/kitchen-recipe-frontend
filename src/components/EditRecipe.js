// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Typography, Container, TextField, Button } from '@mui/material';
// import ConfirmationDialog from './ConfirmationDialog'; // Assuming ConfirmationDialog file is in the same directory

// const EditRecipe = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [recipe, setRecipe] = useState(null);
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         imageUrl: '',
//         process: '',
//         ingredients: []
//     });
//     const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

//     useEffect(() => {
//         const fetchRecipeById = async () => {
//             try {
//                 const res = await axios.get(`https://kitchen-recipe.onrender.com/api/recipes/get/${id}`);
//                 setRecipe(res.data);
//                 setFormData(res.data);
//             } catch (error) {
//                 console.error('Error fetching recipe:', error);
//             }
//         };

//         fetchRecipeById();
//     }, [id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     // const handleIngredientChange = (index, e) => {
//     //     const { name, value } = e.target;
//     //     const updatedIngredients = [...formData.ingredients];
//     //     updatedIngredients[index][name] = value;
//     //     setFormData(prevState => ({
//     //         ...prevState,
//     //         ingredients: updatedIngredients
//     //     }));
//     // };


//     const handleIngredientChange = (index, e) => {
//         const { name, value } = e.target;
//         const updatedIngredients = [...formData.ingredients];
//         updatedIngredients[index] = {
//             ...updatedIngredients[index],
//             [name]: value
//         };
//         setFormData(prevState => ({
//             ...prevState,
//             ingredients: updatedIngredients
//         }));
//     };

    

//     const handleUpdate = async () => {
//         setIsUpdateDialogOpen(true);
//     };

//     const handleUpdateConfirmed = async () => {
//         try {
//             await axios.put(`https://kitchen-recipe.onrender.com/api/recipes/update/${id}`, formData);
//             // Redirect to recipe details page after update
//             navigate(`/get/${id}`);
//         } catch (error) {
//             console.error('Error updating recipe:', error);
//         }
//     };

//     const handleUpdateDialogClose = () => {
//         setIsUpdateDialogOpen(false);
//     };

//     if (!recipe) {
//         return <Typography variant="h6" align="center">Loading...</Typography>;
//     }

//     return (
//         <Container maxWidth="md">
//             <Typography variant="h4" gutterBottom>Edit Recipe</Typography>
//             <form>
//                 <TextField
//                     name="title"
//                     label="Title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                 />
//                 <TextField
//                     name="description"
//                     label="Description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                     multiline
//                 />
//                 <TextField
//                     name="imageUrl"
//                     label="Image URL"
//                     value={formData.imageUrl}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                 />
//                 <TextField
//                     name="process"
//                     label="Process"
//                     value={formData.process}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                     multiline
//                 />
//                 {formData.ingredients.map((ingredient, index) => (
//                     <div key={index}>
//                         <TextField
//                             name={`ingredients[${index}].item`}
//                             label={`Ingredient ${index + 1}: Item`}
//                             value={ingredient.item}
//                             onChange={(e) => handleIngredientChange(index, e)}
//                             fullWidth
//                             margin="normal"
//                         />
//                         <TextField
//                             name={`ingredients[${index}].quantity`}
//                             label={`Ingredient ${index + 1}: Quantity`}
//                             value={ingredient.quantity}
//                             onChange={(e) => handleIngredientChange(index, e)}
//                             fullWidth
//                             margin="normal"
//                             type="text" // Changed type to text for better handling of fractional quantities
//                         />
//                         <TextField
//                             name={`ingredients[${index}].units`}
//                             label={`Ingredient ${index + 1}: Units`}
//                             value={ingredient.units}
//                             onChange={(e) => handleIngredientChange(index, e)}
//                             fullWidth
//                             margin="normal"
//                         />
//                     </div>
//                 ))}
//                 <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
//             </form>
//             <ConfirmationDialog
//                 open={isUpdateDialogOpen}
//                 onClose={handleUpdateDialogClose}
//                 onConfirm={handleUpdateConfirmed}
//                 title="Confirm Update"
//                 message="Are you sure you want to update this recipe?"
//                 confirmText="Update"
//                 cancelText="Cancel"
//             />
//         </Container>
//     );
// };

// export default EditRecipe;










import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Container, TextField, Button } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog'; // Assuming ConfirmationDialog file is in the same directory

const EditRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        process: '',
        ingredients: []
    });
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    useEffect(() => {
        const fetchRecipeById = async () => {
            try {
                const res = await axios.get(`https://kitchen-recipe.onrender.com/api/recipes/get/${id}`);
                setRecipe(res.data);
                setFormData(res.data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipeById();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleIngredientChange = (index, e) => {
        const { name, value } = e.target;
        const updatedIngredients = [...formData.ingredients];
        updatedIngredients[index] = {
            ...updatedIngredients[index],
            [name]: value
        };
        setFormData(prevState => ({
            ...prevState,
            ingredients: updatedIngredients
        }));
    };

    const handleUpdate = async () => {
        setIsUpdateDialogOpen(true);
    };

    const handleUpdateConfirmed = async () => {
        try {
            await axios.put(`https://kitchen-recipe.onrender.com/api/recipes/update/${id}`, formData);
            // Redirect to recipe details page after update
            navigate(`/get/${id}`);
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    const handleUpdateDialogClose = () => {
        setIsUpdateDialogOpen(false);
    };

    if (!recipe) {
        return <Typography variant="h6" align="center">Loading...</Typography>;
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>Edit Recipe</Typography>
            <form>
                <TextField
                    name="title"
                    label="Title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                />
                <TextField
                    name="imageUrl"
                    label="Image URL"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="process"
                    label="Process"
                    value={formData.process}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                />
                {formData.ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <TextField
                            name={`ingredients[${index}].item`}
                            label={`Ingredient ${index + 1}: Item`}
                            value={ingredient.item}
                            onChange={(e) => handleIngredientChange(index, e)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name={`ingredients[${index}].quantity`}
                            label={`Ingredient ${index + 1}: Quantity`}
                            value={ingredient.quantity}
                            onChange={(e) => handleIngredientChange(index, e)}
                            fullWidth
                            margin="normal"
                            type="text" // Changed type to text for better handling of fractional quantities
                        />
                        <TextField
                            name={`ingredients[${index}].units`}
                            label={`Ingredient ${index + 1}: Units`}
                            value={ingredient.units}
                            onChange={(e) => handleIngredientChange(index, e)}
                            fullWidth
                            margin="normal"
                        />
                    </div>
                ))}
                <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
            </form>
            <ConfirmationDialog
                open={isUpdateDialogOpen}
                onClose={handleUpdateDialogClose}
                onConfirm={handleUpdateConfirmed}
                title="Confirm Update"
                message="Are you sure you want to update this recipe?"
                confirmText="Update"
                cancelText="Cancel"
            />
        </Container>
    );
};

export default EditRecipe;
