import React from 'react';
import styleLess from './index.less';
import { ModalConfirmProps } from './typing';
import { useIntl } from '@umijs/max';
import cx from 'classnames';
import ModalWrapper from '../ModalWrapper';
import ButtonWrapper from '../ButtonWrapper';

const ModalConfirm = ({
  visible,
  onClose,
  onConfirm,
  title,
  decsription,
  confirmText,
  className,
  innerHtml,
  noCancel,
  loading,
  width,
  ...props
}: ModalConfirmProps) => {
  const intl = useIntl();

  return (
    <ModalWrapper open={visible} width={width || 550} onClose={onClose} {...props}>
      <div className={cx(styleLess.modal_confirm, className)}>
        <div className={styleLess.modal_confirm__title}>{title}</div>
        {innerHtml ? (
          <div
            className={styleLess.modal_confirm__description}
            dangerouslySetInnerHTML={{ __html: decsription }}
          />
        ) : (
          <div className={styleLess.modal_confirm__description}>{decsription}</div>
        )}
        {noCancel ? (
          <ButtonWrapper
            className={styleLess.modal_confirm__button_proceed}
            onClick={onConfirm}
            text={confirmText || intl.formatMessage({ id: 'common.text.delete' })}
            variant="primary"
            loading={loading}
            disabled={loading}
          />
        ) : (
          <div className={styleLess.modal_confirm__button}>
            <ButtonWrapper
              className={styleLess.modal_confirm__button_cancel}
              onClick={onClose}
              text={intl.formatMessage({ id: 'common.text.cancel' })}
              disabled={loading}
            />

            <ButtonWrapper
              className={styleLess.modal_confirm__button_confirm}
              onClick={onConfirm}
              text={confirmText || intl.formatMessage({ id: 'common.text.delete' })}
              variant="primary"
              disabled={loading}
              loading={loading}
            />
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

export default ModalConfirm;
