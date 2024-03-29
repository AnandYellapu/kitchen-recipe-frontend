import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardContent, TextField, Select, MenuItem, InputAdornment, InputLabel, FormControl, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from './Pagination';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import { BookmarkBorder, Bookmark } from '@mui/icons-material'; 
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { RingLoader } from 'react-spinners';
import RubixCubeLoader from './RubixCubeLoader';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(6); // Number of recipes to display per page
    const [sortCriteria, setSortCriteria] = useState('title'); // Default sorting criteria
    const [filterType, setFilterType] = useState(''); // Selected filter type
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await axios.get('https://kitchen-recipe.onrender.com/api/recipes/all');
                setRecipes(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setError('Error fetching recipes. Please try again later.');
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset current page when search query changes
    };

    const handleSortCriteriaChange = (e) => {
        setSortCriteria(e.target.value);
    };

    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
        setCurrentPage(1); // Reset current page when filter type changes
    };

    const toggleFavorite = async (recipeId) => {
        try {
            const res = await axios.post(`https://kitchen-recipe.onrender.com/api/recipes/favorite/${recipeId}`);
            const updatedRecipes = recipes.map(recipe => {
                if (recipe._id === recipeId) {
                    return {
                        ...recipe,
                        isFavorite: res.data.isFavorite
                    };
                }
                return recipe;
            });
            setRecipes(updatedRecipes);
        } catch (error) {
            console.error('Error toggling favorite status:', error);
            // Handle error
        }
    };

    if (loading) {
        return (
            <Container maxWidth="md">
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <RubixCubeLoader color="#36d7b7" loading={loading} size={60} />
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md">
                <Typography variant="h6" color="error" align="center" gutterBottom>
                    {error}
                </Typography>
            </Container>
        );
    }

    const sortedRecipes = [...recipes].sort((a, b) => {
        if (sortCriteria === 'title') {
            return a.title.localeCompare(b.title);
        } else if (sortCriteria === 'type') {
            return a.type.localeCompare(b.type);
        }
        return 0;
    });

    const filteredRecipes = sortedRecipes.filter(recipe =>
        (recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            recipe.type.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterType === '' ||
            recipe.type.toLowerCase() === filterType.toLowerCase())
    );

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Recipe List
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={9}>
                    <TextField
                        label="Search Recipes"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="sort-by">Sort by</InputLabel>
                        <Select
                            label="sort-by"
                            value={sortCriteria}
                            onChange={handleSortCriteriaChange}
                            fullWidth
                            startAdornment={<SortIcon />}
                        >
                            <MenuItem value="title">Title</MenuItem>
                            <MenuItem value="type">Type</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="filter-by-type">Filter by Type</InputLabel>
                        <Select
                            type="filter-by-type"
                            label="filter-by-type"
                            value={filterType}
                            onChange={handleFilterTypeChange}
                            fullWidth
                            startAdornment={<FilterListIcon />}
                        >
                        <MenuItem value="">All Types</MenuItem>
                        <MenuItem value="Beverage">Beverage</MenuItem>
                        <MenuItem value="Biryani">Biryani</MenuItem>
                        <MenuItem value="main dish">Main Course</MenuItem>
                        <MenuItem value="side dish">Side Dish</MenuItem>
                        <MenuItem value="snack">Snack</MenuItem>
                        <MenuItem value="appetizer">Appetizer</MenuItem>
                        <MenuItem value="soup">Soup</MenuItem>
                        <MenuItem value="salad">Salad</MenuItem>
                        <MenuItem value="sandwich">Sandwich</MenuItem>
                        <MenuItem value="pizza">Pizza</MenuItem>
                        <MenuItem value="pasta">Pasta</MenuItem>
                        <MenuItem value="burger">Burger</MenuItem>
                        <MenuItem value="wrap">Wrap</MenuItem>
                        <MenuItem value="dessert">Dessert</MenuItem>
                        <MenuItem value="cake">Cake</MenuItem>
                        <MenuItem value="cookie">Cookie</MenuItem>
                        <MenuItem value="pie">Pie</MenuItem>
                        <MenuItem value="pastry">Pastry</MenuItem>
                        <MenuItem value="bread">Bread</MenuItem>
                        <MenuItem value="breakfast">Breakfast</MenuItem>
                        <MenuItem value="brunch">Brunch</MenuItem>
                        <MenuItem value="lunch">Lunch</MenuItem>
                        <MenuItem value="dinner">Dinner</MenuItem>
                        <MenuItem value="holiday">Holiday</MenuItem>
                        <MenuItem value="party">Party</MenuItem>
                        <MenuItem value="vegan">Vegan</MenuItem>
                        <MenuItem value="vegetarian">Vegetarian</MenuItem>
                        <MenuItem value="gluten-free">Gluten-Free</MenuItem>
                        <MenuItem value="dairy-free">Dairy-Free</MenuItem>
                        <MenuItem value="low-carb">Low-Carb</MenuItem>
                        <MenuItem value="low-fat">Low-Fat</MenuItem>
                        <MenuItem value="high-protein">High-Protein</MenuItem>
                        <MenuItem value="paleo">Paleo</MenuItem>
                        <MenuItem value="keto">Keto</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={4} marginTop={2}>
            {currentRecipes.map((recipe, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card className='recipe-card-card'>
                        <Link to={`/get/${recipe._id}`} style={{ textDecoration: 'none' }}>
                            <LazyLoadImage
                                alt={recipe.title}
                                height={300}
                                src={recipe.imageUrl}
                                width="100%"
                                effect="blur" // Optional: Adds a blur effect while loading
                                />
                        </Link>
                        <CardContent>
                            <Typography variant="h6" component="h2">
                                {recipe.title}
                            </Typography>
                            <Typography color="textSecondary">
                                Type: {recipe.type}
                            </Typography>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                    <IconButton onClick={() => toggleFavorite(recipe._id)}>
                                        {recipe.isFavorite ? <Bookmark /> : <BookmarkBorder />}
                                    </IconButton>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
            <Pagination
                totalPages={Math.ceil(filteredRecipes.length / recipesPerPage)}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </Container>
    );
};

export default RecipeList;

