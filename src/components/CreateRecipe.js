import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';

const CreateRecipe = () => {
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        description: '',
        imageUrl: '',
        process: [''], // Initialize with one empty step
        ingredients: [{ item: '', quantity: '', units: '' }], // Renamed amount to quantity
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProcessKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setFormData({ ...formData, process: formData.process + '\n' });
        }
    };

    const handleIngredientChange = (index, name, value) => {
        const updatedIngredients = [...formData.ingredients];
        updatedIngredients[index][name] = value.trim(); // Trim the value to handle empty strings
        setFormData({ ...formData, ingredients: updatedIngredients });
    };

    const handleAddIngredient = () => {
        setFormData({
            ...formData,
            ingredients: [...formData.ingredients, { item: '', quantity: '', units: '' }], // Renamed amount to quantity
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
            const res = await axios.post('https://kitchen-recipe.onrender.com/api/recipes/create', formData);
            console.log(res.data); // Log the created recipe
            // You can redirect to another page or display a success message here
        } catch (error) {
            console.error('Error creating recipe:', error);
            // Handle error - display an error message or log it
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Create Recipe
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
                            rows={4}
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
                                        label="Quantity" // Renamed from Amount
                                        value={ingredient.quantity} // Renamed from amount
                                        onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)} // Renamed from amount
                                        fullWidth
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
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default CreateRecipe;






