import React, { Fragment } from 'react';
import { Modal, Typography } from 'antd';
import { ModalWrapperProps } from './typing';
import { CloseCircleOutlined } from '@ant-design/icons';
import styleLess from './index.less';
const { Title } = Typography;

const ModalWrapper = ({
  children,
  title,
  onClose,
  showCloseIcon = true,
  width,
  destroyOnClose = true,
  maskClosable = true,
  ...props
}: ModalWrapperProps) => {
  return (
    <Modal
      footer={null}
      wrapClassName={styleLess.modal}
      closable={false}
      width={width ?? 565}
      destroyOnClose={destroyOnClose}
      onCancel={onClose}
      maskClosable={maskClosable || !showCloseIcon}
      {...props}
    >
      <Fragment>
        {showCloseIcon && (
          <CloseCircleOutlined onClick={onClose} className={styleLess.modal__icon_close} />
        )}
        <div className={styleLess.modal__content}>
          <Title level={5} className={styleLess.modal__content__title}>
            {title}
          </Title>
          {children}
        </div>
      </Fragment>
    </Modal>
  );
};

export default ModalWrapper;
