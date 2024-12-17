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
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';

function CouponManagement() {
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      name: '신규가입 할인',
      discountType: 'percentage',
      discountValue: 10,
      minOrderAmount: 10000,
      maxDiscountAmount: 5000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      issuedCount: 100,
      usedCount: 30
    },
    {
      id: 2,
      name: '첫 구매 할인',
      discountType: 'fixed',
      discountValue: 3000,
      minOrderAmount: 30000,
      maxDiscountAmount: 3000,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      status: 'active',
      issuedCount: 50,
      usedCount: 10
    }
  ]);

  const [open, setOpen] = useState(false);
  const [batchOpen, setBatchOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    name: '',
    discountType: 'percentage',
    discountValue: '',
    minOrderAmount: '',
    maxDiscountAmount: '',
    startDate: '',
    endDate: '',
    status: 'active'
  });

  const [batchConfig, setBatchConfig] = useState({
    couponId: '',
    targetUserCount: '',
    condition: 'all', // all, new_users, active_users
    minPurchaseAmount: ''
  });

  const [isEdit, setIsEdit] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState({
    id: null,
    name: '',
    discountType: 'percentage',
    discountValue: '',
    minOrderAmount: '',
    maxDiscountAmount: '',
    startDate: '',
    endDate: '',
    status: 'active'
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewCoupon({
      name: '',
      discountType: 'percentage',
      discountValue: '',
      minOrderAmount: '',
      maxDiscountAmount: '',
      startDate: '',
      endDate: '',
      status: 'active'
    });
  };

  const handleBatchOpen = () => setBatchOpen(true);
  const handleBatchClose = () => {
    setBatchOpen(false);
    setBatchConfig({
      couponId: '',
      targetUserCount: '',
      condition: 'all',
      minPurchaseAmount: ''
    });
  };

  
  const handleBatchIssue = () => {
    // 실제로는 서버에 배치 작업 요청을 보내야 함
    alert(`${batchConfig.targetUserCount}명의 사용자에게 쿠폰 발급 작업이 시작되었습니다.`);
    handleBatchClose();
  };

  const handleEdit = (coupon) => {
    setIsEdit(true);
    setCurrentCoupon({
      id: coupon.id,
      name: coupon.name,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrderAmount: coupon.minOrderAmount,
      maxDiscountAmount: coupon.maxDiscountAmount,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      status: coupon.status
    });
    setOpen(true);
  };

  const handleSave = () => {
    if (isEdit) {
      setCoupons(coupons.map(coupon =>
        coupon.id === currentCoupon.id ? {
          ...currentCoupon,
          issuedCount: coupon.issuedCount,
          usedCount: coupon.usedCount
        } : coupon
      ));
    } else {
      setCoupons([
        ...coupons,
        {
          id: coupons.length + 1,
          ...newCoupon,
          issuedCount: 0,
          usedCount: 0
        }
      ]);
    }
    handleClose();
  };

  const handleStop = (id) => {
    if(window.confirm('쿠폰을 중지하시겠습니까?')) {
      setCoupons(coupons.map(coupon =>
        coupon.id === id ? { ...coupon, status: 'inactive' } : coupon
      ));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>쿠폰 관리</h2>
        <div>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleBatchOpen}
            style={{ marginRight: '10px' }}
          >
            쿠폰 일괄 발급
          </Button>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            쿠폰 등록
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>쿠폰명</TableCell>
              <TableCell>할인</TableCell>
              <TableCell>사용조건</TableCell>
              <TableCell>유효기간</TableCell>
              <TableCell>발급/사용</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>{coupon.id}</TableCell>
                <TableCell>{coupon.name}</TableCell>
                <TableCell>
                  {coupon.discountType === 'percentage' 
                    ? `${coupon.discountValue}%` 
                    : `${coupon.discountValue.toLocaleString()}원`}
                </TableCell>
                <TableCell>
                  {`${coupon.minOrderAmount.toLocaleString()}원 이상`}
                  <br />
                  {`최대 ${coupon.maxDiscountAmount.toLocaleString()}원`}
                </TableCell>
                <TableCell>
                  {coupon.startDate} ~ {coupon.endDate}
                </TableCell>
                <TableCell>
                  {`${coupon.issuedCount}/${coupon.usedCount}`}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={coupon.status === 'active' ? '활성' : '비활성'} 
                    color={coupon.status === 'active' ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    style={{ marginRight: '8px' }}
                    onClick={() => handleEdit(coupon)}
                  >
                    수정
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    size="small"
                    onClick={() => handleStop(coupon.id)}
                    disabled={coupon.status === 'inactive'}
                  >
                    중지
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 쿠폰 등록/수정 다이얼로그 */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{isEdit ? '쿠폰 수정' : '쿠폰 등록'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: '8px' }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="쿠폰명"
                value={isEdit ? currentCoupon.name : newCoupon.name}
                onChange={(e) => isEdit 
                  ? setCurrentCoupon({...currentCoupon, name: e.target.value})
                  : setNewCoupon({...newCoupon, name: e.target.value})
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>할인 유형</InputLabel>
                <Select
                  value={isEdit ? currentCoupon.discountType : newCoupon.discountType}
                  label="할인 유형"
                  onChange={(e) => isEdit 
                    ? setCurrentCoupon({...currentCoupon, discountType: e.target.value})
                    : setNewCoupon({...newCoupon, discountType: e.target.value})
                  }
                >
                  <MenuItem value="percentage">비율 할인</MenuItem>
                  <MenuItem value="fixed">정액 할인</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={isEdit ? currentCoupon.discountType === 'percentage' ? '할인율(%)' : '할인금액(원)' : newCoupon.discountType === 'percentage' ? '할인율(%)' : '할인금액(원)'}
                type="number"
                value={isEdit ? currentCoupon.discountValue : newCoupon.discountValue}
                onChange={(e) => isEdit 
                  ? setCurrentCoupon({...currentCoupon, discountValue: e.target.value})
                  : setNewCoupon({...newCoupon, discountValue: e.target.value})
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="최소주문금액"
                type="number"
                value={isEdit ? currentCoupon.minOrderAmount : newCoupon.minOrderAmount}
                onChange={(e) => isEdit 
                  ? setCurrentCoupon({...currentCoupon, minOrderAmount: e.target.value})
                  : setNewCoupon({...newCoupon, minOrderAmount: e.target.value})
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="최대할인금액"
                type="number"
                value={isEdit ? currentCoupon.maxDiscountAmount : newCoupon.maxDiscountAmount}
                onChange={(e) => isEdit 
                  ? setCurrentCoupon({...currentCoupon, maxDiscountAmount: e.target.value})
                  : setNewCoupon({...newCoupon, maxDiscountAmount: e.target.value})
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="시작일"
                type="date"
                value={isEdit ? currentCoupon.startDate : newCoupon.startDate}
                onChange={(e) => isEdit 
                  ? setCurrentCoupon({...currentCoupon, startDate: e.target.value})
                  : setNewCoupon({...newCoupon, startDate: e.target.value})
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="종료일"
                type="date"
                value={isEdit ? currentCoupon.endDate : newCoupon.endDate}
                onChange={(e) => isEdit 
                  ? setCurrentCoupon({...currentCoupon, endDate: e.target.value})
                  : setNewCoupon({...newCoupon, endDate: e.target.value})
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {isEdit ? '수정' : '등록'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 쿠폰 일괄 발급 다이얼로그 */}
      <Dialog open={batchOpen} onClose={handleBatchClose}>
        <DialogTitle>쿠폰 일괄 발급</DialogTitle>
        <DialogContent>
          <Alert severity="info" style={{ marginBottom: '16px' }}>
            설정한 조건에 맞는 사용자들에게 쿠폰이 일괄 발급됩니다.
          </Alert>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>발급할 쿠폰</InputLabel>
                <Select
                  value={batchConfig.couponId}
                  label="발급할 쿠폰"
                  onChange={(e) => setBatchConfig({...batchConfig, couponId: e.target.value})}
                >
                  {coupons.map(coupon => (
                    <MenuItem key={coupon.id} value={coupon.id}>
                      {coupon.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="발급 대상 인원"
                type="number"
                value={batchConfig.targetUserCount}
                onChange={(e) => setBatchConfig({...batchConfig, targetUserCount: e.target.value})}
                helperText="발급할 최대 인원을 입력하세요"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>발급 대상 조건</InputLabel>
                <Select
                  value={batchConfig.condition}
                  label="발급 대상 조건"
                  onChange={(e) => setBatchConfig({...batchConfig, condition: e.target.value})}
                >
                  <MenuItem value="all">전체 회원</MenuItem>
                  <MenuItem value="new_users">신규 가입자</MenuItem>
                  <MenuItem value="active_users">활성 사용자</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="최소 구매금액 조건"
                type="number"
                value={batchConfig.minPurchaseAmount}
                onChange={(e) => setBatchConfig({...batchConfig, minPurchaseAmount: e.target.value})}
                helperText="설정한 금액 이상 구매한 사용자에게만 발급됩니다"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBatchClose}>취소</Button>
          <Button onClick={handleBatchIssue} variant="contained" color="primary">
            일괄 발급 시작
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CouponManagement;
