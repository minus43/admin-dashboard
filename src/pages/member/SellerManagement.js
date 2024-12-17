import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

function SellerManagement() {
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    // API 호출 대신 임시 데이터
    setSellers([
      { id: 1, name: '판매자1', businessNo: '123-45-67890', status: '승인대기' },
      { id: 2, name: '판매자2', businessNo: '234-56-78901', status: '승인완료' },
    ]);
  }, []);

  const handleDetailClick = (sellerId) => {
    navigate(`/admin/members/sellers/${sellerId}`);
  };

  const handleDelete = (sellerId) => {
    // 삭제 확인 후 처리
    if (window.confirm('정말로 이 판매자를 삭제하시겠습니까?')) {
      setSellers(prev => prev.filter(seller => seller.id !== sellerId));
    }
  };

  return (
    <div>
      <h2>판매자 관리</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>판매자명</TableCell>
              <TableCell>사업자번호</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellers.map((seller) => (
              <TableRow key={seller.id}>
                <TableCell>{seller.id}</TableCell>
                <TableCell>{seller.name}</TableCell>
                <TableCell>{seller.businessNo}</TableCell>
                <TableCell>{seller.status}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={() => handleDetailClick(seller.id)}
                    sx={{ mr: 1 }}
                  >
                    상세
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    size="small"
                    onClick={() => handleDelete(seller.id)}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SellerManagement;
