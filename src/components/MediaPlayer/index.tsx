import React, { useState, useRef, useEffect } from 'react';
import cx from 'classnames';

import styleLess from './index.less';
import { PERCENTAGE_NUMBER, PERCENTAGE_SUFFIX, SECOND_NUMBER } from '@/constants';
import {
  AudioMutedOutlined,
  FullscreenOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  SoundOutlined,
} from '@ant-design/icons';

const MAX_DEGIT_NUMBER = 10;

const MediaPlayer = ({
  src,
  controllerClassName,
  isVideo,
  videoClassName,
  wrapperClassName,
  isShowFullScreen = true,
}: {
  src: any;
  controllerClassName?: any;
  isVideo?: boolean;
  videoClassName?: any;
  wrapperClassName?: any;
  isShowFullScreen?: boolean;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showController, setShowController] = useState(true);

  const audioPlayer = useRef<any>();
  const progressBar = useRef<any>();
  const animationRef = useRef<any>();

  const calculateTime = (secs: any) => {
    const minutes = Math.floor(secs / SECOND_NUMBER);
    const returnedMinutes = minutes < MAX_DEGIT_NUMBER ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % SECOND_NUMBER);
    const returnedSeconds = seconds < MAX_DEGIT_NUMBER ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const remainTime = calculateTime(duration - currentTime);
  const playTime = calculateTime(currentTime);

  const togglePlayPause = (e: any) => {
    e.preventDefault();
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    if (progressBar?.current?.value) {
      progressBar.current.value = audioPlayer?.current?.currentTime;
    }

    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar?.current?.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    const percentage = (progressBar?.current?.value / duration) * PERCENTAGE_NUMBER;
    progressBar?.current?.style?.setProperty(
      '--seek-before-width',
      `${percentage}${PERCENTAGE_SUFFIX}`,
    );
    setCurrentTime(progressBar?.current?.value);
  };

  const toggleMute = () => {
    setIsMuted((state) => !state);
  };
  const openFullscreen = () => {
    if (audioPlayer?.current?.requestFullscreen) {
      audioPlayer?.current?.requestFullscreen();
    } else if (audioPlayer?.current?.webkitRequestFullscreen) {
      audioPlayer?.current?.webkitRequestFullscreen();
    } else if (audioPlayer?.current?.msRequestFullscreen) {
      audioPlayer?.current?.msRequestFullscreen();
    }
  };

  useEffect(() => {
    const setAudioData = () => {
      const seconds = audioPlayer.current.duration;
      setDuration(seconds);
      progressBar.current.max = seconds;
    };
    audioPlayer?.current?.addEventListener('loadeddata', setAudioData);

    return () => {
      audioPlayer?.current?.removeEventListener('loadeddata', setAudioData);
    };
  }, []);

  const handleMouseOver = () => {
    setShowController(true);
  };

  const handleMouseOut = () => {
    isPlaying && setShowController(false);
  };

  return (
    <div
      className={cx(styleLess.audioPlayer, wrapperClassName)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {isVideo ? (
        <video
          onClick={togglePlayPause}
          className={cx(styleLess.video, videoClassName)}
          ref={audioPlayer}
          src={src}
          muted={isMuted}
          preload="metadata"
          loop
        />
      ) : (
        <audio ref={audioPlayer} src={src} muted={isMuted} preload="metadata" loop />
      )}

      <div
        className={cx(
          styleLess.controller,
          controllerClassName,
          isVideo && !showController && styleLess.hidden,
        )}
      >
        <button
          type="button"
          onClick={togglePlayPause}
          className={cx(styleLess.playPause, styleLess.button)}
        >
          <div className={styleLess.play}>
            {isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          </div>
        </button>

        <div className={styleLess['progress-wrap']}>
          <input
            type="range"
            className={styleLess.progressBar}
            ref={progressBar}
            onChange={changeRange}
          />
        </div>

        <div className={styleLess.duration}>
          {duration && !isNaN(duration) && duration !== Infinity ? `-${remainTime}` : playTime}
        </div>

        <button type="button" className={cx(styleLess.mute, styleLess.button)} onClick={toggleMute}>
          {isMuted ? <AudioMutedOutlined /> : <SoundOutlined />}
        </button>

        {isVideo && isShowFullScreen && (
          <button
            type="button"
            onClick={openFullscreen}
            className={cx(styleLess['full-screen'], styleLess.button)}
          >
            <FullscreenOutlined />
          </button>
        )}
      </div>
    </div>
  );
};

export default MediaPlayer;
