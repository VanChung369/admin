import React from 'react';
import classNames from 'classnames';
import { ContentModalStepProps } from './typing';
import { useIntl } from '@umijs/max';
import styleLess from './index.less';

const ContentModalStep = ({
  icon,
  className,
  title,
  innerHtml,
  customDescription,
  description,
}: ContentModalStepProps) => {
  const intl = useIntl();

  return (
    <div className={classNames(styleLess.modal_content, className)}>
      <p className={styleLess.modal_content__title}>
        {title || intl.formatMessage({ id: 'modal.failed' })}
      </p>
      {icon}
      {customDescription ? (
        <div className={styleLess.modal_content__description}>{customDescription}</div>
      ) : innerHtml ? (
        <p
          className={styleLess.modal_content__description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : (
        <p className={styleLess.modal_content__description}>{description}</p>
      )}
    </div>
  );
};

export default ContentModalStep;
