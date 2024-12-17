import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Divider } from '@mui/material';
import {
  Store as StoreIcon,
  QuestionAnswer as QuestionIcon,
  Chat as ChatIcon,
  LocalShipping as ShippingIcon,
  Campaign as CampaignIcon
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    visitors: {
      lastMinute: 0,
      lastHour: 0,
      today: 0,
      lastWeek: 0,
      lastMonth: 0,
      lastQuarter: 0,
      lastYear: 0
    },
    pendingSellers: 0,
    inquiries: 0,
    chatSupports: 0,
    pendingOrders: 0,
    activePromotions: {
      total: 0,
      banners: 0,
      coupons: 0,
      advertisements: 0
    }
  });

  // 차트 데이터를 위한 상태 추가
  const [chartData, setChartData] = useState({
    hourly: [],
    daily: [],
    weekly: [],
    monthly: []
  });

  useEffect(() => {
    // 임시 차트 데이터 생성
    const generateChartData = () => {
      const hourlyData = Array.from({ length: 24 }, (_, i) => ({
        time: `${i}시`,
        value: Math.floor(Math.random() * 500) + 100
      }));

      const dailyData = Array.from({ length: 7 }, (_, i) => ({
        time: ['일', '월', '화', '수', '목', '금', '토'][i],
        value: Math.floor(Math.random() * 2000) + 500
      }));

      const weeklyData = Array.from({ length: 4 }, (_, i) => ({
        time: `${i + 1}주차`,
        value: Math.floor(Math.random() * 5000) + 1000
      }));

      const monthlyData = Array.from({ length: 12 }, (_, i) => ({
        time: `${i + 1}월`,
        value: Math.floor(Math.random() * 10000) + 5000
      }));

      setChartData({
        hourly: hourlyData,
        daily: dailyData,
        weekly: weeklyData,
        monthly: monthlyData
      });
    };

    generateChartData();

    // API 호출 대신 임시 데이터
    setStats({
      visitors: {
        lastMinute: 42,
        lastHour: 156,
        today: 1234,
        lastWeek: 8765,
        lastMonth: 34567,
        lastQuarter: 98765,
        lastYear: 234567
      },
      pendingSellers: 5,
      inquiries: 12,
      chatSupports: 8,
      pendingOrders: 45,
      activePromotions: {
        total: 15,
        banners: 5,
        coupons: 7,
        advertisements: 3
      }
    });

    // 1분마다 실시간 접속자 수 업데이트
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        visitors: {
          ...prev.visitors,
          lastMinute: Math.floor(Math.random() * 50) + 30
        }
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // 차트 옵션
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // 차트 컴포넌트
  const VisitorChart = ({ data, title, height = '300px' }) => {
    const chartData = {
      labels: data.map(item => item.time),
      datasets: [
        {
          label: '접속자 수',
          data: data.map(item => item.value),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };

    return (
      <Box sx={{ height, p: 2 }}>
        <Line options={chartOptions} data={chartData} />
      </Box>
    );
  };

  const StatCard = ({ title, value, icon: Icon, color = 'primary', onClick }) => (
    <Paper 
      sx={{ 
        p: 3, 
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease'
        } : {}
      }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon sx={{ color: `${color}.main`, mr: 1 }} />
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4">
        {value.toLocaleString()}
      </Typography>
    </Paper>
  );

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        대시보드
      </Typography>

      <Typography variant="h6" mb={2}>
        실시간 접속 회원 수
      </Typography>

      {/* 차트 그리드 */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h6" p={2}>시간별 접속자</Typography>
            <VisitorChart data={chartData.hourly} title="시간별 접속자" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h6" p={2}>요일별 접속자</Typography>
            <VisitorChart data={chartData.daily} title="요일별 접속자" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h6" p={2}>주간 접속자</Typography>
            <VisitorChart data={chartData.weekly} title="주간 접속자" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h6" p={2}>월간 접속자</Typography>
            <VisitorChart data={chartData.monthly} title="월간 접속자" />
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" mb={2}>
        처리 대기 현황
      </Typography>
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard 
            title="승인 대기 판매자" 
            value={stats.pendingSellers} 
            icon={StoreIcon}
            color="warning"
            onClick={() => navigate('/admin/members/sellers')}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard 
            title="미답변 1:1 문의" 
            value={stats.inquiries} 
            icon={QuestionIcon}
            color="error"
            onClick={() => navigate('/admin/customer/inquiry')}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard 
            title="대기 중인 채팅" 
            value={stats.chatSupports} 
            icon={ChatIcon}
            color="info"
            onClick={() => navigate('/admin/customer/chat')}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard 
            title="배송 중인 주문" 
            value={stats.pendingOrders} 
            icon={ShippingIcon}
            color="secondary"
            onClick={() => navigate('/admin/orders')}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" mb={2}>
        활성 프로모션 현황
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard 
            title="전체 프로모션" 
            value={stats.activePromotions.total} 
            icon={CampaignIcon}
            onClick={() => navigate('/admin/marketing/banners')}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard 
            title="활성 배너" 
            value={stats.activePromotions.banners} 
            icon={CampaignIcon}
            onClick={() => navigate('/admin/marketing/banners')}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard 
            title="활성 쿠폰" 
            value={stats.activePromotions.coupons} 
            icon={CampaignIcon}
            onClick={() => navigate('/admin/marketing/coupons')}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard 
            title="활성 광고" 
            value={stats.activePromotions.advertisements} 
            icon={CampaignIcon}
            onClick={() => navigate('/admin/marketing/advertisements')}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
