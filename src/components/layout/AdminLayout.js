import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';

function AdminLayout() {
  return (
    <Box>
      <Header />
      <Box 
        sx={{ 
          display: 'flex',
          height: 'calc(100vh - 64px)', // 전체 높이에서 헤더 높이를 뺌
          marginTop: '64px' // 헤더 높이만큼 마진
        }}
      >
        <Box 
          sx={{ 
            width: '200px',
            flexShrink: 0,
            backgroundColor: '#f5f5f5'
          }}
        >
          <Sidebar />
        </Box>
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            p: 3,
            backgroundColor: '#fff',
            overflowY: 'auto'  // 내용이 많을 경우 스크롤
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLayout;
