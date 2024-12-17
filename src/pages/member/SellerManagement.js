import { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  Collapse,
  Box,
  Grid,
  TextField,
  IconButton,
  Dialog, 
  DialogTitle, 
  DialogContent,
  Typography,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

function SellerManagement() {
  const [sellers, setSellers] = useState([]);
  const [expandedSeller, setExpandedSeller] = useState(null);
  const [imageOpen, setImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // API 호출 대신 임시 데이터
    setSellers([
      { 
        id: 1, 
        name: '판매자1', 
        businessNo: '123-45-67890', 
        status: '승인대기',
        email: 'seller1@example.com',
        phone: '010-1234-5678',
        address: '서울시 강남구',
        representative: '홍길동',
        joinDate: '2024-01-15',
        businessName: '좋은회사',
        businessAddress: '서울시 강남구 테헤란로 123',
        businessRegistration: 'https://example.com/path/to/business-registration.jpg',
        businessInfo: {
          companyName: '(주)좋은회사',
          representative: '홍길동',
          businessType: '도소매',
          businessCategory: '의류'
        }
      },
      { 
        id: 2, 
        name: '판매자2', 
        businessNo: '234-56-78901', 
        status: '승인완료',
        email: 'seller2@example.com',
        phone: '010-5678-1234',
        address: '서울시 서초구',
        representative: '김철수',
        joinDate: '2024-01-16',
        businessName: '멋진회사',
        businessAddress: '서울시 서초구 강남대로 456',
        businessRegistration: 'https://example.com/path/to/business-registration.jpg',
        businessInfo: {
          companyName: '(주)멋진회사',
          representative: '김철수',
          businessType: '도소매',
          businessCategory: '의류'
        }
      },
    ]);
  }, []);

  const handleExpandClick = (sellerId) => {
    setExpandedSeller(expandedSeller === sellerId ? null : sellerId);
  };

  const handleStatusToggle = (sellerId) => {
    setSellers(sellers.map(seller => {
      if (seller.id === sellerId) {
        const newStatus = seller.status === '승인완료' ? '승인대기' : '승인완료';
        return { ...seller, status: newStatus };
      }
      return seller;
    }));
  };

  const handleImageOpen = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageOpen(true);
  };

  return (
    <div>
      <h2>판매자 관리</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="50px" />
              <TableCell>ID</TableCell>
              <TableCell>판매자명</TableCell>
              <TableCell>사업자번호</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellers.map((seller) => (
              <>
                <TableRow key={seller.id}>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleExpandClick(seller.id)}
                    >
                      {expandedSeller === seller.id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{seller.id}</TableCell>
                  <TableCell>{seller.name}</TableCell>
                  <TableCell>{seller.businessNo}</TableCell>
                  <TableCell>{seller.status}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      color={seller.status === '승인완료' ? "error" : "primary"}
                      size="small"
                      onClick={() => handleStatusToggle(seller.id)}
                    >
                      {seller.status === '승인완료' ? '승인취소' : '승인'}
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expandedSeller === seller.id} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 2 }}>
                        <Typography variant="h6" gutterBottom>기본 정보</Typography>
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
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="가입일"
                              value={seller.joinDate}
                              disabled
                            />
                          </Grid>
                        </Grid>

                        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>사업자 정보</Typography>
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
                              onClick={() => handleImageOpen(seller.businessRegistration)}
                              sx={{ mt: 1 }}
                            >
                              사업자 등록증 보기
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={imageOpen}
        onClose={() => setImageOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          사업자 등록증
          <IconButton
            aria-label="close"
            onClick={() => setImageOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <img
            src={selectedImage}
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
    </div>
  );
}

export default SellerManagement;
