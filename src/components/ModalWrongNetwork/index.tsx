import React, { FC } from 'react';
import { Typography, Modal, Image } from 'antd';
import { useAppSelector } from '@/hooks';
import style from './index.less';
import selectedConnection from '@/redux/connection/selector';
import { useSwitchChain } from '@thirdweb-dev/react';
import { useIntl, useModel } from '@umijs/max';
import PanBunnyIcon from '@/resources/images/pan-bunny.png';
import PolygonIcon from '@/resources/images/polygon_icon.png';
import NextIcon from '@/resources/svg/next-icon.svg';
import ROUTES_PATH from '@/constants/routesPath';
import { history } from '@umijs/max';
import { stringify } from 'querystring';
import { outLogin } from '@/services/api/auth';

const { Paragraph } = Typography;

type ModalWrongNetworkProps = {};

const ModalWrongNetwork: FC<ModalWrongNetworkProps> = () => {
  const intl = useIntl();
  const switchChain = useSwitchChain();
  const { isWrongNetwork } = useAppSelector(selectedConnection.getConnection);
  const { initialState, setInitialState } = useModel('@@initialState');

  const disconnect = async () => {
    await outLogin({}, initialState?.currentUser?.address);
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    const redirect = urlParams.get('redirect');
    if (window.location.pathname !== ROUTES_PATH.LOGIN && !redirect) {
      history.replace({
        pathname: ROUTES_PATH.LOGIN,
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };

  return (
    <Modal
      className={style.container}
      open={isWrongNetwork}
      width={400}
      footer={false}
      closable={false}
      destroyOnClose
    >
      <div className={style.wrong_network}>
        <Paragraph className={style.wrong_network__title}>
          {intl.formatMessage({
            id: 'login.wrong.network',
          })}
        </Paragraph>
        <Paragraph className={style.wrong_network__subtitle}>
          {intl.formatMessage({
            id: 'login.wrong.network.title',
          })}
        </Paragraph>
        <Paragraph className={style.wrong_network__subtitle}>
          {intl.formatMessage({
            id: 'login.wrong.network.subtitle',
          })}
        </Paragraph>
        <div className={style.wrong_network__image}>
          <Image
            className={style.wrong_network__icon}
            preview={false}
            height={150}
            width={200}
            src={PanBunnyIcon}
            alt="loading"
          />
        </div>

        <div className={style.wrong_network__switch}>
          <img className={style.wrong_network__switch_icon} src={NextIcon} alt="next" />
          <Image width={24} height={24} preview={false} src={PolygonIcon} alt="loading" />
          <Paragraph className={style.wrong_network__switch_title}>
            {intl.formatMessage({
              id: 'login.wrong.network.switch',
            })}
          </Paragraph>
        </div>

        <button
          className={style.wrong_network__switch_polygon}
          onClick={() => switchChain(Number(process.env.UMI_APP_CHAIN_ID))}
        >
          {intl.formatMessage({
            id: 'login.wrong.network.switch.polygon',
          })}
        </button>
        <button className={style.wrong_network__disconnect} onClick={disconnect}>
          {intl.formatMessage({
            id: 'login.disconnect.wallet',
          })}
        </button>
      </div>
    </Modal>
  );
};

export default ModalWrongNetwork;
