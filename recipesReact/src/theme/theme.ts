import { createTheme } from '@mui/material';

export const primaryColor = '#ff5722';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: '#white',
        },
        background: {
            default: '#white',
            paper: '#ffffff',
        },
        text: {
            primary: '#212121',
            secondary: '#757575',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: {
          fontSize: '2.5rem',
          fontWeight: 700,
        },
        h2: {
          fontSize: '2rem',
          fontWeight: 600,
        },
        h3: {
          fontSize: '1.75rem',
          fontWeight: 500,
        },
        body1: {
          fontSize: '1rem',
          fontWeight: 400,
        },
      },
   
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        // backgroundColor: primaryColor,
                        // color:'white'
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    minHeight: '350px',
                },
            },
        },
       
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: '#white',
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                borderColor: '#03dac6',
              },
            },
          },
    },
});

export default theme;
