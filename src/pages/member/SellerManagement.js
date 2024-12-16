import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

function SellerManagement() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    // API 호출 대신 임시 데이터
    setSellers([
      { id: 1, name: '판매자1', businessNo: '123-45-67890', status: '승인대기' },
      { id: 2, name: '판매자2', businessNo: '234-56-78901', status: '승인완료' },
    ]);
  }, []);

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
                  <Button variant="outlined" size="small">상세</Button>
                  <Button variant="outlined" color="success" size="small">승인</Button>
                  <Button variant="outlined" color="error" size="small">거부</Button>
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
