import React from 'react';
import { Container, Typography, Link } from '@mui/material';

const AboutPage = () => {
    return (
        <Container maxWidth="md" style={{ marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                About Us
            </Typography>
            <Typography variant="body1" paragraph>
                Welcome to our website! We are dedicated to providing you with the best recipes and cooking tips.
            </Typography>
            <Typography variant="body1" paragraph>
                Our team of experienced chefs and food enthusiasts work hard to bring you delicious and
                easy-to-follow recipes for every occasion.
            </Typography>
            <Typography variant="body1" paragraph>
                Whether you're a beginner cook or an experienced chef, you'll find something new and exciting
                to try in our collection of recipes.
            </Typography>
            <Typography variant="body1" paragraph>
                Have a question or suggestion? We'd love to hear from you! Feel free to <Link href="/contact">contact us</Link>.
            </Typography>
            <Typography variant="body1" paragraph>
                Thank you for visiting!
            </Typography>
        </Container>
    );
};

export default AboutPage;
