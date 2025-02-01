import { Button, Typography, Box } from '@mui/material';
import { useContext, useState } from 'react';
import '../styles.css';
import { initialState, UserContext, UserType } from "../models/User";
import { useNavigate } from 'react-router-dom';
import { login, signUp } from '../services/userAPI';
import UserProfile from './UserProfile';
import useModal from '../hooks/useModal';
import ModalWrapper from './ModalWrapper';
import AuthButtons from './AuthButtons';
import FormFields from './FormFields';
import { FieldValues, useForm, UseFormRegister } from 'react-hook-form';

interface FormData {
    email: string;
    password: string;
}

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const { user, userDispatch } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { isOpen, openModal, closeModal } = useModal();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const handleOpen = (isSignUp: boolean) => {
        setIsSignUp(isSignUp);
        openModal();
    }

    const handleClose = () => {
        if (user !== initialState) {
            navigate('/home');
        }
        closeModal();
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const onSubmit = async (data: Partial<UserType>) => {
        try {
            let result;
            if (isSignUp) {
                result = await signUp(data);
                if (result) {
                    userDispatch({ type: 'REGISTER', data: { ...data, id: result.userId } });
                }
            } else {
                result = await login(data);
                if (result) {
                    userDispatch({ type: 'LOGIN', data: result.user });
                }
            }
        } catch (error) {
            console.error(isSignUp ? 'Registration failed' : 'Login failed', error);
        }
        reset();
        handleClose();
    };
    const fields = [
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true }
    ];
    return (
        <>
            {user !== initialState && <UserProfile />}
           {user === initialState && <AuthButtons handleOpen={handleOpen} />}
            <ModalWrapper
                open={isOpen}
                handleClose={handleClose}
                title={isSignUp ? 'Sign Up' : 'Sign In'}
                onSubmit={handleSubmit(onSubmit)}
                submitText={isSignUp ? 'Sign Up' : 'Sign In'}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormFields
                        fields={fields}
                        register={register as unknown as UseFormRegister<FieldValues>}
                        errors={errors}
                        showPassword={showPassword}
                        handleClickShowPassword={handleClickShowPassword}
                        handleMouseDownPassword={handleMouseDownPassword}
                    />
                    <Box  display="flex" alignItems="center" >
                        <Typography>
                            {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
                        </Typography>
                        <Button onClick={() => setIsSignUp(!isSignUp)} sx={{ textTransform: 'none',color:'#3f3ff2' }}>
                            {isSignUp ? 'Sign in' : 'Sign up'}
                        </Button>
                    </Box>
                </form>
            </ModalWrapper>
        </>
    );
};
export default Login;