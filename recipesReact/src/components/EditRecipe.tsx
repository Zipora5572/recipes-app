import { useContext, useEffect } from "react";
import { AppDispatch } from "../store/store";
import { fetchData, RecipeType, updateRecipe } from "../store/recipesSlice";
import { useDispatch } from "react-redux";
import { UserContext } from "../models/User";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { array, object, string } from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalWrapper from "./ModalWrapper";
import FormFields from "./FormFields";
import { useTheme } from '@mui/material/styles';

const EditRecipe = ({ open, handleClose, recipe }: { open: boolean; handleClose: () => void; recipe: RecipeType; }) => {
  const theme = useTheme();
  const { user } = useContext(UserContext);
  
  const validationSchema = object().shape({
    title: string().required('Title is required'),
    description: string().required('Description is required'),
    ingredients: array().of(string().required('Ingredient is required'))
      .min(1, 'At least one ingredient is required'),
    instructions: string().required('Instructions are required'),
  });

  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<RecipeType>({
    resolver: yupResolver(validationSchema),
  });

  const { fields: ingredientFields, append, remove } = useFieldArray({
    control,
    name: "ingredients"
  });

  useEffect(() => {
    if (recipe) {
       
      reset(recipe);
    }
  }, [recipe, reset, user.id]);

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: RecipeType) => {
    const recipeToUpdate = {
      ...data,
      authorId: user.id,
    };
    dispatch(updateRecipe(recipeToUpdate));
    reset();
    dispatch(fetchData());
    handleClose();
  };
  return (
    <> 
     <ModalWrapper 
      open={open } 
      handleClose={handleClose} 
      title="Edit Recipe" 
      onSubmit={handleSubmit(onSubmit)} 
      submitText="Update Recipe"
    >     
      <form>
        <FormFields
          fields={[
            { name: 'title', label: 'Title', required: true, error: errors.title?.message },
            { name: 'description', label: 'Description', required: true, error: errors.description?.message }
          ]}
          register={register}
          errors={errors}
        />
        <Typography variant="subtitle1" component="h3" gutterBottom sx={{ color: theme.palette.primary.main }}>
          Ingredients
        </Typography>
        {ingredientFields.map((field, index) => (
          <Box key={field.id} display="flex" alignItems="center" mb={2}>
            <TextField
              fullWidth
              margin="normal"
              label={`Ingredient ${index + 1}`}
              {...register(`ingredients.${index}` as const)}
              error={!!errors.ingredients?.[index]}
              helperText={errors.ingredients?.[index]?.message}
              sx={{
                '& .MuiInputBase-root': {
                  borderColor: theme.palette.primary.main,
                },
              }}
            />
            <IconButton onClick={() => remove(index)} edge="end" aria-label="remove" size="large" sx={{ color: theme.palette.error.main }}>
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
        <Button 
          type="button" 
          variant="contained" 
          color="primary" 
          onClick={() => append('')} 
          startIcon={<AddIcon />}
          sx={{ mt: 2, backgroundColor: theme.palette.secondary.main, '&:hover': { backgroundColor: theme.palette.secondary.dark } }} 
        >
          Add Ingredient
        </Button>
        <TextField 
          fullWidth 
          margin="normal" 
          label="Instructions" 
          multiline 
          rows={4} 
          {...register('instructions')} 
          error={!!errors.instructions} 
          helperText={errors.instructions?.message} 
          sx={{
            '& .MuiInputBase-root': {
              borderColor: theme.palette.primary.main,
            },
          }}
        />
      </form>  
    </ModalWrapper>
    </>
  );
};
export default EditRecipe;
