import { MAX_LENGTH } from '@/constants/input';
import { Input } from 'antd';
import { FieldInputProps, FormikProps } from 'formik';
import { trim } from 'lodash';
import { FC } from 'react';

type NumberInputProps = {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  onChange?: any;
  onBlur?: any;
  value?: any;
  maxLength?: number;
  [key: string]: any;
};

const TextInput: FC<NumberInputProps> = ({
  field,
  form,
  onChange,
  onBlur,
  value,
  maxLength,
  ...props
}) => {
  const handleChange = (e: any) => {
    const { value } = e.target;
    if (!onChange) {
      form.setFieldValue(field.name, trim(value));
    } else {
      onChange(e);
    }
  };

  const handleBlur = (e: any) => {
    const { value } = e.target;
    if (!onBlur) {
      form.handleBlur(e);
      form.setFieldValue(field.name, trim(value));
    } else {
      onBlur(e);
    }
  };

  return (
    <Input
      maxLength={maxLength || MAX_LENGTH}
      {...field}
      {...props}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value || form.values[field.name]}
    />
  );
};

export default TextInput;
