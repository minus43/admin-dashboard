import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Button,
  TextField,
  Divider,
  Box,
  IconButton,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton as MuiIconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

function SellerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState({
    id: '',
    name: '',
    businessNo: '',
    email: '',
    phone: '',
    address: '',
    joinDate: '',
    status: '승인대기',
    businessRegistration: '',
    businessInfo: {
      companyName: '',
      representative: '',
      businessType: '',
      businessCategory: ''
    }
  });

  const [imageOpen, setImageOpen] = useState(false);

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
      status: '승인대기',
      businessRegistration: 'https://example.com/path/to/business-registration.jpg',
      businessInfo: {
        companyName: '(주)판매회사',
        representative: '김대표',
        businessType: '도소매',
        businessCategory: '의류'
      }
    });
  }, [id]);

  const handleBack = () => {
    navigate('/admin/members/sellers');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '승인대기':
        return 'warning';
      case '승인완료':
        return 'success';
      case '승인거부':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleStatusChange = (newStatus) => {
    setSeller({ ...seller, status: newStatus });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <h2 style={{ margin: 0 }}>판매자 상세 정보</h2>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mr: 2 }}>현재 상태:</Typography>
            <Chip 
              label={seller.status}
              color={getStatusColor(seller.status)}
            />
          </Box>

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
            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={() => setImageOpen(true)}
                sx={{ mt: 1 }}
              >
                사업자 등록증 보기
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            {seller.status === '승인대기' && (
              <>
                <Button 
                  variant="contained" 
                  color="success"
                  onClick={() => handleStatusChange('승인완료')}
                >
                  승인
                </Button>
                <Button 
                  variant="contained" 
                  color="error"
                  onClick={() => handleStatusChange('승인거부')}
                >
                  거부
                </Button>
              </>
            )}
            {seller.status === '승인완료' && (
              <Button 
                variant="contained" 
                color="error"
                onClick={() => handleStatusChange('승인거부')}
              >
                승인 취소
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={imageOpen}
        onClose={() => setImageOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          사업자 등록증
          <MuiIconButton
            aria-label="close"
            onClick={() => setImageOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </MuiIconButton>
        </DialogTitle>
        <DialogContent>
          <img
            src={seller.businessRegistration}
            alt="사업자 등록증"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '80vh',
              objectFit: 'contain'
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default SellerDetail;
