
import { TextField, Box } from '@mui/material';
import React from 'react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface Field {
  name: string;
  label: string;
  type?: string;
  value?: string;
  required?: boolean;
  error?: string;
}

interface FormFieldsProps {
  fields: Field[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
}

const FormFields = ({
  fields,
  register,
  errors,
  handleChange,
  showPassword,
}: FormFieldsProps) => {
  const getHelperText = (name: string) => {
    const error = errors[name];
    if (error) {
      if ('message' in error) {
        return error.message as string;
      }
    }
    return undefined;
  };

  return (
    <Box>
      {fields.map((field) => (
        <Box key={field.name} display="flex" alignItems="center" mb={2}>
          <TextField
            {...register(field.name)}
            label={field.label}
            variant="outlined"
            fullWidth
            required={field.required}
            type={field.type === 'password' && showPassword !== undefined ? (showPassword ? 'text' : 'password') : field.type}
            margin="normal"
            value={field.value}
            onChange={handleChange}
            error={!!errors[field.name]}
            helperText={getHelperText(field.name)}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '8px',
              },
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default FormFields;