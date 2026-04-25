import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';
import style from './index.less';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      className={style.container}
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: intl.formatMessage({ id: 'app.name' }),
          title: intl.formatMessage({ id: 'app.name' }),
          href: '',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
