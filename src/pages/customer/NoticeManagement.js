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
  FormControlLabel
} from '@mui/material';

function NoticeManagement() {
  const [notices, setNotices] = useState([
    { 
      id: 1, 
      title: '서비스 점검 안내', 
      content: '2024년 1월 20일 새벽 2시부터 4시까지...', 
      important: true,
      createdAt: '2024-01-15',
      status: '게시중'
    },
    { 
      id: 2, 
      title: '개인정보처리방침 개정 안내', 
      content: '개인정보처리방침이 다음과 같이 변경됩니다...', 
      important: false,
      createdAt: '2024-01-14',
      status: '게시중'
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    important: false
  });

  const handleOpen = (notice = null) => {
    if (notice) {
      setEditMode(true);
      setSelectedNotice(notice);
      setNewNotice({
        title: notice.title,
        content: notice.content,
        important: notice.important
      });
    } else {
      setEditMode(false);
      setSelectedNotice(null);
      setNewNotice({ title: '', content: '', important: false });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setSelectedNotice(null);
    setNewNotice({ title: '', content: '', important: false });
  };

  const handleSave = () => {
    if (editMode) {
      // 수정 로직
      setNotices(notices.map(notice => 
        notice.id === selectedNotice.id 
          ? { 
              ...notice, 
              ...newNotice,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : notice
      ));
    } else {
      // 추가 로직
      setNotices([...notices, { 
        id: notices.length + 1, 
        ...newNotice, 
        createdAt: new Date().toISOString().split('T')[0],
        status: '게시중'
      }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setNotices(notices.filter(notice => notice.id !== id));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>공지사항 관리</h2>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          공지사항 등록
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>중요공지</TableCell>
              <TableCell>등록일</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notices.map((notice) => (
              <TableRow key={notice.id}>
                <TableCell>{notice.id}</TableCell>
                <TableCell>{notice.title}</TableCell>
                <TableCell>{notice.important ? '⭐' : '-'}</TableCell>
                <TableCell>{notice.createdAt}</TableCell>
                <TableCell>{notice.status}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    style={{ marginRight: '8px' }}
                    onClick={() => handleOpen(notice)}
                  >
                    수정
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    size="small"
                    onClick={() => handleDelete(notice.id)}
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
        <DialogTitle>{editMode ? '공지사항 수정' : '공지사항 등록'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="제목"
            fullWidth
            value={newNotice.title}
            onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
          />
          <TextField
            margin="dense"
            label="내용"
            fullWidth
            multiline
            rows={6}
            value={newNotice.content}
            onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
          />
          <FormControlLabel
            control={
              <Switch
                checked={newNotice.important}
                onChange={(e) => setNewNotice({...newNotice, important: e.target.checked})}
              />
            }
            label="중요공지"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editMode ? '수정' : '등록'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NoticeManagement;
