import { AppBar, Box, Toolbar, Container, Button, Typography } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Login from './Login';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../models/User';
import AddRecipe from './AddRecipe';
import useModal from '../hooks/useModal';
import { primaryColor } from '../theme/theme';

const AppNavBar = () => {
  const { user } = useContext(UserContext);
  const { isOpen, openModal, closeModal } = useModal();
  const pages = ['Home', 'About', 'Recipes'];
  
  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'white', zIndex: 1201 }}>
      <Container maxWidth={false} sx={{ margin: 0 }}>
          <Toolbar disableGutters sx={{margin:0}}>
            <RestaurantMenuIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,color:primaryColor }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 0.1, color: primaryColor }}>
              Recipes App
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-start' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={`/${page.toLowerCase()}`}
                  sx={{ 
                    textTransform: 'none',              
                    display: 'block', 
                    mx: 2, 
                    fontWeight: 'bold', 
                    backgroundColor: 'transparent', 
                    boxShadow: 'none', 
                    color: 'black' 
                  }}
                >
                  {page}
                </Button>
              ))}
              {user.id !== 0 && (
                <Button
                  onClick={openModal}          
                  color="secondary"
                  sx={{  textTransform: 'none',              
                    display: 'block', 
                    mx: 2, 
                    fontWeight: 'bold', 
                    backgroundColor: 'transparent', 
                    boxShadow: 'none', 
                    color: 'black'   }}
                >
                  Add Recipe
                </Button>             
              )}
            </Box>
            <Login />
          </Toolbar>
        </Container>
      </AppBar>
      <AddRecipe open={isOpen} handleClose={closeModal} />
    </>
  );
};

export default AppNavBar;
