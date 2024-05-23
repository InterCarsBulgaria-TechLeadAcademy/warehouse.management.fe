import { IconButton, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import React from 'react';
import {  FieldErrors } from 'react-hook-form';

interface ShowHideFunctionalityProps {
    field:  any;
    label: string;
    id: string;
    name: string;
    required: boolean;
    VisibilityOff: React.ElementType;
    Visibility: React.ElementType;
    color?: string
    errors: FieldErrors<any>
}


export default function ShowHideFunctionality(
    {
        field,
        label,
        id,
        name,
        required,
        VisibilityOff,
        Visibility,
        color,
        errors
    }: ShowHideFunctionalityProps

) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return (
        <TextField
            {...field}
            label={label}
            id={id}
            name={name}
            margin="normal"
            required={required}
            fullWidth
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            autoComplete="current-password"
            color={color}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
        />
    )
}