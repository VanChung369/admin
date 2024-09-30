import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Col, Row } from 'antd';
import PageHeader from '@/components/PageHeader';
import { useIntl } from '@umijs/max';
import LoadingWrapper from '@/components/LoadingWrapper';
import { NFT_CREATE_FIELD, PARAMS_CONFIG } from '../constants';
import { nftSchema } from '../schema';
import NFTField from './components/NFTField';
import NFTButton from './components/NFTButton';
import NFTPreview from './components/NFTPreview';
import { useAppSelector } from '@/hooks';
import selectedConfig from '@/redux/config/selector';
import { useCreateOrUpdateNFT } from '../hooks';
import ROUTES_PATH from '@/constants/routesPath';
import { useWarnModalPage } from '@/hooks/hook-customs/useWarnModal';
import { TYPE_INPUT } from '@/constants/input';
import { get, trim } from 'lodash';
import { MEDIA } from '@/constants/file';
import { clearRequestParams, getFormatedFile } from '@/utils/utils';
import formatMessage from '@/components/FormatMessage';
import { PageContainer } from '@ant-design/pro-components';

const {
  NAME,
  ROYALTYFEE,
  TOTAL_SUPPLY,
  DESCRIPTION,
  IMAGE_MEDIUM,
  IMAGE_SMALL,
  FILE,
  FILE_PREVIEW,
} = NFT_CREATE_FIELD;

const { TOKEN, ATTRIBUTES } = PARAMS_CONFIG;

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
  [ROYALTYFEE]: '',
  [TOTAL_SUPPLY]: '',
  [DESCRIPTION]: '',
} as any;

const NFTCreation = () => {
  const intl = useIntl();
  const formikRef = useRef<any>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading: loadingCreateNFT, onCreateNFT } = useCreateOrUpdateNFT();

  const { general = {} } = useAppSelector(selectedConfig.getConfig);
  const { attributes = [] } = general;

  const backUrl = id ? `${ROUTES_PATH.NFT_DETAIL}/${id}` : ROUTES_PATH.NFT;

  const {
    visibleModalUnsaved,
    setValueChange,
    onCloseModalUnsaved,
    afterCloseModalUnsaved,
    onBackClick,
    onDiscard,
  } = useWarnModalPage(backUrl);

  useEffect(() => {
    const defaultAttributesValues = attributes.reduce((acc: any, attribute: any) => {
      const typeInput = attribute?.type?.toUpperCase();
      const fieldValue = typeInput === TYPE_INPUT.SELECT ? null : '';

      acc[`${attribute?.name}`] = fieldValue;
      initFormValue[`${attribute?.name}`] = fieldValue;
      return acc;
    }, {});

    formikRef?.current?.setValues({
      ...formikRef?.current?.values,
      ...defaultAttributesValues,
    });
  }, [attributes, formikRef]);

  // useEffect(() => {
  //   if (nftDetail?._id) {
  //     const attributeFieldValues = getAttributeFieldNFTValues(nftDetail) as object;
  //     const defaultFieldValues = getDefaultFieldNFTValues(nftDetail) as object;

  //     formikRef.current.setValues({
  //       ...defaultFieldValues,
  //       ...attributeFieldValues,
  //     });
  //   }
  // }, [nftDetail, attributes, id]);

  const getOriginFile = (file: any) => get(file, ['fileList', 0, 'originFileObj']);

  const handleCreateNFTFail = () => {
    formatMessage({
      descriptor: { id: 'codeMessage.E5' },
      type: 'error',
    });
  };

  const handlecreateNFTSuccess = (id: any) => {
    navigate(`${ROUTES_PATH.NFT}`);
    formatMessage({
      descriptor: { id: 'codeMessage.S1' },
      type: 'success',
    });
  };

  const handleSubmit = async (values: any = {}) => {
    const { file, filePreview, imageMedium, imageSmall } = values;

    let image = getOriginFile(file);
    const mediaType = getFormatedFile(values?.file);
    if (mediaType !== MEDIA.IMAGE) {
      image = getOriginFile(filePreview);
    }

    const attributesData = attributes.reduce((acc: any, attribute: any) => {
      acc[`${ATTRIBUTES}[${attribute?.name}]`] = values?.[attribute?.name];
      return acc;
    }, {});

    const data = {
      [NAME]: trim(values?.[NAME]),
      mediaFile: mediaType !== MEDIA.IMAGE ? getOriginFile(file) : undefined,
      image,
      mediaType: mediaType !== MEDIA.IMAGE ? mediaType : undefined,
      [IMAGE_MEDIUM]: image && imageMedium,
      [IMAGE_SMALL]: image && imageSmall,
      [DESCRIPTION]: trim(values?.[DESCRIPTION]),
      [ROYALTYFEE]: values?.[ROYALTYFEE],
      [`${TOKEN}[${TOTAL_SUPPLY}]`]: values?.[TOTAL_SUPPLY],
      ...attributesData,
    } as any;

    const formatData = clearRequestParams(data);

    const formData = new FormData();
    for (const key in formatData) {
      formData.append(key, formatData[key]);
    }

    if (id) {
      const params = {
        data: formData,
        id: id,
      };
    } else {
      onCreateNFT({
        data: formData,
        onSuccess: handlecreateNFTSuccess,
        onError: handleCreateNFTFail,
      });
    }
  };

  return (
    <PageContainer title={false}>
      <LoadingWrapper loading={loadingCreateNFT}>
        <PageHeader
          showBack
          title={intl.formatMessage({
            id: 'NFT.create',
          })}
          onBack={onBackClick}
        />

        <Formik
          innerRef={formikRef}
          initialValues={initFormValue}
          onSubmit={handleSubmit}
          validationSchema={nftSchema(intl)}
        >
          {({ values }: any) => {
            return (
              <Form>
                <Row gutter={20} justify="space-between">
                  <Col xs={24} sm={24} md={12} lg={16} xl={16} xxl={16}>
                    <NFTField />
                    <NFTButton isSubmit={loadingCreateNFT} onDiscard={onDiscard} id={id} />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                    <NFTPreview />
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </LoadingWrapper>
    </PageContainer>
  );
};

export default NFTCreation;
