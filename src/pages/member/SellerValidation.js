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
  Chip
} from '@mui/material';

function SellerValidation() {
  const [validationRequests, setValidationRequests] = useState([
    {
      id: 1,
      sellerName: '판매자1',
      businessNo: '123-45-67890',
      documentUrl: 'http://example.com/doc1',
      requestDate: '2024-01-15',
      status: 'PENDING'
    },
    {
      id: 2,
      sellerName: '판매자2',
      businessNo: '234-56-78901',
      documentUrl: 'http://example.com/doc2',
      requestDate: '2024-01-16',
      status: 'PENDING'
    }
  ]);

  const handleValidation = (id, status) => {
    setValidationRequests(prev => 
      prev.map(req => 
        req.id === id ? { ...req, status } : req
      )
    );
  };

  return (
    <div>
      <h2>판매자 유효성 검사</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>판매자명</TableCell>
              <TableCell>사업자번호</TableCell>
              <TableCell>신청일</TableCell>
              <TableCell>서류확인</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {validationRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.sellerName}</TableCell>
                <TableCell>{request.businessNo}</TableCell>
                <TableCell>{request.requestDate}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => window.open(request.documentUrl)}
                  >
                    서류보기
                  </Button>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={request.status} 
                    color={request.status === 'APPROVED' ? 'success' : 
                           request.status === 'REJECTED' ? 'error' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  {request.status === 'PENDING' && (
                    <>
                      <Button 
                        variant="contained" 
                        color="success" 
                        size="small"
                        onClick={() => handleValidation(request.id, 'APPROVED')}
                        style={{ marginRight: '8px' }}
                      >
                        승인
                      </Button>
                      <Button 
                        variant="contained" 
                        color="error" 
                        size="small"
                        onClick={() => handleValidation(request.id, 'REJECTED')}
                      >
                        거부
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SellerValidation;
