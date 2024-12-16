import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

function AdminLoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleLogin = () => {
    navigate('/admin');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: '100%',
          maxWidth: '400px',
          p: 4,
          border: '1px solid #ddd',
          borderRadius: 2
        }}
      >
        <Typography variant="h5" mb={3}>관리자 로그인</Typography>
        <TextField
          fullWidth
          label="이메일"
          margin="normal"
          value={credentials.email}
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
        />
        <TextField
          fullWidth
          type="password"
          label="비밀번호"
          margin="normal"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          로그인
        </Button>
      </Box>
    </Box>
  );
}

export default AdminLoginPage;
