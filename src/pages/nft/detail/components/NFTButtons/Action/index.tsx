import ButtonWrapper from '@/components/ButtonWrapper';
import DropdownWrapper from '@/components/DropdownWrapper';
import { useGetConfig } from '@/hooks/hook-customs/useGetConfig';
import { NFT_STATUS } from '@/pages/nft/constants';
import { getIpfsLink, getNumber } from '@/utils/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl, useParams } from '@umijs/max';
import { MenuProps } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import styleLess from './index.less';
import { Link } from 'umi';
import ROUTES_PATH, { EXTERNAL_URL } from '@/constants/routesPath';
import NFTDelete from '../Delete';
import cx from 'classnames';
import { DownOutlined } from '@ant-design/icons';

const NFTAction = () => {
  const intl = useIntl();
  const { id } = useParams();
  const [ipfsLink, setIpfsLink] = useState('');
  const queryClient = useQueryClient();
  const query: any = queryClient.getQueryData(['getNFT', id]);
  const { ipfsGateway } = useGetConfig();
  const totalMinted = getNumber(query?.token?.totalMinted);
  const isNftOffsale = NFT_STATUS[0].value === query?.status;
  const cid = query?.token?.cid;

  useEffect(() => {
    const fetchIpfsLink = async () => {
      if (cid) {
        const link = await getIpfsLink(cid);
        setIpfsLink(link);
      }
    };

    fetchIpfsLink();
  }, [cid]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className={styleLess.action_menu}>
          {isNftOffsale && !totalMinted && (
            <Fragment>
              <Link to={`${ROUTES_PATH.NFT_EDITION}/${id}`}>
                <div className={styleLess.action_menu__item}>
                  {intl.formatMessage({ id: 'NFT.detail.action.edit' })}
                </div>
              </Link>
              <NFTDelete NFTName={query?.name} className={styleLess.action_menu__item} />
            </Fragment>
          )}
          <a target="_blank" rel="noreferrer" href={`${ROUTES_PATH.MARKET_NFT_DETAIL}/${id}`}>
            <div className={styleLess.action_menu__item}>
              {intl.formatMessage({ id: 'NFT.detail.view.market' })}
            </div>
          </a>
          <a
            href={`${EXTERNAL_URL.POLYGON_SCAN_TOKEN}/${query?.token?.address}`}
            target="_blank"
            rel="noreferrer"
          >
            {cid ? (
              <div className={styleLess.action_menu__item}>
                {intl.formatMessage({ id: 'NFT.detail.view.ploygon' })}
              </div>
            ) : (
              <div className={cx(styleLess.action_menu__item, styleLess.action_menu__border_none)}>
                {intl.formatMessage({ id: 'NFT.detail.view.ploygon' })}
              </div>
            )}
          </a>
          {cid && (
            <a href={`${ipfsGateway}${ipfsLink}`} target="_blank" rel="noreferrer">
              <div className={cx(styleLess.action_menu__item, styleLess.action_menu__border_none)}>
                {intl.formatMessage({ id: 'NFT.detail.view.ipfs' })}
              </div>
            </a>
          )}
        </div>
      ),
    },
  ];

  return (
    <DropdownWrapper menu={{ items }} className={styleLess.action}>
      <ButtonWrapper
        variant="primary"
        className={styleLess.action__button}
        text={intl.formatMessage({ id: 'NFT.detail.more.actions' })}
        afterIcon={<DownOutlined />}
      />
    </DropdownWrapper>
  );
};

export default NFTAction;
