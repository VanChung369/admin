import { PatternFormatDesignProps } from '@/components/PatternFormatDesign/typings';
import { FORMAT } from '@/constants/fomatNumber';
import classNames from 'classnames';
import { FC } from 'react';
import { PatternFormat } from 'react-number-format';

const PatternFormatDesign: FC<PatternFormatDesignProps> = ({
  value,
  className,
  format = FORMAT,
  mask,
  customInput,
  ...props
}) => {
  return (
    <PatternFormat
      value={value}
      format={format}
      customInput={customInput}
      mask={mask}
      className={classNames(className)}
      {...props}
    />
  );
};

export default PatternFormatDesign;
