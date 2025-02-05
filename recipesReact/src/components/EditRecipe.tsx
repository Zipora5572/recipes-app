import { useContext, useEffect } from "react";
import { AppDispatch } from "../store/store";
import { fetchData, updateRecipe } from "../store/recipesSlice";
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
import { successAlert } from "../services/alerts";
import { RecipeType } from "../models/Recipe";

const EditRecipe = ({ open, handleClose, recipe }: { open: boolean; handleClose: () => void; recipe: Partial<RecipeType>; }) => {
  const theme = useTheme();
  const { user } = useContext(UserContext);
  
  const validationSchema = object().shape({
    title: string().required('Title is required'),
    description: string().required('Description is required'),
    ingredients: array().of(string().required('Ingredient is required')).min(1, 'At least one ingredient is required'),
    instructions: string().required('Instructions are required'),
  });

  type FormData = Omit<RecipeType, 'id' | 'authorId'>; 

  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    
  });

  const { fields: ingredientFields, append, remove } =  useFieldArray<FormData>({ control, name: "ingredients"  });

  useEffect(() => {
    if (recipe) reset(recipe);
  }, [recipe, reset]);

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: FormData) => {
    dispatch(updateRecipe({ ...data as RecipeType, authorId: user.id }));
    successAlert("Recipe Updated Successfully")
    reset(); dispatch(fetchData()); handleClose();
  };

  const textFieldProps = (name: string, label: string, errorMessage?: string) => ({
    
    fullWidth: true,
    margin: "normal" as const,
    label,
    error: !!errorMessage,
    helperText: errorMessage,
    sx: { '& .MuiInputBase-root': { borderColor: theme.palette.primary.main } },
    ...register(name as 'instructions'),
  });

  return (
    <ModalWrapper open={open} handleClose={handleClose} title="Edit Recipe" onSubmit={handleSubmit(onSubmit)} submitText="Update Recipe">
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
            <TextField {...textFieldProps(`ingredients.${index}`, `Ingredient ${index + 1}`, errors.ingredients?.[index]?.message)} />
            <IconButton onClick={() => remove(index)} edge="end" aria-label="remove" size="large" sx={{ color: theme.palette.error.main }}>
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
        <Button type="button" variant="contained" color="primary" onClick={() => append('')}
         startIcon={<AddIcon />} 
         sx={{ mt: 2, backgroundColor: theme.palette.secondary.main, '&:hover': { backgroundColor: theme.palette.secondary.dark } }}>
          Add Ingredient
        </Button>
        <TextField {...textFieldProps('instructions', 'Instructions', errors.instructions?.message)} multiline rows={4} />
      </form>  
    </ModalWrapper>
  );
};

export default EditRecipe;
