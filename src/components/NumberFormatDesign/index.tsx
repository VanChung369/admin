import { NumberFormatDesignProps } from '@/components/NumberFormatDesign/typings';
import { DECIMAL_SCALE } from '@/constants/fomatNumber';
import classNames from 'classnames';
import { FC } from 'react';
import { NumericFormat } from 'react-number-format';

const NumberFormatDesign: FC<NumberFormatDesignProps> = ({
  value,
  className,
  decimalScale = DECIMAL_SCALE,
  displayType = 'text',
  thousandSeparator = true,
  thousandsGroupStyle,
  customInput,
  ...props
}) => {
  return (
    <NumericFormat
      thousandsGroupStyle={thousandsGroupStyle}
      value={value}
      customInput={customInput}
      decimalScale={decimalScale}
      displayType={displayType}
      thousandSeparator={thousandSeparator}
      className={classNames(className)}
      {...props}
    />
  );
};

export default NumberFormatDesign;
