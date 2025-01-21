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
  Switch,
  FormControlLabel,
  Grid,
  Card,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Box,
  Chip
} from '@mui/material';

function BannerManagement() {
  const [tabValue, setTabValue] = useState(0);
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: '신년 세일',
      imageUrl: 'https://via.placeholder.com/800x200',
      linkUrl: 'https://example.com/sale',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      position: 'main_top',
      isActive: true
    },
    {
      id: 2,
      title: '새학기 특별전',
      imageUrl: 'https://via.placeholder.com/800x200',
      linkUrl: 'https://example.com/school',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      position: 'main_middle',
      isActive: false
    }
  ]);

  const [open, setOpen] = useState(false);


  const [currentBanner, setCurrentBanner] = useState({
    id: null,
    title: '',
    imageUrl: '',
    linkUrl: '',
    startDate: '',
    endDate: '',
    position: 'main_top',
    isActive: true
  });

  const [isEdit, setIsEdit] = useState(false);

  const [adRequests, setAdRequests] = useState([
    {
      id: 1,
      sellerId: 'seller123',
      storeName: '패션스토어',
      title: '신규 브랜드 런칭',
      imageUrl: 'https://via.placeholder.com/800x200',
      linkUrl: 'https://example.com/launch',
      requestDate: '2024-01-15',
      desiredStartDate: '2024-02-01',
      desiredEndDate: '2024-02-28',
      position: 'main_top',
      status: 'pending'
    }
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    
  };



  const handleToggleActive = (id) => {
    setBanners(banners.map(banner =>
      banner.id === id ? { ...banner, isActive: !banner.isActive } : banner
    ));
  };

  const handleDelete = (id) => {
    if(window.confirm('정말 삭제하시겠습니까?')) {
      setBanners(banners.filter(banner => banner.id !== id));
    }
  };

  const handleEdit = (banner) => {
    setCurrentBanner({
      id: banner.id,
      title: banner.title,
      imageUrl: banner.imageUrl,
      linkUrl: banner.linkUrl,
      startDate: banner.startDate,
      endDate: banner.endDate,
      position: banner.position,
      isActive: banner.isActive
    });
    setIsEdit(true);
    setOpen(true);
  };

  const handleSave = () => {
    if (isEdit) {
      setBanners(banners.map(banner =>
        banner.id === currentBanner.id ? currentBanner : banner
      ));
    } else {
      setBanners([
        ...banners,
        {
          id: banners.length + 1,
          ...currentBanner
        }
      ]);
    }
    handleClose();
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      active: { label: '활성', color: 'success' },
      inactive: { label: '비활성', color: 'default' },
      pending: { label: '검토중', color: 'warning' },
      approved: { label: '승인', color: 'success' },
      rejected: { label: '거절', color: 'error' }
    };
    const config = statusConfig[status] || statusConfig.inactive;
    return <Chip label={config.label} color={config.color} size="small" />;
  };

  const handleRequestAction = (request, action) => {
    if (action === 'approve') {
      setBanners([
        ...banners,
        {
          id: banners.length + 1,
          title: request.title,
          imageUrl: request.imageUrl,
          linkUrl: request.linkUrl,
          startDate: request.desiredStartDate,
          endDate: request.desiredEndDate,
          position: request.position,
          isActive: true
        }
      ]);
    }

    setAdRequests(adRequests.map(req =>
      req.id === request.id
        ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' }
        : req
    ));
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="배너 관리" />
          <Tab label="광고 요청" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2>배너 관리</h2>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            배너 등록
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>게시 기간</TableCell>
                <TableCell>위치</TableCell>
                <TableCell>상태</TableCell>
                <TableCell>관리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>{banner.id}</TableCell>
                  <TableCell>{banner.title}</TableCell>
                  <TableCell>
                    <Card style={{ maxWidth: 200 }}>
                      <CardMedia
                        component="img"
                        height="60"
                        image={banner.imageUrl}
                        alt={banner.title}
                      />
                    </Card>
                  </TableCell>
                  <TableCell>
                    {banner.startDate} ~ {banner.endDate}
                  </TableCell>
                  <TableCell>{banner.position}</TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={banner.isActive}
                          onChange={() => handleToggleActive(banner.id)}
                          color="primary"
                        />
                      }
                      label={banner.isActive ? "활성" : "비활성"}
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      style={{ marginRight: '8px' }}
                      onClick={() => handleEdit(banner)}
                    >
                      수정
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      size="small"
                      onClick={() => handleDelete(banner.id)}
                    >
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>배너 등록</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} style={{ marginTop: '8px' }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="배너 제목"
                  value={currentBanner.title}
                  onChange={(e) => setCurrentBanner({...currentBanner, title: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="이미지 URL"
                  value={currentBanner.imageUrl}
                  onChange={(e) => setCurrentBanner({...currentBanner, imageUrl: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="링크 URL"
                  value={currentBanner.linkUrl}
                  onChange={(e) => setCurrentBanner({...currentBanner, linkUrl: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>배너 위치</InputLabel>
                  <Select
                    value={currentBanner.position}
                    label="배너 위치"
                    onChange={(e) => setCurrentBanner({...currentBanner, position: e.target.value})}
                  >
                    <MenuItem value="main_top">메인 상단</MenuItem>
                    <MenuItem value="main_middle">메인 중단</MenuItem>
                    <MenuItem value="main_bottom">메인 하단</MenuItem>
                    <MenuItem value="category_top">카테고리 상단</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="시작일"
                  type="date"
                  value={currentBanner.startDate}
                  onChange={(e) => setCurrentBanner({...currentBanner, startDate: e.target.value})}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="종료일"
                  type="date"
                  value={currentBanner.endDate}
                  onChange={(e) => setCurrentBanner({...currentBanner, endDate: e.target.value})}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentBanner.isActive}
                      onChange={(e) => setCurrentBanner({...currentBanner, isActive: e.target.checked})}
                      color="primary"
                    />
                  }
                  label="활성화"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              등록
            </Button>
          </DialogActions>
        </Dialog>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>요청ID</TableCell>
                <TableCell>판매자</TableCell>
                <TableCell>배너명</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>희망 위치</TableCell>
                <TableCell>희망 기간</TableCell>
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
                  <TableCell>
                    <Card style={{ maxWidth: 200 }}>
                      <CardMedia
                        component="img"
                        height="60"
                        image={request.imageUrl}
                        alt={request.title}
                      />
                    </Card>
                  </TableCell>
                  <TableCell>{request.position}</TableCell>
                  <TableCell>
                    {request.desiredStartDate}<br/>~{request.desiredEndDate}
                  </TableCell>
                  <TableCell>{getStatusChip(request.status)}</TableCell>
                  <TableCell>
                    {request.status === 'pending' && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          style={{ marginRight: '4px', marginBottom: '4px' }}
                          onClick={() => handleRequestAction(request, 'approve')}
                        >
                          승인
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleRequestAction(request, 'reject')}
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
    </div>
  );
}

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default BannerManagement;
