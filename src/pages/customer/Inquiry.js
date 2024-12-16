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
  TextField
} from '@mui/material';

function Inquiry() {
  const [inquiries, setInquiries] = useState([
    { 
      id: 1, 
      userId: 'user123',
      type: '상품문의',
      title: '상품 배송 관련 문의',
      status: '답변대기',
      createdAt: '2024-01-15',
      content: '주문한 상품이 언제 배송되나요?',
      answer: ''
    },
    { 
      id: 2, 
      userId: 'user456',
      type: '결제문의',
      title: '환불 처리 문의',
      status: '답변완료',
      createdAt: '2024-01-14',
      content: '환불은 얼마나 걸리나요?',
      answer: '환불은 3-5일 정도 소요됩니다.'
    }
  ]);

  const [open, setOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [answer, setAnswer] = useState('');

  const handleOpen = (inquiry) => {
    setSelectedInquiry(inquiry);
    setAnswer(inquiry.answer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInquiry(null);
    setAnswer('');
  };

  const handleAnswer = () => {
    setInquiries(inquiries.map(inq => 
      inq.id === selectedInquiry.id 
        ? { ...inq, answer, status: '답변완료' } 
        : inq
    ));
    handleClose();
  };

  return (
    <div>
      <h2>1:1 문의 관리</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>문의유형</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>작성자</TableCell>
              <TableCell>작성일</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell>{inquiry.id}</TableCell>
                <TableCell>{inquiry.type}</TableCell>
                <TableCell>{inquiry.title}</TableCell>
                <TableCell>{inquiry.userId}</TableCell>
                <TableCell>{inquiry.createdAt}</TableCell>
                <TableCell>
                  <Chip 
                    label={inquiry.status}
                    color={inquiry.status === '답변대기' ? 'warning' : 'success'}
                  />
                </TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    size="small"
                    onClick={() => handleOpen(inquiry)}
                  >
                    {inquiry.status === '답변대기' ? '답변하기' : '답변수정'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>문의 답변</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="문의내용"
            fullWidth
            multiline
            rows={4}
            value={selectedInquiry?.content || ''}
            disabled
          />
          <TextField
            margin="dense"
            label="답변내용"
            fullWidth
            multiline
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleAnswer} variant="contained" color="primary">
            답변등록
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Inquiry;
