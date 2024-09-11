import classNames from 'classnames';
import ButtonWrapper from '../ButtonWrapper';
import { PageHeaderProps } from './typings';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styleLess from './index.less';

const PageHeader = ({ className, showBack, onBack, title }: PageHeaderProps) => {
  return (
    <div className={classNames(styleLess.header, { [className]: !!className })}>
      {showBack && (
        <ButtonWrapper
          onClick={onBack}
          text={<ArrowLeftOutlined />}
          className={styleLess.header__button}
        />
      )}
      <div className={styleLess.header__title}>{title}</div>
    </div>
  );
};

export default PageHeader;
