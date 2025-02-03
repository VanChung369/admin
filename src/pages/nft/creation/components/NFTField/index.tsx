import { getFormatedFile, limitMaxlengNumber, limitPercentage } from '@/utils/utils';
import { useIntl } from '@umijs/max';
import { Card, Col, Row } from 'antd';
import { useFormikContext } from 'formik';
import styleLess from './index.less';
import { NFT_CREATE_FIELD, NFT_STANDARD } from '@/pages/nft/constants';
import FormWrapper from '@/components/FormWrapper';
import { ATTRIBUTE_EXCLUDE, LIST_PREVIEW_FILE, MAX_PREVIEW_SIZE, MEDIA } from '@/constants/file';
import NFTUploadFile from '../UploadFile';
import {
  MAX_LENGTH_DESCRIPTION,
  MAX_LENGTH_TOTAL_SUPPLY,
  NFT_DECIMAL_SCALE,
  NFT_POSITIVE_SCALE,
  TYPE_INPUT,
} from '@/constants/input';
import { isString } from 'lodash';
import { LENGTH_CONSTANTS } from '@/constants';
import { PercentageOutlined } from '@ant-design/icons';
import { fetchDataColleciton, fetchDataTag } from '@/pages/nft/hooks';

const NFTField = ({ listAttribute }: any) => {
  const intl = useIntl();
  const { values, setFieldValue } = useFormikContext() as any;

  const attributeWithoutReduceAttribute = listAttribute?.filter(
    (attribute: any) => !ATTRIBUTE_EXCLUDE.includes(attribute?.name),
  );

  const formatTypeOptions = NFT_STANDARD.map((status) => ({
    ...status,
    name: intl.formatMessage({ id: status.label }),
  }));

  const handleChangeValueTag = (setFieldValue: any) => (value: any) => {
    setFieldValue([NFT_CREATE_FIELD.TAG], [...value?.item]);
  };

  const handleChangeValueCollection = (setFieldValue: any) => (value: any) => {
    setFieldValue([NFT_CREATE_FIELD.COLLECTION_ID], value?.item?._id);
  };

  const nftFile = getFormatedFile(values?.file);

  const renderAttributeFormItem = (attributes: Array<any>, options?: any) => {
    return attributes?.map((attribute: any) => {
      const label = attribute?.name;
      const placeholder = attribute?.name;
      const typeInput = attribute?.type?.toUpperCase();
      const selectOptions =
        typeInput === TYPE_INPUT.SELECT
          ? (attribute?.value || [])?.map((item: any) => {
              const value = isString(item) ? item : item?.text;
              return {
                label: value,
                value,
              };
            })
          : [];
      return (
        <Col key={attribute?.name} {...options}>
          <FormWrapper
            name={attribute?.name}
            label={label}
            required={attribute?.required}
            placeholder={placeholder}
            typeInput={typeInput}
            options={selectOptions}
            maxLength={LENGTH_CONSTANTS.MAX_LENGTH_INPUT}
          />
        </Col>
      );
    });
  };

  return (
    <div className={styleLess.nft_creation}>
      <Card className={styleLess.nft_creation__file}>
        <div className={styleLess.nft_creation__file_content}>
          <div className={styleLess.nft_creation__file_content__title}>
            {intl.formatMessage({
              id: 'NFT.content',
            })}
          </div>
          <div className={styleLess.nft_creation__file_content__sub_title}>
            {intl.formatMessage({
              id: 'NFT.file.support',
            })}
          </div>
          <FormWrapper
            name={NFT_CREATE_FIELD.FILE}
            typeInput={null}
            component={NFTUploadFile}
            errorField={`${NFT_CREATE_FIELD.FILE}.previewContent`}
          />
        </div>

        {nftFile !== MEDIA.IMAGE && (
          <div className={styleLess.nft_creation__file_preview_content}>
            <div className={styleLess.nft_creation__file_preview_content__title}>
              {intl.formatMessage({
                id: 'NFT.file.preview',
              })}
            </div>
            <div className={styleLess.nft_creation__file_preview_content__sub_title}>
              {intl.formatMessage({
                id: 'NFT.file.previwe.desc',
              })}
            </div>
            <FormWrapper
              name={NFT_CREATE_FIELD.FILE_PREVIEW}
              typeInput={null}
              component={NFTUploadFile}
              errorField={`${NFT_CREATE_FIELD.FILE_PREVIEW}.previewContent`}
              listFileTypeSupport={LIST_PREVIEW_FILE}
              maxSize={MAX_PREVIEW_SIZE}
            />
          </div>
        )}
      </Card>

      <Card className={styleLess.nft_creation__attribute}>
        <Row gutter={20}>
          <Col md={24} xs={24}>
            <FormWrapper
              name={NFT_CREATE_FIELD.TYPE}
              label={intl.formatMessage({
                id: 'NFT.create.type',
              })}
              placeholder={intl.formatMessage({
                id: 'NFT.create.type.placeholder',
              })}
              typeInput={TYPE_INPUT.SELECT}
              options={formatTypeOptions}
              required
              allowClear
            />
          </Col>
          <Col md={24} xs={24}>
            <FormWrapper
              name={NFT_CREATE_FIELD.NAME}
              label={intl.formatMessage({
                id: 'NFT.create.name',
              })}
              required
              placeholder={intl.formatMessage({
                id: 'NFT.create.name.placeholder',
              })}
            />
          </Col>
          <Col md={12} xs={24} className={styleLess.nft_creation__attribute__row__royalties}>
            <FormWrapper
              name={NFT_CREATE_FIELD.ROYALTYFEE}
              label={intl.formatMessage({
                id: 'NFT.create.royalties',
              })}
              required
              placeholder={intl.formatMessage({
                id: 'NFT.create.royalties.placeholder',
              })}
              typeInput={TYPE_INPUT.NUMBER}
              decimalScale={NFT_DECIMAL_SCALE}
              isAllowed={limitPercentage}
              appendInput={
                <span className={styleLess.field__span}>
                  <PercentageOutlined />
                </span>
              }
            />
          </Col>
          <Col md={12} xs={24}>
            <FormWrapper
              name={NFT_CREATE_FIELD.TOTAL_SUPPLY}
              label={intl.formatMessage({
                id: 'NFT.create.supply',
              })}
              required
              placeholder={intl.formatMessage({
                id: 'NFT.create.supply.placeholder',
              })}
              typeInput={TYPE_INPUT.NUMBER}
              thousandSeparator
              decimalScale={NFT_POSITIVE_SCALE}
              isAllowed={limitMaxlengNumber(MAX_LENGTH_TOTAL_SUPPLY)}
            />
          </Col>
          <Col md={24} xs={24}>
            <FormWrapper
              name={NFT_CREATE_FIELD.DESCRIPTION}
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
          <Col md={12} xs={24}>
            <FormWrapper
              mode={'multiple'}
              typeInput={TYPE_INPUT.SELECT_INFINITY_SCROLL}
              placeholder={intl.formatMessage({
                id: 'NFT.create.tag',
              })}
              required
              name={NFT_CREATE_FIELD.TAG}
              label={intl.formatMessage({
                id: 'NFT.create.tag',
              })}
              fetchData={fetchDataTag}
              queryKey={['infinityScrollSelectTag']}
              onChange={handleChangeValueTag(setFieldValue)}
              allowClear
            />
          </Col>
          <Col md={12} xs={24}>
            <FormWrapper
              typeInput={TYPE_INPUT.SELECT_INFINITY_SCROLL}
              placeholder={intl.formatMessage({
                id: 'NFT.create.collection',
              })}
              required
              name={NFT_CREATE_FIELD.COLLECTION_ID}
              label={intl.formatMessage({
                id: 'NFT.create.collection',
              })}
              fetchData={fetchDataColleciton}
              queryKey={['infinityScrollSelectCollection']}
              onChange={handleChangeValueCollection(setFieldValue)}
              allowClear
            />
          </Col>
          {listAttribute &&
            renderAttributeFormItem(attributeWithoutReduceAttribute, { md: 12, xs: 24 })}
        </Row>
      </Card>
    </div>
  );
};
export default NFTField;
