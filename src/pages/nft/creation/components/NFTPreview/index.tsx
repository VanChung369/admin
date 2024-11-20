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
import { useQueryClient } from '@tanstack/react-query';
import { uniqBy } from 'lodash';
import Countdown, { CountdownProps } from 'antd/es/statistic/Countdown';

const { FILE, FILE_PREVIEW } = NFT_CREATE_FIELD;
const NFTPreview = () => {
  const intl = useIntl();
  const { values } = useFormikContext() as any;
  const queryClient = useQueryClient();
  const query: any = queryClient.getQueryData(['infinityScrollSelectNft', '']);

  const dataNft: any = uniqBy(query?.pages.flatMap((page: any) => page?.docs) || [], '_id').find(
    (item: any) => item._id === values?.nftID,
  );

  const nftFormat = dataNft
    ? getFormatedFile(dataNft?.image.mimeType)
    : getFormatedFile(values?.[FILE]);
  const srcContent = dataNft ? dataNft?.image?.url : values?.[FILE]?.previewContent;
  const srcPreview = dataNft ? dataNft?.image?.url : values?.[FILE_PREVIEW]?.previewContent;

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
      <NFTPreviewContent nft={dataNft ? dataNft : values} saleOrder={values} />
    </Card>
  );
};

export default NFTPreview;
