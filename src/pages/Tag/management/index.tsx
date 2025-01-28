import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useNavigate } from 'react-router-dom';
import { LENGTH_CONSTANTS } from '@/constants';
import styleLess from './index.less';
import { Card } from 'antd';
import { TAG_MANAGEMENT_FIELD } from '../constants';
import TagList from './components/Tag';
import TagCreateOrUpdate from '../creation';

const { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } = LENGTH_CONSTANTS;

const { KEYWORD, STATUS, PAGE, LIMIT } = TAG_MANAGEMENT_FIELD;

const initParams = {
  [KEYWORD]: '',
  [STATUS]: null,
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
      title={intl.formatMessage({ id: 'tag.management' })}
      className={styleLess.tag_management}
    >
      <div className={styleLess.tag_management__button}>
        <TagCreateOrUpdate />
      </div>
      <Card className={styleLess.tag_management__table}>
        <TagList params={params} onSubmit={handleSubmit} />
      </Card>
    </PageContainer>
  );
};

export default TagManagement;
