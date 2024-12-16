import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Tabs,
  Tab,
  Box,
  Chip,
  Card,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function AdvertisementManagement() {
  const [tabValue, setTabValue] = useState(0);
  const [ads, setAds] = useState([
    {
      id: 1,
      title: '여름 신상품 프로모션',
      imageUrl: 'https://via.placeholder.com/300x200',
      location: 'main_page',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      status: 'active',
      clicks: 150,
      views: 1000
    },
    {
      id: 2,
      title: '겨울 클리어런스',
      imageUrl: 'https://via.placeholder.com/300x200',
      location: 'category_page',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      status: 'scheduled',
      clicks: 0,
      views: 0
    }
  ]);

  const [adRequests, setAdRequests] = useState([
    {
      id: 1,
      sellerId: 'seller123',
      storeName: '패션스토어',
      title: '신규 브랜드 런칭',
      requestDate: '2024-01-15',
      desiredStartDate: '2024-02-01',
      desiredEndDate: '2024-02-28',
      status: 'pending',
      location: 'main_page'
    },
    {
      id: 2,
      sellerId: 'seller456',
      storeName: '디지털마트',
      title: '신년 할인전',
      requestDate: '2024-01-14',
      desiredStartDate: '2024-01-20',
      desiredEndDate: '2024-01-31',
      status: 'approved',
      location: 'category_page'
    }
  ]);

  const [open, setOpen] = useState(false);
  const [newAd, setNewAd] = useState({
    title: '',
    imageUrl: '',
    location: '',
    startDate: '',
    endDate: ''
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewAd({
      title: '',
      imageUrl: '',
      location: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleAdd = () => {
    setAds([
      ...ads,
      {
        id: ads.length + 1,
        ...newAd,
        status: 'scheduled',
        clicks: 0,
        views: 0
      }
    ]);
    handleClose();
  };

  const handleRequestAction = (id, action) => {
    setAdRequests(adRequests.map(request =>
      request.id === id
        ? { ...request, status: action === 'approve' ? 'approved' : 'rejected' }
        : request
    ));
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      active: { label: '진행중', color: 'success' },
      scheduled: { label: '예정', color: 'info' },
      ended: { label: '종료', color: 'default' },
      pending: { label: '검토중', color: 'warning' },
      approved: { label: '승인', color: 'success' },
      rejected: { label: '거절', color: 'error' }
    };

    const config = statusConfig[status] || statusConfig.ended;
    return <Chip label={config.label} color={config.color} size="small" />;
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="광고 관리" />
          <Tab label="광고 요청" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2>광고 관리</h2>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            광고 등록
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>위치</TableCell>
                <TableCell>기간</TableCell>
                <TableCell>상태</TableCell>
                <TableCell>통계</TableCell>
                <TableCell>관리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ads.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell>{ad.id}</TableCell>
                  <TableCell>{ad.title}</TableCell>
                  <TableCell>
                    <Card style={{ maxWidth: 100 }}>
                      <CardMedia
                        component="img"
                        height="60"
                        image={ad.imageUrl}
                        alt={ad.title}
                      />
                    </Card>
                  </TableCell>
                  <TableCell>{ad.location}</TableCell>
                  <TableCell>
                    {ad.startDate}<br/>~{ad.endDate}
                  </TableCell>
                  <TableCell>{getStatusChip(ad.status)}</TableCell>
                  <TableCell>
                    조회수: {ad.views}<br/>
                    클릭수: {ad.clicks}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      style={{ marginRight: '8px', marginBottom: '4px' }}
                    >
                      수정
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      size="small"
                    >
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <h2>광고 요청</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>요청ID</TableCell>
                <TableCell>판매자</TableCell>
                <TableCell>광고명</TableCell>
                <TableCell>요청일</TableCell>
                <TableCell>희망기간</TableCell>
                <TableCell>위치</TableCell>
                <TableCell>상태</TableCell>
                <TableCell>관리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>
                    {request.storeName}<br/>
                    <small>({request.sellerId})</small>
                  </TableCell>
                  <TableCell>{request.title}</TableCell>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>
                    {request.desiredStartDate}<br/>~{request.desiredEndDate}
                  </TableCell>
                  <TableCell>{request.location}</TableCell>
                  <TableCell>{getStatusChip(request.status)}</TableCell>
                  <TableCell>
                    {request.status === 'pending' && (
                      <>
                        <Button 
                          variant="contained" 
                          color="success" 
                          size="small"
                          style={{ marginRight: '4px', marginBottom: '4px' }}
                          onClick={() => handleRequestAction(request.id, 'approve')}
                        >
                          승인
                        </Button>
                        <Button 
                          variant="contained" 
                          color="error" 
                          size="small"
                          onClick={() => handleRequestAction(request.id, 'reject')}
                        >
                          거절
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>광고 등록</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: '8px' }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="광고 제목"
                value={newAd.title}
                onChange={(e) => setNewAd({...newAd, title: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="이미지 URL"
                value={newAd.imageUrl}
                onChange={(e) => setNewAd({...newAd, imageUrl: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>광고 위치</InputLabel>
                <Select
                  value={newAd.location}
                  label="광고 위치"
                  onChange={(e) => setNewAd({...newAd, location: e.target.value})}
                >
                  <MenuItem value="main_page">메인 페이지</MenuItem>
                  <MenuItem value="category_page">카테고리 페이지</MenuItem>
                  <MenuItem value="search_page">검색 결과 페이지</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="시작일"
                type="date"
                value={newAd.startDate}
                onChange={(e) => setNewAd({...newAd, startDate: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="종료일"
                type="date"
                value={newAd.endDate}
                onChange={(e) => setNewAd({...newAd, endDate: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">
            등록
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdvertisementManagement;
