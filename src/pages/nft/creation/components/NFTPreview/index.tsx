import { getFormatedFile } from '@/utils/utils';
import { useIntl } from '@umijs/max';
import { useFormikContext } from 'formik';
import { NFT_CREATE_FIELD } from '@/pages/nft/constants';
import { useMemo } from 'react';
import { MEDIA } from '@/constants/file';
import { Card, Image } from 'antd';
import styleLess from './index.less';
import imageError from '@/resources/images/image-error.png';
import NFTPreviewContent from '@/components/NFTPreviewContent';
const { Meta } = Card;

const { FILE, FILE_PREVIEW, NAME, TOTAL_SUPPLY } = NFT_CREATE_FIELD;
const NFTPreview = () => {
  const intl = useIntl();
  const { values } = useFormikContext() as any;

  const nftFormat = getFormatedFile(values?.[FILE]);
  const srcContent = values?.[FILE]?.previewContent;
  const srcPreview = values?.[FILE_PREVIEW]?.previewContent;

  const isPreviewNFT = srcPreview || srcContent;

  const renderPreviewSrc = useMemo(() => {
    if (srcContent && nftFormat === MEDIA.IMAGE) {
      return srcContent;
    } else if (srcPreview && nftFormat !== MEDIA.IMAGE) {
      return srcPreview;
    }
    return null;
  }, [srcContent, srcPreview, nftFormat]);

  return (
    <Card
      hoverable
      title={intl.formatMessage({ id: 'NFT.create.preview.placeholder' })}
      className={styleLess.nft_create_preview}
      cover={
        !isPreviewNFT ? (
          <Image preview={false} src="error" fallback={imageError} />
        ) : (
          <Image src={renderPreviewSrc} preview={true} />
        )
      }
    >
      <NFTPreviewContent nft={values} />
    </Card>
  );
};

export default NFTPreview;
