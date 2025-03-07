import React, { useMemo } from 'react';
import classNames from 'classnames';
import noop from 'lodash/noop';
import { ModalStepProps } from './typing';
import { useIntl } from '@umijs/max';
import ContentModalStep from '../ContentModalStep';
import ModalWrapper from '../ModalWrapper';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  Loading3QuartersOutlined,
} from '@ant-design/icons';
import styleLess from './index.less';

const ModalStep = ({
  visible,
  loadingSrc,
  innerHtml,
  failed,
  failedTitle,
  failedSrc,
  failedDescription,
  textFailedDescription,
  onFailedClose,
  failedClassName,

  successful,
  successfulSrc,
  successfulTitle,
  successfulDescription,
  onSuccessfulClose,
  successfullClassName,
  textSuccessfulDescription,

  processing,
  processingSrc,
  processingTitle,
  processingDescription,
  processingClassName,
  textProcessingDescription,

  maskClosable,
  showCloseIcon,
  ...props
}: ModalStepProps) => {
  const intl = useIntl();
  const defaultSuccessDescription =
    textSuccessfulDescription || intl.formatMessage({ id: 'modal.successful' });
  const defaultFailedDescription =
    textFailedDescription || intl.formatMessage({ id: 'modal.failed.description' });
  const defaultProcessingDescription =
    textProcessingDescription || intl.formatMessage({ id: 'modal.processing.description' });

  const dependences = [processing, successful, failed];

  const handleOnclose = () => {
    switch (true) {
      case failed:
        return onFailedClose && onFailedClose();
      case successful:
        return onSuccessfulClose && onSuccessfulClose();
      default:
        return noop;
    }
  };

  const renderContent = useMemo(() => {
    switch (true) {
      case failed:
        return {
          title: failedTitle || intl.formatMessage({ id: 'modal.failed' }),
          icon: <CloseCircleOutlined className={styleLess.modal_step__icon__failed} />,
          className: classNames(styleLess.modal_step, failedClassName),
          customDescription: failedDescription,
          description: defaultFailedDescription,
        };
      case successful:
        return {
          title: successfulTitle || intl.formatMessage({ id: 'modal.successful' }),
          icon: <CheckCircleOutlined className={styleLess.modal_step__icon__successful} />,
          className: classNames(styleLess.modal_step, successfullClassName),
          customDescription: successfulDescription,
          description: defaultSuccessDescription,
        };
      default:
        return {
          title: processingTitle || intl.formatMessage({ id: 'modal.processing' }),
          icon: <Loading3QuartersOutlined className={styleLess.modal_step__icon__processing} />,
          className: classNames(styleLess.modal_step, processingClassName),
          customDescription: processingDescription,
          description: defaultProcessingDescription,
        };
    }
  }, dependences);

  return (
    <ModalWrapper
      width={550}
      open={visible}
      maskClosable={maskClosable}
      showCloseIcon={showCloseIcon}
      onClose={handleOnclose}
      {...props}
    >
      <ContentModalStep innerHtml={innerHtml} {...renderContent} />
    </ModalWrapper>
  );
};

export default ModalStep;
