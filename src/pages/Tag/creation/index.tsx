import React, { useEffect, useState } from 'react';
import { useIntl } from '@umijs/max';
import styleLess from './index.less';
import { CreateOrUpdateProps } from './typings';
import TagModal from './components/TagModal';
import ButtonWrapper from '@/components/ButtonWrapper';
import { FileAddOutlined } from '@ant-design/icons';

const TagCreateOrUpdate = ({ tagId }: CreateOrUpdateProps) => {
  const intl = useIntl();
  const [visible, setVisible] = useState(false);

  const handleShowTagModal = () => {
    setVisible(true);
  };

  const handleCloseTagModal = () => {
    setVisible(false);
  };

  return (
    <div className={styleLess.tag_create}>
      {tagId ? (
        <div className={styleLess.tag_create__text} onClick={handleShowTagModal}>
          {intl.formatMessage({
            id: 'tag.management.edit',
          })}
        </div>
      ) : (
        <ButtonWrapper
          prefixIcon={<FileAddOutlined />}
          text={intl.formatMessage({ id: 'tag.management.create' })}
          onClick={handleShowTagModal}
          variant="primary"
          className={styleLess.tag_create__button__create}
        />
      )}

      <TagModal
        visible={visible}
        onClose={handleCloseTagModal}
        setVisible={setVisible}
        tagId={tagId}
      />
    </div>
  );
};

export default TagCreateOrUpdate;
