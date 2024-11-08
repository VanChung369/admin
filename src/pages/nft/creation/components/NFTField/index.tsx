import { getFormatedFile, limitMaxlengNumber, limitPercentage } from '@/utils/utils';
import { useIntl } from '@umijs/max';
import { Card, Col, Row } from 'antd';
import { useFormikContext } from 'formik';
import styleLess from './index.less';
import { NFT_CREATE_FIELD, NFT_CREATION_ATTRIBUTE } from '@/pages/nft/constants';
import FormWrapper from '@/components/FormWrapper';
import { ATTRIBUTE_EXCLUDE, LIST_PREVIEW_FILE, MAX_PREVIEW_SIZE, MEDIA } from '@/constants/file';
import NFTUploadFile from '../UploadFile';
import { useAppSelector } from '@/hooks';
import selectedConfig from '@/redux/config/selector';
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

const NFTField = () => {
  const intl = useIntl();
  const { values } = useFormikContext() as any;
  const { general = {} } = useAppSelector(selectedConfig.getConfig);
  const { attributes = {} } = general;
  const listAttribute = Object.values(attributes);
  const attributeWithoutReduceAttribute = listAttribute.filter(
    (attribute: any) => !ATTRIBUTE_EXCLUDE.includes(attribute?.name),
  );

  const excludeAttribute = listAttribute.filter((attribute: any) =>
    ATTRIBUTE_EXCLUDE.includes(attribute?.name),
  );

  const nftFile = getFormatedFile(values?.file);

  const renderAttributeFormItem = (attributes: Array<any>, options?: any) => {
    return attributes?.map((attribute: any) => {
      const label = intl.formatMessage({
        id: NFT_CREATION_ATTRIBUTE?.[attribute?.name].text,
      });
      const placeholder = intl.formatMessage({
        id: NFT_CREATION_ATTRIBUTE?.[attribute?.name].placeholder,
      });
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
            thousandSeparator
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
          {renderAttributeFormItem(excludeAttribute, { md: 24, xs: 24 })}

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
              thousandSeparator
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
          {renderAttributeFormItem(attributeWithoutReduceAttribute, { md: 12, xs: 24 })}
        </Row>
      </Card>
    </div>
  );
};
export default NFTField;
