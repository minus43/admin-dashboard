// src/pages/customer/FaqManagement.js
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
  InputLabel
} from '@mui/material';

function FaqManagement() {
  const [faqs, setFaqs] = useState([
    { id: 1, category: '배송', question: '배송은 얼마나 걸리나요?', answer: '일반적으로 2-3일 소요됩니다.', status: '게시중' },
    { id: 2, category: '결제', question: '결제 방법은 어떤 것이 있나요?', answer: '신용카드, 계좌이체...', status: '게시중' },
  ]);

  const [open, setOpen] = useState(false);
  const [newFaq, setNewFaq] = useState({
    category: '',
    question: '',
    answer: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAdd = () => {
    setFaqs([...faqs, { 
      id: faqs.length + 1, 
      ...newFaq, 
      status: '게시중' 
    }]);
    handleClose();
    setNewFaq({ category: '', question: '', answer: '' });
  };

  const handleDelete = (id) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>FAQ 관리</h2>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          FAQ 등록
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>카테고리</TableCell>
              <TableCell>질문</TableCell>
              <TableCell>답변</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faqs.map((faq) => (
              <TableRow key={faq.id}>
                <TableCell>{faq.id}</TableCell>
                <TableCell>{faq.category}</TableCell>
                <TableCell>{faq.question}</TableCell>
                <TableCell>{faq.answer}</TableCell>
                <TableCell>{faq.status}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" style={{ marginRight: '8px' }}>
                    수정
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    size="small"
                    onClick={() => handleDelete(faq.id)}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>FAQ 등록</DialogTitle>
        <DialogContent>
          <FormControl fullWidth style={{ marginTop: '20px' }}>
            <InputLabel>카테고리</InputLabel>
            <Select
              value={newFaq.category}
              onChange={(e) => setNewFaq({...newFaq, category: e.target.value})}
            >
              <MenuItem value="배송">배송</MenuItem>
              <MenuItem value="결제">결제</MenuItem>
              <MenuItem value="회원">회원</MenuItem>
              <MenuItem value="기타">기타</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="질문"
            fullWidth
            value={newFaq.question}
            onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
          />
          <TextField
            margin="dense"
            label="답변"
            fullWidth
            multiline
            rows={4}
            value={newFaq.answer}
            onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
          />
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

export default FaqManagement;