import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Store as StoreIcon,
  QuestionAnswer as QuestionIcon,
  Chat as ChatIcon,
  LocalShipping as ShippingIcon,
  Campaign as CampaignIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // 년도와 월 선택을 위한 state
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // 기본 통계 데이터
  const stats = {
    pendingSellers: 5,
    inquiries: 12,
    chatSupports: 8,
    pendingOrders: 45,
    activePromotions: {
      total: 15,
      banners: 5,
      coupons: 7,
      advertisements: 3,
    },
  };

  // 선택된 기간에 따른 데이터 생성 (실제로는 API 호출)
  const getStatsForPeriod = (year, month) => ({
    sales: {
      total: Math.floor(Math.random() * 100000000) + 10000000,
      compared: Math.floor(Math.random() * 20) - 10,
    },
    visitors: {
      total: Math.floor(Math.random() * 100000) + 10000,
      compared: Math.floor(Math.random() * 20) - 10,
    },
  });

  // 선택된 기간의 통계
  const periodStats = getStatsForPeriod(selectedYear, selectedMonth);

  // StatCard 컴포넌트
  const StatCard = ({
    title,
    value,
    icon: Icon,
    color = 'primary',
    onClick,
  }) => (
    <Paper
      sx={{
        p: 3,
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick
          ? {
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              transform: 'translateY(-2px)',
              transition: 'all 0.3s ease',
            }
          : {},
      }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon sx={{ color: `${color}.main`, mr: 1 }} />
        <Typography variant='h6' color='text.secondary'>
          {title}
        </Typography>
      </Box>
      <Typography variant='h4'>{value.toLocaleString()}</Typography>
    </Paper>
  );

  return (
    <Box>
      <Typography variant='h4' mb={4}>
        대시보드
      </Typography>

      {/* 매출 및 방문자 현황 */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant='h6'>매출 및 방문자 현황</Typography>

          {/* 기간 선택 필터 */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size='small' sx={{ minWidth: 100 }}>
              <InputLabel>년도</InputLabel>
              <Select
                value={selectedYear}
                label='년도'
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {Array.from({ length: 5 }, (_, i) => currentYear - i).map(
                  (year) => (
                    <MenuItem key={year} value={year}>
                      {year}년
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>

            <FormControl size='small' sx={{ minWidth: 100 }}>
              <InputLabel>월</InputLabel>
              <Select
                value={selectedMonth}
                label='월'
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}월
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* 매출 현황 */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant='subtitle2' color='text.secondary'>
                매출
              </Typography>
              <Typography variant='h3' sx={{ my: 2 }}>
                {periodStats.sales.total.toLocaleString()}원
              </Typography>
              <Typography
                variant='body1'
                color={
                  periodStats.sales.compared > 0 ? 'success.main' : 'error.main'
                }
                sx={{ mb: 2 }}
              >
                전월 대비 {periodStats.sales.compared > 0 ? '+' : ''}
                {periodStats.sales.compared}%
              </Typography>
            </Paper>
          </Grid>

          {/* 방문자 현황 */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant='subtitle2' color='text.secondary'>
                방문자
              </Typography>
              <Typography variant='h3' sx={{ my: 2 }}>
                {periodStats.visitors.total.toLocaleString()}명
              </Typography>
              <Typography
                variant='body1'
                color={
                  periodStats.visitors.compared > 0
                    ? 'success.main'
                    : 'error.main'
                }
                sx={{ mb: 2 }}
              >
                전월 대비 {periodStats.visitors.compared > 0 ? '+' : ''}
                {periodStats.visitors.compared}%
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* 처리 대기 현황 */}
      <Typography variant='h6' mb={2}>
        처리 대기 현황
      </Typography>
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title='승인 대기 판매자'
            value={stats.pendingSellers}
            icon={StoreIcon}
            color='warning'
            onClick={() => navigate('/admin/members/sellers')}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title='미답변 1:1 문의'
            value={stats.inquiries}
            icon={QuestionIcon}
            color='error'
            onClick={() => navigate('/admin/customer/inquiry')}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title='대기 중인 채팅'
            value={stats.chatSupports}
            icon={ChatIcon}
            color='info'
            onClick={() => navigate('/admin/customer/chat')}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title='배송 중인 주문'
            value={stats.pendingOrders}
            icon={ShippingIcon}
            color='secondary'
            onClick={() => navigate('/admin/orders')}
          />
        </Grid>
      </Grid>

      {/* 프로모션 현황 */}
      <Typography variant='h6' mb={2}>
        활성 프로모션 현황
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title='전체 프로모션'
            value={stats.activePromotions.total}
            icon={CampaignIcon}
            onClick={() => navigate('/admin/marketing/banners')}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title='활성 배너'
            value={stats.activePromotions.banners}
            icon={CampaignIcon}
            onClick={() => navigate('/admin/marketing/banners')}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title='활성 쿠폰'
            value={stats.activePromotions.coupons}
            icon={CampaignIcon}
            onClick={() => navigate('/admin/marketing/coupons')}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title='활성 광고'
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
