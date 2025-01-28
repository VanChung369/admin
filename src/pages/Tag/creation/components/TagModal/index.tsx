import { Col, Row } from 'antd';
import { TagProps } from '../../typings';
import { useIntl } from '@umijs/max';
import ModalWrapper from '@/components/ModalWrapper';
import styleLess from './index.less';
import LoadingWrapper from '@/components/LoadingWrapper';
import formatMessage from '@/components/FormatMessage';
import { useCreateOrUpdateTag, useGetTag } from '@/pages/Tag/hooks';
import { Form, Formik } from 'formik';
import { useEffect, useRef } from 'react';
import { TAG_CREATE_FIELD, TAG_STATUS } from '@/pages/Tag/constants';
import { tagSchema } from '@/pages/Tag/schema';
import { get, trim } from 'lodash';
import { clearRequestParams, getFormatedFile } from '@/utils/utils';
import { IMAGE_TYPE, MEDIA } from '@/constants/file';
import FormWrapper from '@/components/FormWrapper';
import { TYPE_INPUT } from '@/constants/input';
import ButtonWrapper from '@/components/ButtonWrapper';
import NFTUploadFile from '@/pages/nft/creation/components/UploadFile';
import { useQueryClient } from '@tanstack/react-query';

const { NAME, STATUS, ITEM_QUANTITY, IMAGE_MEDIUM, IMAGE_SMALL, FILE, FILE_PREVIEW } =
  TAG_CREATE_FIELD;

const initFormValue = {
  [NAME]: '',
  [FILE]: {
    fileList: [],
    previewContent: '',
  },
  [FILE_PREVIEW]: {
    fileList: [],
    previewContent: '',
  },

  [IMAGE_MEDIUM]: '',
  [IMAGE_SMALL]: '',
  [STATUS]: false,
  [ITEM_QUANTITY]: 0,
} as any;

const TagModal = ({ visible, onClose, setVisible, tagId }: TagProps) => {
  const intl = useIntl();
  const formikRef = useRef<any>(null);
  const queryClient = useQueryClient();
  const {
    loading: loadingCreateTag,
    loadingEditTag,
    onCreateTag,
    onEditTag,
  } = useCreateOrUpdateTag(tagId);
  const { loading, error, data } = useGetTag(tagId, visible);

  useEffect(() => {
    if (tagId) {
      formikRef?.current?.setValues({
        ...initFormValue,
        [NAME]: data?.[NAME] ?? '',
        [FILE]: {
          fileList: [{ type: data?.icon?.mimeType || IMAGE_TYPE }],
          previewContent: data?.icon?.url || '',
        },
        [FILE_PREVIEW]: {
          fileList: [{ type: data?.icon?.mimeType || IMAGE_TYPE }],
          previewContent: data?.icon?.url || '',
        },
        [IMAGE_MEDIUM]: data?.icon?.mediumUrl ?? '',
        [IMAGE_SMALL]: data?.icon?.smallUrl ?? '',
        [STATUS]: data?.[STATUS] == TAG_STATUS[0].value ? false : true,
        [ITEM_QUANTITY]: data?.[ITEM_QUANTITY],
      });
    }
  }, [data, tagId]);

  const getOriginFile = (file: any) => get(file, ['fileList', 0, 'originFileObj']);

  useEffect(() => {
    if (error) {
      formatMessage({
        descriptor: { id: 'codeMessage.E18' },
        type: 'error',
      });
    }
  }, [error]);

  const handleCreateTagFail = () => {
    formatMessage({
      descriptor: { id: 'codeMessage.E19' },
      type: 'error',
    });
  };

  const handleUpdateTagFail = () => {
    formatMessage({
      descriptor: { id: 'codeMessage.E20' },
      type: 'error',
    });
  };

  const handleCreateTagSuccess = () => {
    formatMessage({
      descriptor: { id: 'codeMessage.S5' },
      type: 'success',
    });
    queryClient.refetchQueries({
      queryKey: ['getListTags'],
      type: 'active',
    });
    setVisible(false);
  };

  const handleUpdateTagSuccess = () => {
    formatMessage({
      descriptor: { id: 'codeMessage.S6' },
      type: 'success',
    });
    queryClient.refetchQueries({
      queryKey: ['getListTags'],
      type: 'active',
    });
    setVisible(false);
  };

  const handleSubmit = async (values: any = {}) => {
    const { file, filePreview, imageMedium, imageSmall } = values;

    let image = getOriginFile(file);
    const mediaType = getFormatedFile(values?.file);
    if (mediaType !== MEDIA.IMAGE) {
      image = getOriginFile(filePreview);
    }

    const data = {
      [NAME]: trim(values?.[NAME]),
      image,
      [IMAGE_MEDIUM]: image && imageMedium,
      [IMAGE_SMALL]: image && imageSmall,
      [STATUS]: values?.[STATUS],
      [ITEM_QUANTITY]: values?.[ITEM_QUANTITY],
    } as any;

    const formatData = clearRequestParams(data);

    const formData = new FormData();
    for (const key in formatData) {
      formData.append(key, formatData[key]);
    }

    if (tagId) {
      onEditTag({
        data: formData,
        onSuccess: handleUpdateTagSuccess,
        onError: handleUpdateTagFail,
      });
    } else {
      onCreateTag({
        data: formData,
        onSuccess: handleCreateTagSuccess,
        onError: handleCreateTagFail,
      });
    }
  };

  return (
    <ModalWrapper width={560} onClose={onClose} open={visible}>
      <div className={styleLess.tag_modal}>
        <LoadingWrapper loading={loadingCreateTag || loadingEditTag || loading}>
          <Formik
            innerRef={formikRef}
            initialValues={initFormValue}
            onSubmit={handleSubmit}
            validationSchema={tagSchema(intl)}
          >
            {({ values }: any) => {
              return (
                <Form>
                  <Row gutter={20} justify="space-between">
                    <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={16}>
                      <FormWrapper
                        name={NAME}
                        label={intl.formatMessage({
                          id: 'tag.management.name',
                        })}
                        required
                        placeholder={intl.formatMessage({
                          id: 'tag.management.name.placeholder',
                        })}
                      />
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={16}>
                      <FormWrapper
                        name={STATUS}
                        label={intl.formatMessage({
                          id: 'tag.management.status',
                        })}
                        typeInput={TYPE_INPUT.SWITCH}
                        className={styleLess.tag_modal_switch}
                        size={'large'}
                        required
                      />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                      <div>
                        <div className={styleLess.tag_modal__file_content__title}>
                          {intl.formatMessage({
                            id: 'tag.order.management.tag.icon',
                          })}
                        </div>
                        <div className={styleLess.tag_modal__file_content__sub_title}>
                          {intl.formatMessage({
                            id: 'tag.order.management.tag.content',
                          })}
                        </div>
                        <FormWrapper
                          name={FILE}
                          typeInput={null}
                          component={NFTUploadFile}
                          errorField={`${FILE}.previewContent`}
                        />
                      </div>
                    </Col>
                  </Row>
                  <ButtonWrapper
                    className={styleLess.tag_modal_button__create}
                    text={
                      tagId
                        ? intl.formatMessage({ id: 'tag.order.management.save' })
                        : intl.formatMessage({ id: 'tag.management.create' })
                    }
                    htmlType="submit"
                    disabled={loadingCreateTag}
                    loading={loadingCreateTag}
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

export default TagModal;
