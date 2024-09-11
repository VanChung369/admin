import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button } from 'antd';
import { Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';

const Admin: React.FC = () => {
  const intl = useIntl();

  const handleSubmit = (values: any) => {
    console.log(values);
  };
  const initialValues = {
    name: '',
  };
  const [params, setParams] = useState(initialValues);

  const formikRef = useRef<any>(null);

  return (
    <PageContainer
      content={intl.formatMessage({
        id: 'pages.admin.subPage.title',
        defaultMessage: 'This page can only be viewed by admin',
      })}
    >
      <Formik
        initialValues={params}
        onSubmit={handleSubmit}
        innerRef={formikRef}
        enableReinitialize
      >
        {({ setFieldValue, values }) => (
          <Form autoComplete="off">
            <Button htmlType="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </PageContainer>
  );
};

export default Admin;
