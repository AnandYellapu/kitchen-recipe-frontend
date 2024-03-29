import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardMedia, CardContent, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TextField, Button } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import jwt_decode from 'jwt-decode';
// import { RingLoader } from 'react-spinners';
import RubixCubeLoader from './RubixCubeLoader';

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [decodedToken, setDecodedToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipeById = async () => {
            try {
                // Get token from localStorage
                const token = localStorage.getItem('token');
                
                if (!token) {
                    console.error('Token not found in localStorage');
                    return;
                }
    
                // Include token in request headers
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
    
                const res = await axios.get(`https://kitchen-recipe.onrender.com/api/recipes/get/${id}`, config);
                setRecipe(res.data);
    
                // Decode the token to extract userId and role
                const decodedToken = jwt_decode(token);
                // console.log('Decoded Token:', decodedToken);
                setDecodedToken(decodedToken);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recipe:', error);
                setLoading(false);
            }
        };
    
        fetchRecipeById();
    }, [id]);
    
    const handleNumberOfPeopleChange = (e) => {
        const { value } = e.target;
        setNumberOfPeople(parseInt(value));
    };

    const calculateIngredientQuantity = (quantity) => {
        // Check if quantity is a string and contains a fraction
        if (typeof quantity === 'string' && quantity.includes('/')) {
            const [numerator, denominator] = quantity.split('/').map(Number);
            return ((numerator / denominator) * numberOfPeople).toFixed(2); // Round to 2 decimal places for fractions
        } else {
            return (parseFloat(quantity) * numberOfPeople).toFixed(0); // Round to 2 decimal places for other numeric values
        }
    };

    const handleEdit = () => {
        // Redirect to edit page with recipe ID
        navigate(`/update/${id}`);
    };

    const handleDelete = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirmed = async () => {
        try {
            await axios.delete(`https://kitchen-recipe.onrender.com/api/recipes/delete/${id}`);
            navigate('/all');
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const handleDeleteDialogClose = () => {
        setIsDeleteDialogOpen(false);
    };

    const handleGoBack = () => {
        navigate('/all'); // Navigate back to the previous page
    };

    // Function to render Edit and Delete buttons based on user role
    const renderButtons = () => {
        if (decodedToken && decodedToken.role === 'admin') {
            return (
                <>
                    <Button variant="contained" color="primary" onClick={handleEdit} className="edit-button">Edit</Button>
                    <Button variant="contained" color="error" onClick={handleDelete} className="delete-button">Delete</Button>
                </>
            );
        }
        return null; // If user is not admin or decodedToken is null, don't render the buttons
    };

    return (
        <Container maxWidth="md">
            <Button startIcon={<ArrowBackIcon />} variant="outlined" onClick={handleGoBack} style={{ marginTop: '15px' }}>Back</Button> {/* Back button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {loading ? ( // Display loading spinner while fetching data
                    <RubixCubeLoader color="#36d7b7" loading={loading} size={60} />
                ) : (
                    <React.Fragment>
                        <Grid container spacing={3} className="recipe-details-container">
                            <Grid item xs={12}>
                                <Card className="recipe-card">
                                    <CardMedia
                                        component="img"
                                        height="60%"
                                        image={recipe.imageUrl}
                                        alt={recipe.title}
                                        className="recipe-image"
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="h2" gutterBottom className="recipe-title">
                                            {recipe.title}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom className="recipe-description">
                                            {recipe.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} className="recipe-process">
                               <Typography variant="h6" gutterBottom>
                                   Process
                               </Typography>
                               <ol style={{ marginTop: '15px' }}>
                                   {recipe.process.split('\n').map((step, index) => (
                                       <li key={index} style={{ marginBottom: '15px' }}>{step}</li>
                                   ))}
                               </ol>
                           </Grid>
                            <Grid item xs={12} className="recipe-ingredients">
                                <Typography variant="h6" gutterBottom>
                                    Ingredients
                                </Typography>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Number of Persons"
                                        type="number"
                                        value={numberOfPeople}
                                        onChange={handleNumberOfPeopleChange}
                                        fullWidth
                                        className="recipe-number-of-people"
                                    />
                                </Grid>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className="ingredient-item">Item</TableCell>
                                                <TableCell className="ingredient-quantity">Quantity</TableCell>
                                                <TableCell className="ingredient-units">Units</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {recipe.ingredients.map((ingredient, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{ingredient.item}</TableCell>
                                                    <TableCell>{calculateIngredientQuantity(ingredient.quantity)}</TableCell>
                                                    <TableCell>{ingredient.units}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={12} className="recipe-actions">
                                {renderButtons()} 
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )}
            </div>
            <ConfirmationDialog
                open={isDeleteDialogOpen}
                onClose={handleDeleteDialogClose}
                onConfirm={handleDeleteConfirmed}
                title="Confirm Delete"
                message="Are you sure you want to delete this recipe?"
                confirmText="Delete"
                cancelText="Cancel"
                className="delete-confirmation-dialog"
            />
        </Container>
    );    
};

export default RecipeDetails;