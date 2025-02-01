import React, { useEffect, useState } from 'react';
import { useIntl } from '@umijs/max';
import styleLess from './index.less';
import { CreateOrUpdateProps } from './typings';
import ButtonWrapper from '@/components/ButtonWrapper';
import { FileAddOutlined } from '@ant-design/icons';
import CollectionModal from './components/CollectionModal';

const CollectionCreateOrUpdate = ({ collectionId }: CreateOrUpdateProps) => {
  const intl = useIntl();
  const [visible, setVisible] = useState(false);

  const handleShowTagModal = () => {
    setVisible(true);
  };

  const handleCloseTagModal = () => {
    setVisible(false);
  };

  return (
    <div className={styleLess.collection_create}>
      {collectionId ? (
        <div className={styleLess.collection_create__text} onClick={handleShowTagModal}>
          {intl.formatMessage({
            id: 'collection.management.edit',
          })}
        </div>
      ) : (
        <ButtonWrapper
          prefixIcon={<FileAddOutlined />}
          text={intl.formatMessage({ id: 'collection.management.create' })}
          onClick={handleShowTagModal}
          variant="primary"
          className={styleLess.collection_create__button__create}
        />
      )}

      <CollectionModal
        visible={visible}
        onClose={handleCloseTagModal}
        setVisible={setVisible}
        collectionId={collectionId}
      />
    </div>
  );
};

export default CollectionCreateOrUpdate;
