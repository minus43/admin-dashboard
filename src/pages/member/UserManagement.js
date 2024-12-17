import { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  Collapse,
  Box,
  Grid,
  TextField,
  IconButton
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    // API 호출 대신 임시 데이터
    setUsers([
      { 
        id: 1, 
        name: '홍길동', 
        email: 'hong@example.com', 
        status: '활성',
        phone: '010-1234-5678',
        address: '서울시 강남구',
        joinDate: '2023-01-01'
      },
      { 
        id: 2, 
        name: '김철수', 
        email: 'kim@example.com', 
        status: '비활성',
        phone: '010-5678-1234',
        address: '서울시 서초구',
        joinDate: '2023-02-01'
      },
    ]);
  }, []);

  const handleExpandClick = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  const handleStatusToggle = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === '활성' ? '비활성' : '활성';
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  return (
    <div>
      <h2>사용자 관리</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="50px" /> {/* 확장 버튼을 위한 열 */}
              <TableCell>ID</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <>
                <TableRow key={user.id}>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleExpandClick(user.id)}
                    >
                      {expandedUser === user.id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      color={user.status === '활성' ? "error" : "primary"}
                      size="small"
                      onClick={() => handleStatusToggle(user.id)}
                    >
                      {user.status === '활성' ? '비활성화' : '활성화'}
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expandedUser === user.id} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 2 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="이름"
                              value={user.name}
                              disabled
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="이메일"
                              value={user.email}
                              disabled
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="전화번호"
                              value={user.phone}
                              disabled
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="가입일"
                              value={user.joinDate}
                              disabled
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="주소"
                              value={user.address}
                              disabled
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserManagement;
