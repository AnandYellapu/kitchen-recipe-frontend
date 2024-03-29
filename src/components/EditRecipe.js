import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import {RingLoader} from 'react-spinners';

const EditRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        description: '',
        imageUrl: '',
        process: '',
        ingredients: [],
    });

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await axios.get(`https://kitchen-recipe.onrender.com/api/recipes/get/${id}`);
                setRecipe(res.data);
                setFormData(res.data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

   
    const handleProcessKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const { selectionStart, selectionEnd, value } = e.target;
            const processedValue =
                value.substring(0, selectionStart) +
                '\n' +
                value.substring(selectionEnd, value.length);
            setFormData({ ...formData, process: processedValue });
            // Set the selection to after the inserted newline
            e.target.selectionStart = selectionEnd + 1;
            e.target.selectionEnd = selectionEnd + 1;
        }
    };
    
    
    const handleIngredientChange = (index, name, value) => {
        const updatedIngredients = [...formData.ingredients];
        // Ensure the value is not trimmed if it's the item or units
        if (name === 'item' || name === 'units') {
            updatedIngredients[index][name] = value;
        } else {
            // For quantity, trim the value
            updatedIngredients[index][name] = value.trim();
        }
        setFormData({ ...formData, ingredients: updatedIngredients });
    };
    

    const handleAddIngredient = () => {
        setFormData({
            ...formData,
            ingredients: [...formData.ingredients, { item: '', quantity: '', units: '' }],
        });
    };


    

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = [...formData.ingredients];
        updatedIngredients.splice(index, 1);
        setFormData({ ...formData, ingredients: updatedIngredients });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://kitchen-recipe.onrender.com/api/recipes/update/${id}`, formData);
            navigate(`/get/${id}`); // Redirect to the recipe details page after editing
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };


        if (!recipe) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <RingLoader color="#36d7b7" loading={!recipe} size={60} />
            </div>
        );
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Edit Recipe
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            label="Image URL"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Process"
                            name="process"
                            value={formData.process}
                            onChange={handleChange}
                            onKeyDown={handleProcessKeyDown}
                            multiline
                            
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>Ingredients:</Typography>
                        {formData.ingredients.map((ingredient, index) => (
                            <Grid container spacing={2} key={index}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Item"
                                        value={ingredient.item}
                                        onChange={(e) => handleIngredientChange(index, 'item', e.target.value)}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Quantity"
                                        value={ingredient.quantity}
                                        onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Units"
                                        value={ingredient.units}
                                        onChange={(e) => handleIngredientChange(index, 'units', e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={1}>
                                    <Button onClick={() => handleRemoveIngredient(index)}>-</Button>
                                </Grid>
                            </Grid>
                        ))}
                        <Button onClick={handleAddIngredient}>Add Ingredient</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
    
   
};

export default EditRecipe;
