import React, { useEffect, useState } from 'react';
import { Image as ImageAntd, message, Spin, Upload } from 'antd';
import { UploadChangeParam, RcFile } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import Resizer from 'react-image-file-resizer';
import MediaPlayer from '@/components/MediaPlayer';
import { useIntl } from '@umijs/max';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { getFormatedFile, get3DFileType } from '@/utils/utils';
import {
  LIST_FILE,
  MAX_FILE_SIZE,
  MEDIA,
  FILE_BINARY_SIZE,
  IMAGE_MEDIUM_SIZE,
  IMAGE_SMALL_SIZE,
  IMAGE_TYPE,
  UPLOAD_STATUS,
  MAX_FILE_NUMBER,
} from '@/constants/file';
import { NFT_CREATE_FIELD } from '@/pages/nft/constants';
import styleLess from './index.less';

const { WIDTH: widthMedium, HEIGHT: heightMedium } = IMAGE_MEDIUM_SIZE;
const { WIDTH: widthSmall, HEIGHT: heightSmall } = IMAGE_SMALL_SIZE;
const { IMAGE_MEDIUM, IMAGE_SMALL } = NFT_CREATE_FIELD;
const { Dragger } = Upload;
const { AUDIO, VIDEO } = MEDIA;

type UploadFileProps = {
  form: any;
  field: any;
  maxSize?: number;
  listFileTypeSupport: Array<string>;
  disabled?: boolean;
};

const NFTUploadFile = ({
  form,
  field,
  listFileTypeSupport = LIST_FILE,
  maxSize = MAX_FILE_SIZE,
  disabled,
}: UploadFileProps) => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [urlBlob, setUrlBlob] = useState('');

  const previewContent = field?.value?.previewContent;
  const fileFormat = getFormatedFile(field?.value);

  useEffect(() => {
    return () => URL.revokeObjectURL(urlBlob);
  }, []);

  const handleCustomRequest = ({ onSuccess }: any) => onSuccess(UPLOAD_STATUS.OK);

  const getDimensions = (file: any) =>
    new Promise<{ width: number; height: number }>((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e: any) {
          const image = new Image() as any;
          image.src = e.target.result;

          image.onload = function () {
            const height = this.height;
            const width = this.width;
            resolve({ height, width });
          };
        };
      } catch (error) {
        reject(error);
      }
    });

  const handleBeforeUpload = async (file: RcFile) => {
    const type = file?.type || get3DFileType(file?.name);

    if (type === 'image/svg+xml') {
      message.error(intl.formatMessage({ id: 'codeMessage.E4' }));
      return false;
    }

    if (!listFileTypeSupport.includes(type)) {
      message.error(intl.formatMessage({ id: 'codeMessage.E4' }));
      return Upload.LIST_IGNORE;
    }

    if (file?.size > maxSize * Math.pow(FILE_BINARY_SIZE, 2)) {
      message.error(intl.formatMessage({ id: 'codeMessage.E3' }, { size: maxSize }));
      return Upload.LIST_IGNORE;
    }

    setLoading(true);
    return true;
  };

  const resizeFile = async (file: any, width: number, height: number) => {
    const imgDimension = await getDimensions(file);
    if (imgDimension.width > imgDimension.height) {
      width = imgDimension.width;
    } else {
      height = imgDimension.height;
    }

    return new Promise((resolve, reject) => {
      try {
        Resizer.imageFileResizer(
          file,
          width,
          height,
          'PNG',
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          'blob',
        );
      } catch (error) {
        console.error('resizeFile', error);
        reject(error);
      }
    });
  };

  const handleFileChange = async (info: UploadChangeParam<UploadFile<any>>) => {
    URL.revokeObjectURL(urlBlob);
    const { file } = info as any;
    const { status } = file;

    if (status === UPLOAD_STATUS.DONE) {
      if (!file.url && !file.preview) {
        const url = await URL.createObjectURL(
          new Blob([file.originFileObj], { type: file.type || IMAGE_TYPE }),
        );
        setUrlBlob(url);
        file.preview = url;
      }

      let imageMedium: any;
      let imageSmall: any;

      if (getFormatedFile(info) === MEDIA.IMAGE) {
        const blob = new Blob([file.originFileObj], { type: file.type || IMAGE_TYPE });

        [imageMedium, imageSmall] = await Promise.all([
          resizeFile(blob, widthMedium, heightMedium),
          resizeFile(blob, widthSmall, heightSmall),
        ]);

        form.setFieldValue(IMAGE_MEDIUM, imageMedium);
        form.setFieldValue(IMAGE_SMALL, imageSmall);
      }

      setLoading(false);

      return form.setFieldValue(field.name, {
        fileList: [...info.fileList],
        previewContent: file.url || file.preview,
      });
    }

    form.setFieldValue(field.name, {
      ...(field.value || {}),
      fileList: [...info.fileList],
    });
  };

  const renderPreviewContent = () => {
    switch (fileFormat) {
      case AUDIO:
        return <MediaPlayer src={previewContent} isShowFullScreen={false} />;
      case VIDEO:
        return <MediaPlayer src={previewContent} isVideo isShowFullScreen={false} />;

      default:
        return <ImageAntd preview={false} src={previewContent} />;
    }
  };

  const handleRemoveFile = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    form.setFieldValue(field.name, {
      fileList: [],
      previewContent: '',
    });
    if (field.name !== NFT_CREATE_FIELD.FILE_PREVIEW) {
      form.setFieldValue(NFT_CREATE_FIELD.FILE_PREVIEW, {
        fileList: [],
        previewContent: '',
      });

      form.setFieldValue(IMAGE_MEDIUM, '');
      form.setFieldValue(IMAGE_SMALL, '');
    }
  };

  return (
    <Spin spinning={loading}>
      <Dragger
        name="file"
        beforeUpload={handleBeforeUpload}
        onChange={handleFileChange}
        maxCount={MAX_FILE_NUMBER}
        multiple={false}
        showUploadList={false}
        customRequest={handleCustomRequest}
        fileList={field?.value?.fileList || []}
        className={styleLess.dragger}
        disabled={disabled || (fileFormat && fileFormat !== MEDIA.IMAGE)}
      >
        {previewContent ? (
          <div className={styleLess.dragger_preview}>
            <CloseOutlined className={styleLess.dragger_preview__icon} onClick={handleRemoveFile} />
            {renderPreviewContent()}
          </div>
        ) : (
          <>
            <UploadOutlined />
            <p className={styleLess.dragger_preview__label}>
              {intl.formatMessage({ id: 'NFT.file.upload' })}
            </p>
          </>
        )}
      </Dragger>
    </Spin>
  );
};

export default NFTUploadFile;
