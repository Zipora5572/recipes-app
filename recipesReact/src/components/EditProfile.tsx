import {Button, TextField } from '@mui/material';
import { FormEvent, useContext, useEffect, useState } from 'react';
import '../styles.css';
import { initialState, UserContext } from "../models/User";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { update } from '../services/userAPI';
import ModalWrapper from './ModalWrapper';

const EditProfile = ({ open, handleClose }: { open: boolean; handleClose: () => void; }) => {
    const { user, userDispatch } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: ''
    });

    useEffect(() => {
        if (user !== initialState) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                address: user.address || '',
                phoneNumber: user.phoneNumber || '',
                password: ''
            });
        }
    }, [user]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const result = await update({ ...user, ...formData });
            if (result) {
                userDispatch({ type: 'UPDATE', data: { ...formData, id: user.id } });
            }
        } catch (error) {
            console.error('Update failed', error);
        }
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address: '',
            phoneNumber: ''
        });
        handleClose();
    };

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <>
            <ModalWrapper open={open} handleClose={handleClose} title="Edit Profile" onSubmit={handleSubmit} submitText="Save">
                <TextField name='firstName' label="First Name" variant="outlined" fullWidth margin="normal" value={formData.firstName} onChange={handleChange} />
                <TextField name='lastName' label="Last Name" variant="outlined" fullWidth margin="normal" value={formData.lastName} onChange={handleChange} />
                <TextField name='email' label="Email" variant="outlined" fullWidth type="email" margin="normal" value={formData.email} onChange={handleChange} />
                <TextField name='address' label="Address" variant="outlined" fullWidth margin="normal" value={formData.address} onChange={handleChange} />
                <TextField name='phoneNumber' label="Phone Number" variant="outlined" fullWidth margin="normal" value={formData.phoneNumber} onChange={handleChange} />
                <TextField name='password' label="Password" variant="outlined" fullWidth required margin="normal" value={formData.password} onChange={handleChange} InputProps={{ endAdornment: (<Button onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>{showPassword ? <VisibilityOff /> : <Visibility />}</Button>) }} type={showPassword ? "text" : "password"} />
            </ModalWrapper>
        </>
    );
}
export default EditProfile;
