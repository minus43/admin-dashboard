import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent,  
  Grid, 
  Button,
  TextField,
  Box,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    joinDate: '',
    status: ''
  });

  useEffect(() => {
    // API 호출 대신 임시 데이터
    setUser({
      id: id,
      name: '홍길동',
      email: 'hong@example.com',
      phone: '010-1234-5678',
      address: '서울시 강남구',
      joinDate: '2023-01-01',
      status: '활성'
    });
  }, [id]);

  const handleBack = () => {
    navigate('/admin/members/users');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <h2 style={{ margin: 0 }}>사용자 상세 정보</h2>
      </Box>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="이름"
                value={user.name}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="이메일"
                value={user.email}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="전화번호"
                value={user.phone}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="가입일"
                value={user.joinDate}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="주소"
                value={user.address}
                disabled
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="contained" color="primary">
              수정
            </Button>
            <Button variant="contained" color="error">
              계정 비활성화
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserDetail;