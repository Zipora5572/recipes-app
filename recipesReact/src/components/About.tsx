import { Container, Typography } from '@mui/material';

const About = () => {
    return (
        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',marginLeft:'40%' }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" color="#ff5722">
                About Recipes App 
            </Typography>
            <Typography variant="body1" paragraph align="center">
                Welcome to the Recipes App! This application allows users to browse, add, and manage their favorite recipes.
            </Typography>
            <Typography variant="body1" paragraph align="center">
                With a user-friendly interface, you can easily navigate through various recipes, add new ones, and even save your favorites for quick access. 
            </Typography>
            <Typography variant="body1" paragraph align="center">
                Our mission is to provide a platform for food enthusiasts to share their culinary creations and discover new dishes from around the world. 
            </Typography>
            <Typography variant="body1" paragraph align="center">
                Thank you for using our app, and happy cooking! 
            </Typography>
        </Container>
    );
};

export default About;
