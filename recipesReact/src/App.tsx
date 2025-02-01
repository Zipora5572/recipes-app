import React, { useReducer } from 'react';
import './App.css';
import UserReducer, { initialState, UserContext } from './models/User';
import { RouterProvider } from 'react-router-dom';
import { router } from './components/AppRoutes';
import { Provider } from "react-redux";
import store from './store/store';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';


const App = () => {
  const [user, userDispatch] = useReducer(UserReducer, initialState);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <UserContext value={{ user, userDispatch }}>
          <RouterProvider router={router} />
        </UserContext>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
