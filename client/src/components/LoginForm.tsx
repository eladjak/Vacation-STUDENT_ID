import React, { useState } from 'react';
import { TextField, Button, Box, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface LoginFormProps {
    onSubmit: (username: string, password: string) => void;
    error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(username, password);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <TextField
                fullWidth
                label="שם משתמש"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                error={!!error}
                required
            />
            <TextField
                fullWidth
                label="סיסמה"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                error={!!error}
                helperText={error}
                required
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
            >
                התחבר
            </Button>
        </Box>
    );
};

export default LoginForm;


