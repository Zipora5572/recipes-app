import { Box, Button } from '@mui/material';
import { primaryColor } from '../theme/theme';

interface AuthButtonsProps {
    handleOpen: (isSignUp: boolean) => void;
}

const AuthButtons = ({ handleOpen }: AuthButtonsProps) => {
    
    const buttonStyles = {
        width: '110px',
        fontWeight: 'bold',
        textTransform: 'none',
        boxShadow: '0px',
        border: '0px',
        transition: 'all 0.3s ease-in-out',
    };
    
    return (
        <>
        <Box>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => handleOpen(true)}
                sx={{
                    ...buttonStyles,
                }}
            >
                Sign Up
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpen(false)}
                sx={{
                    ...buttonStyles,
                    borderRadius: '50px',
                    padding: '10px 10px',
                    backgroundColor: primaryColor,
                }}
            >
                Log In
            </Button>
        </Box>
        </>
    );
};

export default AuthButtons;
