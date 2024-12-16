import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // API 호출 대신 임시 데이터
    setUsers([
      { id: 1, name: '홍길동', email: 'hong@example.com', status: '활성' },
      { id: 2, name: '김철수', email: 'kim@example.com', status: '비활성' },
    ]);
  }, []);

  return (
    <div>
      <h2>사용자 관리</h2>
      <Button variant="contained" color="primary">
        신규 사용자 등록
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small">상세</Button>
                  <Button variant="outlined" color="error" size="small">삭제</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserManagement;
