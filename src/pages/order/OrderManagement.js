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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

function OrderManagement() {
  const [orders, setOrders] = useState([
    {
      id: "ORD20240115001",
      userId: "user123",
      userName: "홍길동",
      products: [
        { name: "기본 티셔츠", quantity: 2, price: 29000 },
        { name: "청바지", quantity: 1, price: 59000 }
      ],
      totalAmount: 117000,
      status: "결제완료",
      orderDate: "2024-01-15 14:30:22"
    },
    {
      id: "ORD20240115002",
      userId: "user456",
      userName: "김철수",
      products: [
        { name: "운동화", quantity: 1, price: 89000 }
      ],
      totalAmount: 89000,
      status: "배송중",
      orderDate: "2024-01-15 15:45:33"
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const handleDetailOpen = (order) => {
    setSelectedOrder(order);
    setDetailOpen(true);
  };

  const handleStatusOpen = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setStatusOpen(true);
  };

  const handleStatusChange = () => {
    setOrders(orders.map(order => 
      order.id === selectedOrder.id 
        ? { ...order, status: newStatus }
        : order
    ));
    setStatusOpen(false);
  };

  const handleDelete = (orderId) => {
    if(window.confirm('정말 삭제하시겠습니까?')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case '결제완료': return 'primary';
      case '배송준비': return 'warning';
      case '배송중': return 'info';
      case '배송완료': return 'success';
      case '취소': return 'error';
      default: return 'default';
    }
  };

  return (
    <div>
      <h2>주문 관리</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>주문번호</TableCell>
              <TableCell>주문자</TableCell>
              <TableCell>상품정보</TableCell>
              <TableCell>결제금액</TableCell>
              <TableCell>주문상태</TableCell>
              <TableCell>주문일시</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.userName}<br/>({order.userId})</TableCell>
                <TableCell>
                  {order.products[0].name}
                  {order.products.length > 1 && ` 외 ${order.products.length - 1}건`}
                </TableCell>
                <TableCell>{order.totalAmount.toLocaleString()}원</TableCell>
                <TableCell>
                  <Chip 
                    label={order.status} 
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    style={{ marginRight: '4px', marginBottom: '4px' }}
                    onClick={() => handleDetailOpen(order)}
                  >
                    상세
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    color="primary"
                    style={{ marginRight: '4px', marginBottom: '4px' }}
                    onClick={() => handleStatusOpen(order)}
                  >
                    상태변경
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    color="error"
                    onClick={() => handleDelete(order.id)}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 주문 상세 정보 다이얼로그 */}
      <Dialog open={detailOpen} onClose={() => setDetailOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>주문 상세 정보</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Grid container spacing={2} style={{ marginTop: '8px' }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="주문번호"
                  value={selectedOrder.id}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="주문일시"
                  value={selectedOrder.orderDate}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="주문자 ID"
                  value={selectedOrder.userId}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="주문자명"
                  value={selectedOrder.userName}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>상품명</TableCell>
                        <TableCell align="right">수량</TableCell>
                        <TableCell align="right">가격</TableCell>
                        <TableCell align="right">소계</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedOrder.products.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell align="right">{product.quantity}</TableCell>
                          <TableCell align="right">{product.price.toLocaleString()}원</TableCell>
                          <TableCell align="right">
                            {(product.quantity * product.price).toLocaleString()}원
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="총 결제금액"
                  value={`${selectedOrder.totalAmount.toLocaleString()}원`}
                  disabled
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>

      {/* 주문 상태 변경 다이얼로그 */}
      <Dialog open={statusOpen} onClose={() => setStatusOpen(false)}>
        <DialogTitle>주문 상태 변경</DialogTitle>
        <DialogContent>
          <FormControl fullWidth style={{ marginTop: '16px' }}>
            <InputLabel>주문 상태</InputLabel>
            <Select
              value={newStatus}
              label="주문 상태"
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <MenuItem value="결제완료">결제완료</MenuItem>
              <MenuItem value="배송준비">배송준비</MenuItem>
              <MenuItem value="배송중">배송중</MenuItem>
              <MenuItem value="배송완료">배송완료</MenuItem>
              <MenuItem value="취소">취소</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusOpen(false)}>취소</Button>
          <Button onClick={handleStatusChange} variant="contained" color="primary">
            변경
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OrderManagement;
