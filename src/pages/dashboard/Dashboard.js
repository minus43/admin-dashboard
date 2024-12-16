import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

function Dashboard() {
  // 임시 대시보드 데이터
  const mockDashboardData = {
    totalUsers: 1234,
    todayOrders: 56,
    newInquiries: 12,
    activePromotions: 5,
    recentUsers: [
      { id: 1, name: '김철수', email: 'kim@example.com', joinDate: '2024-01-15' },
      { id: 2, name: '이영희', email: 'lee@example.com', joinDate: '2024-01-14' },
      { id: 3, name: '박지민', email: 'park@example.com', joinDate: '2024-01-13' }
    ],
    recentOrders: [
      { id: 'ORD001', customer: '김철수', amount: 35000, status: '배송중' },
      { id: 'ORD002', customer: '이영희', amount: 67000, status: '결제완료' },
      { id: 'ORD003', customer: '박지민', amount: 128000, status: '배송준비중' }
    ]
  };

  const [stats, setStats] = useState(mockDashboardData);

  useEffect(() => {
    // 5초마다 실시간 접속자 수 업데이트
    const interval = setInterval(() => {
      const currentVisitors = Math.floor(Math.random() * 100) + 50; // 50~150 사이 랜덤값
      setStats(prev => ({ ...prev, currentVisitors }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        대시보드
      </Typography>

      {/* 통계 카드 */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">전체 회원수</Typography>
            <Typography variant="h4">{stats.totalUsers.toLocaleString()}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">오늘의 주문</Typography>
            <Typography variant="h4">{stats.todayOrders.toLocaleString()}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">신규 문의</Typography>
            <Typography variant="h4">{stats.newInquiries.toLocaleString()}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">활성 프로모션</Typography>
            <Typography variant="h4">{stats.activePromotions.toLocaleString()}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 최근 데이터 테이블 */}
      <Grid container spacing={3}>
        {/* 최근 가입 회원 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>최근 가입 회원</Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '8px', textAlign: 'left' }}>이름</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>이메일</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>가입일</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentUsers.map(user => (
                    <tr key={user.id}>
                      <td style={{ padding: '8px' }}>{user.name}</td>
                      <td style={{ padding: '8px' }}>{user.email}</td>
                      <td style={{ padding: '8px' }}>{user.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Paper>
        </Grid>

        {/* 최근 주문 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>최근 주문</Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '8px', textAlign: 'left' }}>주문번호</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>고객명</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>금액</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map(order => (
                    <tr key={order.id}>
                      <td style={{ padding: '8px' }}>{order.id}</td>
                      <td style={{ padding: '8px' }}>{order.customer}</td>
                      <td style={{ padding: '8px' }}>{order.amount.toLocaleString()}원</td>
                      <td style={{ padding: '8px' }}>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
