import React from 'react';
import { PreviewContentProps } from '../../../typings';
import styleLess from './index.less';
import { MEDIA } from '@/constants/file';
import MediaPlayer from '@/components/MediaPlayer';

const PreviewContent = ({ type, src }: PreviewContentProps) => {
  const renderContent = () => {
    switch (type) {
      case MEDIA.AUDIO:
        return (
          <div className={styleLess.preview_content__audio}>
            <MediaPlayer src={src} wrapperClassName="audio" controllerClassName="controller" />
          </div>
        );
      case MEDIA.VIDEO:
        return (
          <MediaPlayer
            src={src}
            isVideo
            isShowFullScreen={false}
            wrapperClassName={styleLess.preview_content__video}
          />
        );

      default:
        return <MediaPlayer src={src} isVideo isShowFullScreen={false} />;
    }
  };

  return <div className={styleLess.preview_content}>{renderContent()}</div>;
};

export default PreviewContent;
