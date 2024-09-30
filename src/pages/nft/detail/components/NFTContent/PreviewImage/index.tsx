import React from 'react';
import { PreviewImageProps } from '../../../typings';
import { Image } from 'antd';
import styleLess from './index.less';

const PreviewImage = ({ src, ...props }: PreviewImageProps) => {
  return <Image className={styleLess.preview_image} src={src} {...props} />;
};

export default PreviewImage;
