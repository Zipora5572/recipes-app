import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
    position: 'relative',
    textAlign: 'center',
    height: '100vh',
    width: '100%',
    padding: 0,
    margin: 0,
}));

const BackgroundImage = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: '68px',
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundImage: `url('/תמונה.png')`,
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    opacity: 0.3,
    zIndex: 1,
}));

const Content = styled(Box)(({ theme }) => ({
    position: 'relative',
    top: '50%',
    left: '50%',
    fontWeight: 'bold',
    zIndex: 2,
    color: 'black',
}));

const Home = () => {
    return (
        <StyledContainer>
            <BackgroundImage />
            <Content>
                <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold' }}>
                    Welcome to the Recipes App! 
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom style={{ fontWeight: 'bold' }}>
                    Discover Delicious Recipes
                </Typography>
                <Typography variant="body1" paragraph>
                    Browse through a variety of recipes, share your own, and enjoy cooking delicious meals from around the world! 
                </Typography>
            </Content>
        </StyledContainer>
    );
};

export default Home;
