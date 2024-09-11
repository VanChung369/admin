import { Footer } from '@/layouts';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, SelectLang, useIntl } from '@umijs/max';
import { Col, Flex, Image, Row } from 'antd';
import React, { Fragment } from 'react';
import Settings from '../../../../config/defaultSettings';
import { useAppDispatch } from '@/hooks';
import { handleSetLoadingMetamask } from '@/redux/connection/slice';
import style from './index.less';
import BackgroundLogin from '../../../resources/images/background_login.png';
import { Typography } from 'antd';
import AddToWallet from '@/components/AddToWallet';
import { WALLET_TYPE } from '@/constants/wallet';

const { Text } = Typography;

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      color: token.colorBgContainer,
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      zIndex: 99,
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleConnectMetamask = () => dispatch(handleSetLoadingMetamask(true));

  const intl = useIntl();

  return (
    <div className={style.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: 'Login page',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
        }}
      >
        <Row className={style.row} gutter={[48, 8]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Image src={BackgroundLogin} preview={false} height="100%" width="100%" />
          </Col>
          <Col className={style.col} xs={24} sm={24} md={12} lg={12} xl={12}>
            <Flex gap={8} vertical className={style.content}>
              <Text className={style.content__title}>
                {intl.formatMessage({
                  id: 'login.connectwallet',
                })}
              </Text>
              <div className={style.content__sub_title}>
                <Text className={style.content__text}>
                  {intl.formatMessage({
                    id: 'login.admin',
                  })}
                </Text>
                <br />
                <Text className={style.content__text}>
                  {intl.formatMessage({
                    id: 'login.title',
                  })}
                </Text>
              </div>
            </Flex>
            <Flex gap={20} vertical>
              <AddToWallet
                walletType={WALLET_TYPE.METAMASK}
                text={
                  <Fragment>
                    <span>
                      {intl.formatMessage({
                        id: 'login.metamask',
                      })}
                    </span>
                  </Fragment>
                }
                onClick={handleConnectMetamask}
              />
              <AddToWallet
                walletType={WALLET_TYPE.WALLET_CONNECT}
                disabled={true}
                text={
                  <Fragment>
                    <span>
                      {intl.formatMessage({
                        id: 'login.walletconnect',
                      })}
                    </span>
                  </Fragment>
                }
              />
              <AddToWallet
                walletType={WALLET_TYPE.COIN_BASE}
                disabled={true}
                text={
                  <Fragment>
                    <span>
                      {intl.formatMessage({
                        id: 'login.coinbase',
                      })}
                    </span>
                  </Fragment>
                }
              />
            </Flex>
            <Footer />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
