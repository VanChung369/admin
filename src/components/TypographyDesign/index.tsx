import TextEllipsis from '@/components/TypographyDesign/components/TextEllipsis';
import TextExpand from '@/components/TypographyDesign/components/TextExpand';
import TextSuffix from '@/components/TypographyDesign/components/TextSuffix';
import { TypographyDesignProps } from '@/components/TypographyDesign/typings';
import { TYPE_TYPOGRAPHY } from '@/constants/type';
import classNames from 'classnames';
import { FC, memo } from 'react';
import style from './index.less';

const TypographyDesign: FC<TypographyDesignProps> = ({
  text,
  copyable,
  customComponent,
  isShorten,
  className,
  typeTypography,
  textTooltip,
  triggerType,
  minRows,
  maxRows,
  enterIcon,
  maxLength,
  icon,
  onChange,
  editing,
  children,
  rowsNumber,
  textButton,
  ...props
}) => {
  let typographyRender = customComponent;

  switch (typeTypography) {
    case TYPE_TYPOGRAPHY.TEXT_SUFFIX:
      typographyRender = (
        <TextSuffix
          text={text}
          onChange={onChange}
          textTooltip={textTooltip}
          icon={icon}
          editing={editing}
          triggerType={triggerType}
          enterIcon={enterIcon}
          maxLength={maxLength}
          className={className}
          minRows={minRows}
          maxRows={maxRows}
          isShorten={isShorten}
          copyable={copyable}
          {...props}
        />
      );
      break;
    case TYPE_TYPOGRAPHY.TEXT_ELLIPSIS:
      typographyRender = (
        <TextEllipsis
          isShorten={isShorten}
          copyable={copyable}
          text={text}
          className={className}
          textTooltip={textTooltip}
          {...props}
        >
          {children}
        </TextEllipsis>
      );
      break;
    case TYPE_TYPOGRAPHY.TEXT_EXPAND:
      typographyRender = (
        <TextExpand
          text={text}
          className={className}
          rowsNumber={rowsNumber}
          textButton={textButton}
        />
      );
      break;
    default:
      typographyRender = (
        <TextSuffix text={text} isShorten={isShorten} className={className} {...props} />
      );
      break;
  }

  return <div className={classNames(style.paragraph)}>{typographyRender}</div>;
};

export default memo(TypographyDesign);
