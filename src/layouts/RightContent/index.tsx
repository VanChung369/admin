import { SelectLang as UmiSelectLang } from '@umijs/max';
import NoticeIconView from '../NoticeIcon';

export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  return (
    <UmiSelectLang
      style={{
        color: 'rgba(255, 255, 255, 0.85)',
        padding: 4,
      }}
    />
  );
};

export const Question = () => {
  return <NoticeIconView />;
};
