import ModalWrapper from '@/components/ModalWrapper';
import { useIntl } from '@umijs/max';
import React from 'react';
import styleLess from './index.less';
import { Typography, Image } from 'antd';
import LoadingIcon from '@/resources/images/loading.gif';

type AuthorizeModalProps = {
  visible: boolean;
  onClose?: () => void;
  title?: string;
};
const { Paragraph } = Typography;
const AuthorizeTModal = ({ visible, onClose, title, ...props }: AuthorizeModalProps) => {
  const intl = useIntl();

  return (
    <ModalWrapper open={visible} showCloseIcon={false} width={450} onClose={onClose} {...props}>
      <div className={styleLess.authorize_modal}>
        <div className={styleLess.authorize_modal__title}>{title}</div>

        <Paragraph className={styleLess.authorize_modal__subtitle}>
          {intl.formatMessage({
            id: 'common.text.authorizing.account.sub.title',
          })}
        </Paragraph>
        <div className={styleLess.authorize_modal__loading}>
          <Image
            className={styleLess.authorize_modal__loading__icon}
            preview={false}
            height={150}
            width={150}
            src={LoadingIcon}
            alt="loading"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AuthorizeTModal;
