import AppProvider from '@/components/AppProvider';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Outlet } from '@umijs/max';

const PublicLayout = () => {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
};

export default PublicLayout;
