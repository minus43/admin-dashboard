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
  FormControl,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Alert
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

function InventoryManagement() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: '기본 티셔츠',
      seller: '좋은회사',
      category: '의류',
      price: 29000,
      stock: 5,
      status: '판매중',
      minStock: 10
    },
    {
      id: 2,
      name: '청바지',
      seller: '멋진회사',
      category: '의류',
      price: 59000,
      stock: 50,
      status: '판매중',
      minStock: 20
    }
  ]);

  const [notifyDialog, setNotifyDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleStatusChange = (productId, newStatus) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, status: newStatus } : product
    ));
  };

  const handleNotify = (product) => {
    setSelectedProduct(product);
    setNotifyDialog(true);
  };

  const sendNotification = () => {
    // API 호출로 판매자에게 알림 전송
    console.log(`재고 부족 알림 전송: ${selectedProduct.seller}님, ${selectedProduct.name} 상품의 재고가 부족합니다.`);
    setNotifyDialog(false);
  };

  return (
    <div>
      <h2>상품 관리</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>상품명</TableCell>
              <TableCell>판매자</TableCell>
              <TableCell>카테고리</TableCell>
              <TableCell>가격</TableCell>
              <TableCell>재고</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow 
                key={product.id}
                sx={{
                  backgroundColor: product.stock < product.minStock ? '#fff3e0' : 'inherit'
                }}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.seller}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price.toLocaleString()}원</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {product.stock}
                    {product.stock < product.minStock && (
                      <Typography color="error" variant="caption">
                        (부족)
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <FormControl size="small">
                    <Select
                      value={product.status}
                      onChange={(e) => handleStatusChange(product.id, e.target.value)}
                    >
                      <MenuItem value="판매중">판매중</MenuItem>
                      <MenuItem value="품절">품절</MenuItem>
                      <MenuItem value="판매중지">판매중지</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  {product.stock < product.minStock && (
                    <Button
                      startIcon={<NotificationsIcon />}
                      color="warning"
                      size="small"
                      onClick={() => handleNotify(product)}
                    >
                      재고 알림
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 재고 알림 다이얼로그 */}
      <Dialog open={notifyDialog} onClose={() => setNotifyDialog(false)}>
        <DialogTitle>재고 부족 알림</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mt: 2 }}>
            현재 재고가 기준치 이하입니다.
          </Alert>
          <Typography sx={{ mt: 2 }}>
            {selectedProduct?.seller}님께 재고 부족 알림을 보내시겠습니까?
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              상품명: {selectedProduct?.name}
            </Typography>
            <Typography variant="body2">
              현재 재고: {selectedProduct?.stock}
            </Typography>
            <Typography variant="body2">
              기준 재고: {selectedProduct?.minStock}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotifyDialog(false)}>취소</Button>
          <Button onClick={sendNotification} variant="contained" color="warning">
            알림 전송
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InventoryManagement;
