import React from 'react';
import { Box, Modal, Typography, Button } from '@mui/material';
import { primaryColor } from '../theme/theme';

interface ModalWrapperProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitText?: string;
}

const ModalWrapper = ({ open, handleClose, title, children, onSubmit, submitText }: ModalWrapperProps) => {
  const buttonStyles = {
    padding: '10px 0',
    fontWeight: 'bold',
    transition: 'all 0.3s ease-in-out',
    width: '100%', 
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          border: `2px solid ${primaryColor}`,
          boxShadow: 24,
          p: 4,
          borderRadius: '12px',
          maxHeight: '80vh',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
     
      >
        <Button
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            minWidth: 'auto',     
            color: 'red',
            fontSize:'20px',        
          }}
        >
          X
        </Button>
        <Typography variant="h6" component="h2" gutterBottom sx={{ color: primaryColor }}>
          {title}
        </Typography>
        {children}
        <Button
          variant="outlined"
          color="primary"
          onClick={onSubmit}
          sx={{
            ...buttonStyles,
            border: `2px solid ${primaryColor}`,
            color: primaryColor,
            mt: 2, 
            '&:hover': {
              backgroundColor: primaryColor,
              color: 'white',
            },
          }}
        >
          {submitText || 'Submit'}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalWrapper;
