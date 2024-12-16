import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/admin/dashboard');
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8
            }
          }}
          onClick={handleLogoClick}
        >
          관리자 페이지
        </Typography>
        <Button 
          color="inherit" 
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

