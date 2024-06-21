import { TYPE_INPUT } from '@/constants/type';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import { ErrorMessage, Field } from 'formik';
import { FC, memo } from 'react';
import TextInput from './components/InputText';
import style from './index.less';
import { InputDesignProps } from './typings';

const InputDesign: FC<InputDesignProps> = ({
  customComponent,
  typeInput = TYPE_INPUT.TEXT,
  placeholder,
  type,
  name,
  prefix,
  className,
  content,
  label,
  errorClassName,
  required,
  children,
  errorField,
  unit,
  description,
  disabled,
  validate,
  labelTootip,
  textTooltip,
  appendInput,
  helpTextClassName,
  labelClassName,
  ...props
}) => {
  let inputRender = customComponent;

  switch (typeInput) {
    case TYPE_INPUT.TEXT:
      inputRender = TextInput;
      break;
    case TYPE_INPUT.NUMBER:
      inputRender = <></>;
      break;
    default:
      inputRender = TextInput;
      break;
  }

  return (
    <div className={classNames(className, style.input)}>
      {label && (
        <div className={classNames(labelClassName, style.label)}>
          {label}&nbsp;{required ? <span className={style.required}>*</span> : ''}&nbsp;
          {labelTootip && (
            <Tooltip trigger="hover" title={labelTootip} overlayClassName={style.tooltip}>
              <span>
                <QuestionCircleOutlined />
              </span>
            </Tooltip>
          )}
        </div>
      )}
      {description && (
        <div className={classNames(labelClassName, style.description)}>{description}</div>
      )}
      <div className={style.field}>
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          label={label}
          component={inputRender}
          unit={unit}
          validate={validate}
          {...props}
        />
      </div>
      <ErrorMessage
        name={errorField || name}
        component="div"
        className={classNames(errorClassName, style.error)}
      />
      {children}
    </div>
  );
};

export default memo(InputDesign);
