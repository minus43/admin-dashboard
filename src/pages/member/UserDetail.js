import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Card, 
  CardContent,  
  Grid, 
  Button,
  TextField
} from '@mui/material';

function UserDetail() {
  const { id } = useParams();
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

  return (
    <div>
      <h2>사용자 상세 정보</h2>
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
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
              수정
            </Button>
            <Button variant="contained" color="error">
              계정 비활성화
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserDetail;