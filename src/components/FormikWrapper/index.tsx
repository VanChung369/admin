import { FormikWrapperProps } from '@/components/FormikWrapper/typings';
import { Formik } from 'formik';
import { FC } from 'react';

const FormikWrapper: FC<FormikWrapperProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  innerRef,
  ...props
}) => {
  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      {...props}
    >
      {(formik) => {
        return children(formik);
      }}
    </Formik>
  );
};

export default FormikWrapper;
