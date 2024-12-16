import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Button,
  TextField,
  Divider
} from '@mui/material';

function SellerDetail() {
  const { id } = useParams();
  const [seller, setSeller] = useState({
    id: '',
    name: '',
    businessNo: '',
    email: '',
    phone: '',
    address: '',
    joinDate: '',
    status: '',
    businessInfo: {
      companyName: '',
      representative: '',
      businessType: '',
      businessCategory: ''
    }
  });

  useEffect(() => {
    // API 호출 대신 임시 데이터
    setSeller({
      id: id,
      name: '판매자1',
      businessNo: '123-45-67890',
      email: 'seller@example.com',
      phone: '010-9876-5432',
      address: '서울시 강남구',
      joinDate: '2023-01-01',
      status: '활성',
      businessInfo: {
        companyName: '(주)판매회사',
        representative: '김대표',
        businessType: '도소매',
        businessCategory: '의류'
      }
    });
  }, [id]);

  return (
    <div>
      <h2>판매자 상세 정보</h2>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            기본 정보
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="판매자명"
                value={seller.name}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="사업자번호"
                value={seller.businessNo}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="이메일"
                value={seller.email}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="전화번호"
                value={seller.phone}
                disabled
              />
            </Grid>
          </Grid>

          <Divider style={{ margin: '20px 0' }} />

          <Typography variant="h6" gutterBottom>
            사업자 정보
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="회사명"
                value={seller.businessInfo.companyName}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="대표자명"
                value={seller.businessInfo.representative}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="업태"
                value={seller.businessInfo.businessType}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="업종"
                value={seller.businessInfo.businessCategory}
                disabled
              />
            </Grid>
          </Grid>

          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
              정보 수정
            </Button>
            <Button variant="contained" color="error">
              계정 정지
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SellerDetail;
