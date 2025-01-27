import { useEffect, useState } from 'react';
import { useIntl, useNavigate, useRequest } from 'umi';
import stylesLess from './index.less';
import { LENGTH_CONSTANTS, NOTIFICATION_EVENT, SOCKET_EVENT } from '@/constants';
import { useAppSelector } from '@/hooks';
import selectedAddress from '@/redux/address/selector';
import { FORMAT_DATE_PICKER, FORMAT_TIME_PICKER, ZERO_VALUE } from '@/constants/input';
import { useSocket } from '@/hooks/hook-customs/useSocket';
import { useGetListNotification, useSetMarkAsRead } from './hooks';
import { formatCurrency, formatDate } from '@/utils/utils';
import ROUTES_PATH from '@/constants/routesPath';
import { shortenAddress } from '@thirdweb-dev/react';
import EllipsisText from '@/components/EllipsisText';
import NotFoundNotice from '@/resources/svg/not-found-notice.svg';
import NoticeIcon from '@/resources/svg/notice-icon.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import HeaderDropdown from '../HeaderDropdown';
import { Badge } from 'antd';

const { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } = LENGTH_CONSTANTS;
const {
  ADMIN_PUT_ON_SALE,
  BUY_FROM_USER,
  ACTIVE_SELLORDER,
  DEACTIVE_SELLORDER,
  BUY_FROM_ADMIN,
  DEACTIVE_SELLORDER_ADMIN,
} = NOTIFICATION_EVENT;

const Notice: React.FC = () => {
  const intl = useIntl();
  const { address } = useAppSelector(selectedAddress.getAddress);
  const navigate = useNavigate();
  const [totalUnread, setTotalUnread] = useState(ZERO_VALUE);
  const [totalNotification, setTotalNotification] = useState(ZERO_VALUE);
  const [notices, setNotices] = useState([]) as Array<any>;
  const { listNotificationtHasNextPage, listFetchNextPage, isSuccess, data, refetch } =
    useGetListNotification({
      page: DEFAULT_PAGE,
      limit: DEFAULT_PAGE_SIZE,
    });

  const handleNotificationtSusscess = (data: any) => {
    const { docs = [], totalDocs = 0, totalUnread = 0, page } = data?.pages?.slice(-1)[0] || {};
    setNotices(page === DEFAULT_PAGE ? [...docs] : [...notices, ...docs]);
    setTotalNotification(totalDocs);
    setTotalUnread(totalUnread);
  };

  useEffect(() => {
    if (isSuccess) {
      handleNotificationtSusscess(data);
    }
  }, [isSuccess, data]);

  const handleSusscessClickNotification = (notification: any) => {
    const newListNotification = notices.map((item: any) => {
      return notification?._id === item?._id ? { ...notification, isRead: true } : item;
    });
    setTotalUnread(totalUnread > 0 ? totalUnread - 1 : totalUnread);
    setNotices(newListNotification);
  };

  const { onSetMarkAsRead } = useSetMarkAsRead({
    onSusscessClickNotification: handleSusscessClickNotification,
  });

  const handleAddNotification = (data: any) => {
    const newListNotification = [{ ...data, isRead: false }, ...notices];
    setNotices(newListNotification);
    setTotalUnread(totalUnread + 1);
  };

  useSocket({
    event: SOCKET_EVENT.NOTIFICATION,
    handleEvent: handleAddNotification,
    dependences: [totalUnread, notices],
  });

  const getMoreNotification = () => {
    if (listNotificationtHasNextPage) {
      listFetchNextPage();
    }
  };

  // useEffect(() => {
  //   if (address) {
  //     setNotices([]);
  //     refetch();
  //   }
  // }, [address, totalUnread]);

  const renderNotificationContent = (notification: any = {}) => {
    const { type, payload = {} } = notification;
    const { nftName, price, currency, buyerAddress } = payload;
    switch (type) {
      case ADMIN_PUT_ON_SALE:
        return {
          tooltipText: intl.formatMessage(
            { id: 'notification.admin.put.on.sale.tooltip' },
            {
              name: nftName,
              price: formatCurrency(price),
              currency,
            },
          ),
          text: intl.formatMessage(
            { id: 'notification.admin.put.on.sale' },
            {
              name: nftName,
              price: formatCurrency(price),
              currency,
            },
          ),
          router: `${ROUTES_PATH.NFT_DETAIL}/${notification?.nftId}`,
        };
      case BUY_FROM_USER:
      case BUY_FROM_ADMIN:
        return {
          tooltipText: intl.formatMessage(
            { id: 'notification.buy.from.user.tooltip' },
            {
              name: nftName,
              price: formatCurrency(price),
              currency,
              wallet: shortenAddress(buyerAddress),
            },
          ),
          text: intl.formatMessage(
            { id: 'notification.buy.from.user' },
            {
              name: nftName,
              price: formatCurrency(price),
              currency,
              wallet: shortenAddress(buyerAddress),
            },
          ),
          router: `${ROUTES_PATH.NFT_DETAIL}/${notification?.nftId}`,
        };
      case ACTIVE_SELLORDER:
        return {
          tooltipText: intl.formatMessage(
            { id: 'notification.active.sellorder.tooltip' },
            {
              name: nftName,
            },
          ),
          text: intl.formatMessage(
            { id: 'notification.active.sellorder' },
            {
              name: nftName,
            },
          ),
          router: `${ROUTES_PATH.NFT_DETAIL}/${notification?.nftId}`,
        };
      case DEACTIVE_SELLORDER:
        return {
          tooltipText: intl.formatMessage(
            { id: 'notification.deactivate.sellorder.tooltip' },
            {
              name: nftName,
            },
          ),
          text: intl.formatMessage(
            { id: 'notification.deactivate.sellorder' },
            {
              name: nftName,
            },
          ),
          router: `${ROUTES_PATH.NFT_DETAIL}/${notification?.nftId}`,
        };
      case DEACTIVE_SELLORDER_ADMIN:
        return {
          tooltipText: intl.formatMessage(
            { id: 'notification.deactivate.sellorder.admin.tooltip' },
            {
              name: nftName,
            },
          ),
          text: intl.formatMessage(
            { id: 'notification.deactivate.sellorder.admin' },
            {
              name: nftName,
            },
          ),
          router: `${ROUTES_PATH.NFT_DETAIL}/${notification?.nftId}`,
        };
      default:
        return {
          tooltipText: '',
          text: '',
          router: '/',
        };
    }
  };

  const handleClickNotification = (notification: any, asPath: string) => async (event: any) => {
    event.preventDefault();
    navigate(asPath);

    if (!notification?.isRead) {
      try {
        await onSetMarkAsRead(notification);
      } catch (error) {
        throw error;
      }
    }
  };

  const menu = () => (
    <div className={stylesLess.notification_card}>
      <p className={stylesLess.notification_card__title}>
        {intl.formatMessage({ id: 'notification.title' })}
      </p>
      {totalNotification > ZERO_VALUE ? (
        <InfiniteScroll
          dataLength={notices?.length}
          next={getMoreNotification}
          hasMore={notices?.length < totalNotification}
          loader={null}
          scrollableTarget="scrollableDiv"
          height="80%"
        >
          {notices?.map((notification: any) => {
            const createdDate = notification?.createdAt;
            const content = renderNotificationContent(notification);

            return (
              <div
                key={notification?._id}
                className={stylesLess.notification_card__group}
                onClick={handleClickNotification(notification, content?.router as string)}
              >
                <div className={stylesLess.notification_card__group_content}>
                  <EllipsisText
                    text={content?.text}
                    className={stylesLess.notification_card__group_content_text}
                    innerHtml
                    tooltipText={content?.tooltipText}
                  />
                  <p className={stylesLess.notification_card__group_content_sub_text}>
                    <span>{formatDate(createdDate, FORMAT_DATE_PICKER)}</span>
                    <span>{formatDate(createdDate, FORMAT_TIME_PICKER)}</span>
                  </p>
                </div>
                <div className={stylesLess.notification_card__group_content_effect}>
                  {!notification?.isRead ? (
                    <div className={stylesLess.notification_card__group_content_effect_dot} />
                  ) : null}
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      ) : (
        <div className={stylesLess.notFound}>
          <img src={NotFoundNotice} alt="not found" />
          <div>{intl.formatMessage({ id: 'notification.empty' })}</div>
        </div>
      )}
    </div>
  );

  return (
    <HeaderDropdown
      placement="bottomRight"
      overlay={menu}
      overlayClassName={stylesLess.popover}
      trigger={['click']}
    >
      <Badge className={stylesLess.notification_badge} count={totalUnread ? totalUnread : null}>
        <img src={NoticeIcon} className={stylesLess.notification_icon} />
      </Badge>
    </HeaderDropdown>
  );
};

export default Notice;
