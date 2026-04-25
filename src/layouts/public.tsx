import AppProvider from '@/components/AppProvider';
import { Outlet } from '@umijs/max';

const PublicLayout = () => {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
};

export default PublicLayout;
