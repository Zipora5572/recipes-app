import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RecipeType } from "../models/Recipe";
import { errorAlert } from "../services/alerts";

const API_URL = 'http://localhost:3000/api/recipes';

export const fetchData = createAsyncThunk('recipes/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(API_URL)
            return response.data
        }
        catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                if (e.response.status === 401) {
                    errorAlert("Unauthorized access")
                    return thunkAPI.rejectWithValue({ error: 'Unauthorized access' });
                }
                if (e.response.status === 403) {
                    errorAlert("Forbidden access")
                    return thunkAPI.rejectWithValue({ error: 'Forbidden access' });
                }
            }
            return thunkAPI.rejectWithValue({ e: e.message })
        }
    }
)

export const addRecipe = createAsyncThunk('recipes/add',
    async (recipe: RecipeType, thunkAPI) => {
        try {
            
            const response = await axios.post(API_URL, {
                title: recipe.title,
                description: recipe.description,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
                authorId: recipe.authorId,
            },
                {
                    headers: {
                        "user-id": recipe.authorId.toString(),
                    }
                }
            )
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue({ e: e.message })
        }
    }
)

export const updateRecipe = createAsyncThunk('recipes/update',
    async (recipe: RecipeType, thunkAPI) => {
        try {
            const response = await axios.put(`${API_URL}/${recipe.id}`, recipe);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue({ e: e.message });
        }
    }
);


export const deleteRecipe = createAsyncThunk('recipes/delete',
    async (recipeId: number, thunkAPI) => {
        try {
            await axios.delete(`${API_URL}/${recipeId}`);
            return recipeId; 
        } catch (e) {
            return thunkAPI.rejectWithValue({ e: e.message });
        }
    }
);

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        list: [] as RecipeType[], loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.list = [...action.payload]
                state.loading = false
            })
            .addCase(fetchData.rejected, (state, action) => {
                errorAlert("failed to fetch data")
                console.log('failed to fetch data', action.payload)
            })
            .addCase(addRecipe.fulfilled, (state, action) => {
                state.list = [...state.list, action.payload]
                console.log('added recipe', action.payload);
            })
            .addCase(addRecipe.rejected, (state, action) => {
                console.log('failed to fetch data', action.payload)
                errorAlert('failed to fetch data')
            })
            .addCase(updateRecipe.fulfilled, (state, action) => {
                const index = state.list.findIndex(recipe => recipe.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload; 
                }
                console.log('updated recipe', action.payload);
            })
            .addCase(updateRecipe.rejected, (state, action) => {
                console.log('failed to update recipe', action.payload);
                errorAlert('failed to update recipe')
            })
            .addCase(deleteRecipe.fulfilled, (state, action) => {
                state.list = state.list.filter(recipe => recipe.id !== action.payload); 
                console.log('deleted recipe with id', action.payload);
            })
            .addCase(deleteRecipe.rejected, (state, action) => {
                console.log('failed to delete recipe', action.payload);
                errorAlert('failed to delete recipe')
            });
    },
})

export default recipesSlice