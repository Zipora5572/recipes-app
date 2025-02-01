
import { createBrowserRouter } from 'react-router-dom';
import About from './About';
import AppLayout from './AppLayout';
import HomePage from './Home';
import RecipeList from './RecipeList';

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <h1>error</h1>,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/home', element: <HomePage /> },
            { path: 'about', element: <About /> },
            { path: 'recipes', element: <RecipeList /> },
        ]
    },
])