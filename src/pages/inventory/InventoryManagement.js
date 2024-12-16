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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid
} from '@mui/material';

function InventoryManagement() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: '기본 티셔츠',
      category: '의류',
      price: 29000,
      stock: 100,
      status: '판매중'
    },
    {
      id: 2,
      name: '청바지',
      category: '의류',
      price: 59000,
      stock: 50,
      status: '품절'
    }
  ]);

  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: '판매중'
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      status: '판매중'
    });
  };

  const handleAdd = () => {
    setProducts([
      ...products,
      {
        id: products.length + 1,
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock)
      }
    ]);
    handleClose();
  };

  const handleDelete = (id) => {
    if(window.confirm('정말 삭제하시겠습니까?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>상품 관리</h2>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          상품 등록
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>상품명</TableCell>
              <TableCell>카테고리</TableCell>
              <TableCell>가격</TableCell>
              <TableCell>재고</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price.toLocaleString()}원</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    style={{ marginRight: '8px' }}
                  >
                    수정
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    size="small"
                    onClick={() => handleDelete(product.id)}
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
        <DialogTitle>상품 등록</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: '8px' }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="상품명"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>카테고리</InputLabel>
                <Select
                  value={newProduct.category}
                  label="카테고리"
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                >
                  <MenuItem value="의류">의류</MenuItem>
                  <MenuItem value="신발">신발</MenuItem>
                  <MenuItem value="액세서리">액세서리</MenuItem>
                  <MenuItem value="전자기기">전자기기</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="가격"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="재고"
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>상태</InputLabel>
                <Select
                  value={newProduct.status}
                  label="상태"
                  onChange={(e) => setNewProduct({...newProduct, status: e.target.value})}
                >
                  <MenuItem value="판매중">판매중</MenuItem>
                  <MenuItem value="품절">품절</MenuItem>
                  <MenuItem value="판매중지">판매중지</MenuItem>
                </Select>
              </FormControl>
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

export default InventoryManagement;
