import { Link } from 'react-router-dom';

function Sidebar() {
  const menuItems = [
    {
      title: '회원관리',
      subItems: [
        { name: '사용자관리', path: '/admin/members/users' },
        { name: '판매자관리', path: '/admin/members/sellers' }
      ]
    },
    {
      title: '고객센터',
      subItems: [
        { name: 'FAQ관리', path: '/admin/customer/faq' },
        { name: '공지사항관리', path: '/admin/customer/notice' },
        { name: '1:1문의', path: '/admin/customer/inquiry' },
        { name: '채팅상담', path: '/admin/customer/chat' }
      ]
    },
    {
      title: '재고관리',
      subItems: [
        { name: '상품관리', path: '/admin/inventory' }
      ]
    },
    {
      title: '주문관리',
      subItems: [
        { name: '주문조회', path: '/admin/orders' }
      ]
    },
    {
      title: '마케팅',
      subItems: [
        { name: '배너관리', path: '/admin/marketing/banners' },
        { name: '쿠폰관리', path: '/admin/marketing/coupons' },
        { name: '광고관리', path: '/admin/marketing/advertisements' }
      ]
    }
  ];

  return (
    <nav style={{
      position: 'fixed',
      left: 0,
      top: '64px',
      bottom: 0,
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      {menuItems.map((item, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>{item.title}</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {item.subItems.map((subItem, subIndex) => (
              <li key={subIndex} style={{ marginBottom: '8px' }}>
                <Link 
                  to={subItem.path}
                  style={{ 
                    textDecoration: 'none',
                    color: '#333',
                    display: 'block',
                    padding: '8px',
                    borderRadius: '4px',
                    ':hover': {
                      backgroundColor: '#e0e0e0'
                    }
                  }}
                >
                  {subItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default Sidebar;
