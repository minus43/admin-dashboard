import { useState } from 'react';
import { 
  Grid, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  TextField, 
  Button, 
  Typography,
  Divider,
  Box
} from '@mui/material';

function ChatSupport() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [chatUsers, setChatUsers] = useState([
    { 
      id: 1, 
      name: '홍길동', 
      lastMessage: '상품 관련 문의드립니다.',
      unread: 2,
      status: '대기중'
    },
    { 
      id: 2, 
      name: '김철수', 
      lastMessage: '네, 알겠습니다. 감사합니다.',
      unread: 0,
      status: '상담중'
    }
  ]);

  const [chats, setChats] = useState({
    1: [
      { id: 1, sender: 'user', message: '상품 관련 문의드립니다.', time: '14:22' },
      { id: 2, sender: 'user', message: '재고 확인 부탁드립니다.', time: '14:23' }
    ],
    2: [
      { id: 1, sender: 'user', message: '환불 관련 문의입니다.', time: '14:00' },
      { id: 2, sender: 'admin', message: '네, 어떤 상품 환불 원하시나요?', time: '14:05' },
      { id: 3, sender: 'user', message: '네, 알겠습니다. 감사합니다.', time: '14:10' }
    ]
  });

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // 읽음 처리
    setChatUsers(chatUsers.map(u => 
      u.id === user.id ? { ...u, unread: 0 } : u
    ));
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedUser) return;

    const newMessage = {
      id: chats[selectedUser.id].length + 1,
      sender: 'admin',
      message: message,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setChats({
      ...chats,
      [selectedUser.id]: [...chats[selectedUser.id], newMessage]
    });

    setMessage('');
  };

  return (
    <div>
      <h2>채팅 상담</h2>
      <Grid container spacing={2} style={{ height: 'calc(100vh - 200px)' }}>
        {/* 사용자 목록 */}
        <Grid item xs={3}>
          <Paper style={{ height: '100%', overflow: 'auto' }}>
            <List>
              {chatUsers.map((user) => (
                <ListItem 
                  key={user.id}
                  button
                  selected={selectedUser?.id === user.id}
                  onClick={() => handleUserSelect(user)}
                >
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between">
                        <Typography>{user.name}</Typography>
                        {user.unread > 0 && (
                          <Typography color="error" variant="caption">
                            {user.unread}
                          </Typography>
                        )}
                      </Box>
                    }
                    secondary={user.lastMessage}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* 채팅 영역 */}
        <Grid item xs={9}>
          <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedUser ? (
              <>
                {/* 채팅 헤더 */}
                <Box p={2} bgcolor="#f5f5f5">
                  <Typography variant="h6">{selectedUser.name}</Typography>
                </Box>
                <Divider />

                {/* 채팅 내용 */}
                <Box p={2} flex={1} overflow="auto">
                  {chats[selectedUser.id].map((chat) => (
                    <Box
                      key={chat.id}
                      display="flex"
                      justifyContent={chat.sender === 'admin' ? 'flex-end' : 'flex-start'}
                      mb={1}
                    >
                      <Paper
                        style={{
                          padding: '8px 16px',
                          backgroundColor: chat.sender === 'admin' ? '#e3f2fd' : '#f5f5f5',
                          maxWidth: '70%'
                        }}
                      >
                        <Typography>{chat.message}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {chat.time}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}
                </Box>

                {/* 메시지 입력 */}
                <Box p={2} bgcolor="#f5f5f5">
                  <Grid container spacing={1}>
                    <Grid item xs={10}>
                      <TextField
                        fullWidth
                        size="small"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSendMessage}
                      >
                        전송
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </>
            ) : (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                <Typography color="textSecondary">
                  채팅할 사용자를 선택해주세요.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ChatSupport;
