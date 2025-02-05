import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreType } from '../store/store';
import { deleteRecipe, fetchData } from '../store/recipesSlice';
import { List, ListItemText, Container, Box, Drawer, ListItemButton, useTheme, Typography, CircularProgress, IconButton } from '@mui/material';
import { emptyRecipe, RecipeType } from '../models/Recipe';
import RecipeCard from './RecipeCard';
import Search from './Search'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRecipe from './EditRecipe';
import useModal from '../hooks/useModal';
import { UserContext } from '../models/User';
import { errorAlert, successAlert } from '../services/alerts';

const RecipeList = () => {
  const recipes = useSelector((state: StoreType) => state.recipes.list);
  const loading = useSelector((state: StoreType) => state.recipes.loading);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType>(emptyRecipe);
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const theme = useTheme();
  const { isOpen, openModal, closeModal } = useModal();
  const { user } = useContext(UserContext);

  useEffect(() => { dispatch(fetchData()); }, [dispatch]);

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const checkPermission = (recipe: RecipeType) => {
    setSelectedRecipe(recipe);
    if (user.id == recipe.authorId) return true;
    errorAlert("Forbidden: You do not have permission")
    return false;
  };

  const handleDelete = (recipe: RecipeType) => {
    if (checkPermission(recipe) && selectedRecipe) {
      dispatch(deleteRecipe(selectedRecipe.id));
    successAlert( "Recipe Deleted Successfully")
    }
  };
  return (
    <>
      <Container maxWidth={false} sx={{ padding: 0,width:'80vw',height:'70%'}}>
        <Box sx={{ display: 'flex' }}>
          <Drawer sx={{
            width: 300, '& .MuiDrawer-paper': {
              width: 320, marginTop: '70px', bgcolor: theme.palette.background.paper,
              '&::-webkit-scrollbar': { display: 'none' }, '-ms-overflow-style': 'none', 'scrollbar-width': 'none', borderRight: `1px solid ${theme.palette.divider}`,
            },
          }} variant='permanent'>
            <Box sx={{ p: 2, height: '100%', position: 'relative' }}>
              {loading ? (
                <CircularProgress sx={{ position: 'absolute', top: '40%', left: '45%', transform: 'translate(-50%, -50%)' }} />
              ) : (
                <>
                  <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> 
                  <List>
                    {filteredRecipes.map(recipe => (
                      <ListItemButton key={recipe.id} onClick={() => setSelectedRecipe(recipe)} sx={{
                        backgroundColor: theme.palette.action.hover, borderRadius: '8px', margin: '8px 0',
                        transition: 'background-color 0.3s, transform 0.2s', '&:hover': { backgroundColor: '#ffccbc' },
                      }}>
                        <ListItemText primary={recipe.title} sx={{
                          fontWeight: 'bold', color: theme.palette.text.primary, textAlign: 'center'
                        }} />
                        <IconButton onClick={() => { checkPermission(recipe) ? openModal() : {} }} sx={{ marginLeft: 1 }} aria-label="edit recipe">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => { handleDelete(recipe) }}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemButton>
                    ))}
                  </List>
                </>
              )}
            </Box>
          </Drawer>
          <Box  sx={{ flexGrow: 1, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'stretch' ,width:'100%',height:'100%'}}>
            {selectedRecipe ? <RecipeCard recipe={selectedRecipe} /> : 
              <Box sx={{ flexGrow: 1, p: 2, width: '62vw', textAlign: 'center', padding: 4, bgcolor: theme.palette.background.default, borderRadius: '8px' }}>
                <Typography variant="h3" color={theme.palette.primary.main} gutterBottom>Your Recipe Book</Typography>
                <Typography variant="body1" color="text.secondary" paragraph>Select a recipe from the list to view its details</Typography>
                <img src="/תמונה.png" alt="Cooking Illustration" style={{ width: '75%', borderRadius: '8px' }} />
              </Box>
            }
          </Box>
        </Box>
      </Container>
      <EditRecipe open={isOpen} handleClose={closeModal} recipe={selectedRecipe} />
    </>
  );
};
export default RecipeList;
