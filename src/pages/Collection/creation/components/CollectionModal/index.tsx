import { Col, Row } from 'antd';
import { CollectionProps, Property } from '../../typings';
import { useIntl } from '@umijs/max';
import ModalWrapper from '@/components/ModalWrapper';
import styleLess from './index.less';
import LoadingWrapper from '@/components/LoadingWrapper';
import formatMessage from '@/components/FormatMessage';
import { Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { TAG_STATUS } from '@/pages/Tag/constants';
import { trim } from 'lodash';
import FormWrapper from '@/components/FormWrapper';
import { MAX_LENGTH_DESCRIPTION, TYPE_INPUT } from '@/constants/input';
import ButtonWrapper from '@/components/ButtonWrapper';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateOrUpdateCollection, useGetCollection } from '@/pages/Collection/hooks';
import { COLLECTION_CREATE_FIELD, COLLECTION_STANDARD } from '@/pages/Collection/constants';
import { collectionSchema } from '@/pages/Collection/schema';
import PropertyForm from '../AddProperties';

const { NAME, STATUS, ITEM_QUANTITY, STANDARD, PROPERTIES, DESCRIPTION } = COLLECTION_CREATE_FIELD;

const initFormValue = {
  [NAME]: '',
  [STANDARD]: null,
  [STATUS]: false,
  [ITEM_QUANTITY]: 0,
  [PROPERTIES]: {},
  [DESCRIPTION]: '',
} as any;

const CollectionModal = ({ visible, onClose, setVisible, collectionId }: CollectionProps) => {
  const intl = useIntl();
  const formikRef = useRef<any>(null);
  const [properties, setProperties] = useState<{ [key: string]: Property }>({});
  const queryClient = useQueryClient();
  const {
    loading: loadingCreateCollection,
    loadingEditCollection,
    onCreateCollection,
    onEditCollection,
  } = useCreateOrUpdateCollection(collectionId);
  const { loading, error, data } = useGetCollection(collectionId, visible);

  const formatStandardOptions = COLLECTION_STANDARD.map((standard) => ({
    ...standard,
    name: intl.formatMessage({ id: standard.name }),
  }));

  useEffect(() => {
    if (data) {
      formikRef?.current?.setValues({
        ...initFormValue,
        [NAME]: data?.[NAME] ?? '',
        [STANDARD]: data?.[STANDARD] ?? '',
        [DESCRIPTION]: data?.[DESCRIPTION] ?? '',
        [STATUS]: data?.[STATUS] == TAG_STATUS[0].value ? false : true,
        [ITEM_QUANTITY]: data?.[ITEM_QUANTITY],
        [PROPERTIES]: data?.[PROPERTIES] ?? {},
      });
    }
  }, [data, collectionId]);

  useEffect(() => {
    if (!visible && !collectionId) {
      formikRef.current?.resetForm();
      setProperties({});
    }
  }, [visible, collectionId]);

  useEffect(() => {
    if (error) {
      formatMessage({
        descriptor: { id: 'codeMessage.E18' },
        type: 'error',
      });
    }
  }, [error]);

  const handleCreateCollectionFail = () => {
    formatMessage({
      descriptor: { id: 'codeMessage.E21' },
      type: 'error',
    });
  };

  const handleUpdateCollectionFail = () => {
    formatMessage({
      descriptor: { id: 'codeMessage.E22' },
      type: 'error',
    });
  };

  const handleCreateCollectionSuccess = () => {
    formatMessage({
      descriptor: { id: 'codeMessage.S7' },
      type: 'success',
    });
    queryClient.refetchQueries({
      queryKey: ['getListCollections'],
      type: 'active',
    });
    setVisible(false);
  };

  const handleUpdateCollectionSuccess = () => {
    formatMessage({
      descriptor: { id: 'codeMessage.S8' },
      type: 'success',
    });
    queryClient.refetchQueries({
      queryKey: ['getListCollections'],
      type: 'active',
    });
    setVisible(false);
  };

  const handleSubmit = async (values: any = {}) => {
    const formattedData = Object.entries(values?.[PROPERTIES]).reduce(
      (acc, [key, value]: any) => {
        const newKey = value.display.trim() || key;
        acc[newKey] = { ...value };
        return acc;
      },
      {} as { [key: string]: Property },
    );

    const data = {
      [NAME]: trim(values?.[NAME]),
      [DESCRIPTION]: trim(values?.[DESCRIPTION]),
      [STANDARD]: values?.[STANDARD],
      [STATUS]: values?.[STATUS],
      [ITEM_QUANTITY]: values?.[ITEM_QUANTITY],
      [PROPERTIES]: formattedData,
    } as any;

    if (collectionId) {
      onEditCollection({
        data: data,
        onSuccess: handleUpdateCollectionSuccess,
        onError: handleUpdateCollectionFail,
      });
    } else {
      onCreateCollection({
        data: data,
        onSuccess: handleCreateCollectionSuccess,
        onError: handleCreateCollectionFail,
      });
    }
  };

  return (
    <ModalWrapper width={560} onClose={onClose} open={visible} destroyOnClose={false}>
      <div className={styleLess.collection_modal}>
        <div className={styleLess.collection_modal__title}>
          {collectionId
            ? intl.formatMessage({
                id: 'collection.management.edit',
              })
            : intl.formatMessage({ id: 'collection.management.create' })}
        </div>
        <LoadingWrapper loading={loadingCreateCollection || loadingEditCollection || loading}>
          <Formik
            innerRef={formikRef}
            initialValues={initFormValue}
            onSubmit={handleSubmit}
            validationSchema={collectionSchema(intl)}
            enableReinitialize
          >
            {({ values }) => {
              return (
                <Form>
                  <Row gutter={20} justify="space-between">
                    <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={16}>
                      <FormWrapper
                        name={NAME}
                        label={intl.formatMessage({
                          id: 'collection.management.name',
                        })}
                        placeholder={intl.formatMessage({
                          id: 'collection.management.name.placeholder',
                        })}
                        disabled={data?.[ITEM_QUANTITY] > 0}
                        required
                      />
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={16}>
                      <FormWrapper
                        name={STATUS}
                        label={intl.formatMessage({
                          id: 'collection.management.status',
                        })}
                        typeInput={TYPE_INPUT.SWITCH}
                        className={styleLess.collection_modal_switch}
                        disabled={data?.[ITEM_QUANTITY] > 0}
                        size={'large'}
                        required
                      />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                      <FormWrapper
                        label={intl.formatMessage({
                          id: 'collection.management.standard',
                        })}
                        placeholder={intl.formatMessage({ id: 'collection.management.standard' })}
                        options={formatStandardOptions}
                        name={STANDARD}
                        typeInput={TYPE_INPUT.SELECT}
                        required
                        allowClear
                      />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                      <FormWrapper
                        name={DESCRIPTION}
                        label={intl.formatMessage({
                          id: 'NFT.create.description',
                        })}
                        placeholder={intl.formatMessage({
                          id: 'NFT.create.description.placeholder',
                        })}
                        typeInput={TYPE_INPUT.TEXTAREA}
                        description={intl.formatMessage({
                          id: 'NFT.create.sub.description',
                        })}
                        maxLength={MAX_LENGTH_DESCRIPTION}
                        showCount
                      />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                      <PropertyForm
                        form={formikRef?.current}
                        dataProperties={data?.[PROPERTIES]}
                        properties={properties}
                        setProperties={setProperties}
                      />
                    </Col>
                  </Row>
                  <ButtonWrapper
                    className={styleLess.collection_modal_button__create}
                    text={
                      collectionId
                        ? intl.formatMessage({ id: 'collection.management.save' })
                        : intl.formatMessage({ id: 'collection.management.create' })
                    }
                    htmlType="submit"
                    disabled={loadingEditCollection || data?.[ITEM_QUANTITY] > 0}
                    loading={loadingCreateCollection}
                    variant="primary"
                  />
                </Form>
              );
            }}
          </Formik>
        </LoadingWrapper>
      </div>
    </ModalWrapper>
  );
};

export default CollectionModal;
