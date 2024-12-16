import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import AdminLoginPage from './pages/auth/AdminLoginPage';
import Dashboard from './pages/dashboard/Dashboard';

// 회원관리
import UserManagement from './pages/member/UserManagement';
import UserDetail from './pages/member/UserDetail';
import SellerManagement from './pages/member/SellerManagement';
import SellerValidation from './pages/member/SellerValidation';
import SellerDetail from './pages/member/SellerDetail';

// 고객센터
import FaqManagement from './pages/customer/FaqManagement';
import NoticeManagement from './pages/customer/NoticeManagement';
import Inquiry from './pages/customer/Inquiry';
import ChatSupport from './pages/customer/ChatSupport';

// 재고관리
import InventoryManagement from './pages/inventory/InventoryManagement';

// 주문관리
import OrderManagement from './pages/order/OrderManagement';

// 마케팅
import BannerManagement from './pages/marketing/BannerManagement';
import CouponManagement from './pages/marketing/CouponManagement';
import AdvertisementManagement from './pages/marketing/AdvertisementManagement';

function App() {
  return (
    <Router>
      <Routes>
        {/* 기본 경로를 로그인 페이지로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* 로그인 페이지 */}
        <Route path="/login" element={<AdminLoginPage />} />

        {/* 관리자 레이아웃과 하위 라우트들 */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* /admin으로 접근시 대시보드로 리다이렉트 */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* 회원관리 */}
          <Route path="members">
            <Route index element={<Navigate to="users" replace />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="sellers" element={<SellerManagement />} />
            <Route path="sellers/validation" element={<SellerValidation />} />
            <Route path="sellers/:id" element={<SellerDetail />} />
          </Route>

          {/* 고객센터 */}
          <Route path="customer">
            <Route index element={<Navigate to="faq" replace />} />
            <Route path="faq" element={<FaqManagement />} />
            <Route path="notice" element={<NoticeManagement />} />
            <Route path="inquiry" element={<Inquiry />} />
            <Route path="chat" element={<ChatSupport />} />
          </Route>

          {/* 재고관리 */}
          <Route path="inventory" element={<InventoryManagement />} />

          {/* 주문관리 */}
          <Route path="orders" element={<OrderManagement />} />

          {/* 마케팅 */}
          <Route path="marketing">
            <Route index element={<Navigate to="banners" replace />} />
            <Route path="banners" element={<BannerManagement />} />
            <Route path="coupons" element={<CouponManagement />} />
            <Route path="advertisements" element={<AdvertisementManagement />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
