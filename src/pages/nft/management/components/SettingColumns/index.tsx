import EllipsisText from '@/components/EllipsisText';
import formatMessage from '@/components/FormatMessage';
import { LENGTH_CONSTANTS } from '@/constants';
import { useIntl } from '@umijs/max';
import { Checkbox, Col, DropdownProps, MenuProps, Row, Tooltip } from 'antd';
import { useState } from 'react';
import styleLess from './index.less';
import ButtonWrapper from '@/components/ButtonWrapper';
import DropdownWrapper from '@/components/DropdownWrapper';
import { SettingOutlined } from '@ant-design/icons';

const { MIN_COLUMNS_SELECT, MAX_COLUMNS_SELECT } = LENGTH_CONSTANTS;

const SettingColums = ({ getListColumn, listColumn, columnsItem }: any) => {
  const intl = useIntl();
  const [visible, setVisible] = useState(false);
  const [columnSelected, setColumnSelected] = useState(listColumn);

  const handleChecked = (groupChecked: any) => setColumnSelected(groupChecked);

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setVisible(nextOpen);
    }
  };

  const handleSelectColumns = () => {
    if (columnSelected.length < MIN_COLUMNS_SELECT) {
      return formatMessage({
        descriptor: { id: 'codeMessage.E6' },
        value: { column: MIN_COLUMNS_SELECT },
        type: 'error',
      });
    }

    if (columnSelected.length > MAX_COLUMNS_SELECT) {
      return formatMessage({
        descriptor: { id: 'codeMessage.E7' },
        value: { column: MAX_COLUMNS_SELECT },
        type: 'error',
      });
    }

    setVisible(false);
    getListColumn(columnSelected);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className={styleLess.setting_menu}>
          <Row className={styleLess.setting_menu__row}>
            <Col md={12}>
              <EllipsisText
                className={styleLess.setting_menu__row__label}
                text={intl.formatMessage({ id: 'NFT.management.column.setting' })}
              />
            </Col>
            <Col md={12}>
              <EllipsisText
                className={styleLess.setting_menu__row__total_selected}
                text={`${columnSelected.length} ${intl.formatMessage({ id: 'NFT.management.columns.selected' })}`}
              />
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <Checkbox.Group
                options={columnsItem}
                onChange={handleChecked}
                defaultValue={listColumn}
              />
            </Col>
          </Row>
          <ButtonWrapper
            className={styleLess.setting_menu__row__apply}
            variant="primary"
            text={intl.formatMessage({ id: 'NFT.management.columns.apply' })}
            onClick={handleSelectColumns}
          />
          <Row>
            <Col md={24} className={styleLess.setting_menu__row__warning}>
              {intl.formatMessage(
                { id: 'NFT.management.columns.warning' },
                { column: MAX_COLUMNS_SELECT },
              )}
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  return (
    <Row>
      <Col lg={6} sm={12} xs={24} className={styleLess.setting}>
        <Tooltip
          placement="topLeft"
          title={intl.formatMessage({ id: 'NFT.management.column.setting' })}
        >
          <DropdownWrapper
            menu={{ items }}
            open={visible}
            onOpenChange={handleOpenChange}
            className={styleLess.setting__dropdown}
          >
            <SettingOutlined style={{ fontSize: '18px' }} />
          </DropdownWrapper>
        </Tooltip>
      </Col>
    </Row>
  );
};

export default SettingColums;
