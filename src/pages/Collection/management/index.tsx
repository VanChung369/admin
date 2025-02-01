import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useNavigate } from 'react-router-dom';
import { LENGTH_CONSTANTS } from '@/constants';
import styleLess from './index.less';
import { Card } from 'antd';
import { COLLECTION_MANAGEMENT_FIELD } from '../constants';
import TagList from './components/Collection';
import CollectionCreateOrUpdate from '../creation';

const { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } = LENGTH_CONSTANTS;

const { KEYWORD, STATUS, STANDARD, PAGE, LIMIT } = COLLECTION_MANAGEMENT_FIELD;

const initParams = {
  [KEYWORD]: '',
  [STATUS]: null,
  [STANDARD]: null,
  [PAGE]: DEFAULT_PAGE,
  [LIMIT]: DEFAULT_PAGE_SIZE,
};

const TagManagement: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [params, setParams] = useState(initParams);

  const handleSubmit = (values: any) => {
    setParams({
      ...initParams,
      ...values,
    });
  };

  return (
    <PageContainer
      title={intl.formatMessage({ id: 'collection.management' })}
      className={styleLess.collection_management}
    >
      <div className={styleLess.collection_management__button}>
        <CollectionCreateOrUpdate />
      </div>
      <Card className={styleLess.collection_management__table}>
        <TagList params={params} onSubmit={handleSubmit} />
      </Card>
    </PageContainer>
  );
};

export default TagManagement;
