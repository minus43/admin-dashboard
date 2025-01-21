import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import SearchBar from './SearchBar';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/admin/dashboard');
  };

  // 현재 페이지에 따른 검색 옵션 설정
  const getSearchOptions = () => {
    const path = location.pathname;

    // 대시보드에서는 검색 옵션 없음
    if (path === '/admin/dashboard') return null;

    // 페이지별 검색 옵션
    const options = {
      '/admin/members/sellers': [
        { value: 'all', label: '전체' },
        { value: 'name', label: '판매자명' },
        { value: 'store', label: '상점명' },
      ],
      '/admin/members/users': [
        { value: 'all', label: '전체' },
        { value: 'name', label: '이름' },
        { value: 'email', label: '이메일' },
      ],
      '/admin/marketing/banners': [
        { value: 'all', label: '전체' },
        { value: 'title', label: '제목' },
      ],
      // ... 다른 페이지들의 검색 옵션
    };

    return options[path] || [{ value: 'all', label: '전체' }];
  };

  const handleSearch = (searchParams) => {
    console.log('Search:', searchParams);
    // 검색 로직 구현
  };

  // searchOptions 정의
  const searchOptions = getSearchOptions();

  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: '#1976d2',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar>
        <Typography
          variant='h6'
          component='div'
          sx={{
            cursor: 'pointer',
            fontWeight: 'bold',
            '&:hover': {
              opacity: 0.8,
            },
          }}
          onClick={handleLogoClick}
        >
          관리자 페이지
        </Typography>

        {/* 검색바 (대시보드 제외) */}
        {searchOptions && (
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              mx: 4,
            }}
          >
            <SearchBar
              searchOptions={searchOptions}
              onSearch={handleSearch}
              placeholder="검색어를 입력하세요"
              sx={{
                maxWidth: 600,
                width: '100%',
                height: '44px'
              }}
            />
          </Box>
        )}

        <Button
          color='inherit'
          onClick={handleLogout}
          sx={{
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          로그아웃
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
