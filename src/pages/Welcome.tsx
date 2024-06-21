import ButtonDesign from '@/components/ButtonDesign';
import DescriptionsDesign from '@/components/DescriptionsDesign';
import DividerDesign from '@/components/DividerDesign';
import formatMessage from '@/components/FormatMessage';
import NumberFormatDesign from '@/components/NumberFormatDesign';
import StatusDesign from '@/components/StatusDesign';
import TableDesign from '@/components/TableDesign';
import TypographyDesign from '@/components/TypographyDesign';
import { TYPE_TABLE, TYPE_TYPOGRAPHY } from '@/constants/type';
import { LikeOutlined, MenuOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProDescriptions, ProFormRadio } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import React, { useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: 'Activity Name One',
    readonly: 'Activity Name One',
    decs: 'This activity is so fun',
    state: 'open',
    created_at: '1590486176000',
    update_at: '1590486176000',
  },
  {
    id: 624691229,
    title: 'Activity Name II',
    readonly: 'Activity Name II',
    decs: 'This activity is so fun',
    state: 'closed',
    created_at: '1590481162000',
    update_at: '1590481162000',
  },
];

const data = [
  {
    key: 'key1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    index: 0,
  },
  {
    key: 'key2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    index: 1,
  },
  {
    key: 'key3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    index: 2,
  },
];

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginInlineEnd: 8 } })}
    {text}
  </span>
);

const dataSource1 = [
  {
    title: 'Sky of the sparrow',
  },
  {
    title: 'Ant Design',
  },
  {
    title: 'Ant Financial Experience Technology',
  },
  {
    title: 'TechUI',
  },
];

const Welcome: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');
  const [dataSource2, setDatasource2] = useState(data);

  const dragHandleRender = (rowData: any, idx: any) => (
    <>
      <MenuOutlined style={{ cursor: 'grab', color: 'gold' }} />
      &nbsp;{idx + 1} - {rowData.name}
    </>
  );

  const handleDragSortEnd2 = (newDataSource: any) => {
    console.log('Sorting data', newDataSource);
    setDatasource2(newDataSource);
    formatMessage({
      textMessage: 'Modify the list sort successfully',
      type: 'success',
    });
  };

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'Event name',
      dataIndex: 'title',
      tooltip: 'Only read, use Form.getFieldValue',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 1 ? [{ required: true, message: 'This is required' }] : [],
        };
      },

      editable: (text, record, index) => {
        return index !== 0;
      },
      width: '15%',
    },
    {
      title: 'Activity Name',
      dataIndex: 'readonly',
      tooltip: 'Read only, use Form.getFieldValue',
      readonly: true,
      width: '15%',
    },
    {
      title: 'state',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: 'all', status: 'Default' },
        open: {
          text: 'unsolved',
          status: 'Error',
        },
        closed: {
          text: 'solved',
          status: 'Success',
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (text, record, _, action) => [
        <StatusDesign
          key={_}
          text={record.state === 'open' ? 'unsolved' : 'solved'}
          status={record.state === 'open' ? 'error' : 'success'}
        />,
      ],
    },
    {
      title: 'describe',
      dataIndex: 'decs',
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || '', 'title']) === 'Is not fun') {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
    {
      title: 'Activity time',
      dataIndex: 'created_at',
      valueType: 'date',
    },
    {
      title: 'operate',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          edit
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          delete
        </a>,
      ],
    },
  ];

  const columns2: ProColumns[] = [
    {
      title: 'Sort',
      dataIndex: 'sort',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      className: 'drag-visible',
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
  ];
  return (
    <PageContainer>
      <ButtonDesign type={'dashed'} text={'button'} />

      <DividerDesign />

      <TypographyDesign
        typeTypography={TYPE_TYPOGRAPHY.TEXT_SUFFIX}
        text={
          'Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background application'
        }
        isShorten={true}
        editing={false}
      />
      <DividerDesign />
      <TypographyDesign
        typeTypography={TYPE_TYPOGRAPHY.TEXT_ELLIPSIS}
        text={
          'Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background application'
        }
        isShorten={true}
      />

      <DividerDesign />
      <TypographyDesign
        typeTypography={TYPE_TYPOGRAPHY.TEXT_EXPAND}
        text={
          'Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team.'
        }
      />
      <DividerDesign />
      <NumberFormatDesign value={9999999} />
      <DividerDesign />
      <TableDesign<DataSourceType, any>
        typeTable={TYPE_TABLE.EDIT_TABLE}
        rowKey="id"
        headerTitle="Editable table"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={
          position !== 'hidden'
            ? {
                position: position as 'top',
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
              }
            : false
        }
        loading={false}
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: 'Add to the top',
                value: 'top',
              },
              {
                label: 'Add to the bottom',
                value: 'bottom',
              },
              {
                label: 'hide',
                value: 'hidden',
              },
            ]}
          />,
        ]}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChangeEditTable={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey: any, data: any, row: any) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
      <DividerDesign />
      <TableDesign
        typeTable={TYPE_TABLE.SORT_TABLE}
        headerTitle="Drag and sort (custom handle)"
        columns={columns2}
        rowKey="index"
        dataSource={dataSource2}
        dragSortKey="sort"
        dragSortHandlerRender={dragHandleRender}
        onDragSortEnd={handleDragSortEnd2}
      />
      <DividerDesign />
      <TableDesign<{ title: string }, any>
        typeTable={TYPE_TABLE.TABLE_LIST}
        toolBarRender={() => {
          return [
            <Button key="3" type="primary">
              Newly built
            </Button>,
          ];
        }}
        itemLayout="vertical"
        rowKey="id"
        headerTitle="Vertical style"
        dataSource={dataSource1}
        metas={{
          title: {},
          description: {
            render: () => (
              <>
                <Tag>Sparrow column</Tag>
                <Tag>Design language</Tag>
                <Tag>Ant Financial</Tag>
              </>
            ),
          },
          actions: {
            render: () => [
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ],
          },
          extra: {
            render: () => (
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            ),
          },
          content: {
            render: () => {
              return (
                <div>
                  Duanzu signal: Ant Financial Design Platform Design.alipay.com, with the minimum
                  workload, seamlessly access the Ant Financial Ecology, provides an experience
                  solution for leapfrog design and development.Ant Financial Design Platform
                  design.alipay.com, with the minimum workload and seamlessly access the Ant
                  Financial Ecology to provide an experience solution for leapfrog design and
                  development.
                </div>
              );
            },
          },
        }}
      />
      <DividerDesign />
      <DescriptionsDesign
        title="Advanced Definition List Request Columns"
        request={async () => {
          return Promise.resolve({
            success: true,
            data: {
              id: 'This is a piece of text Columns',
              date: '20200809',
              money: '1212100',
              money2: -12345.33,
              state: 'all',
              switch: true,
              state2: 'open',
            },
          });
        }}
        columns={[
          {
            title: 'text',
            key: 'text',
            dataIndex: 'id',
          },
          {
            title: 'state',
            key: 'state',
            dataIndex: 'state',
            valueType: 'select',
            valueEnum: {
              all: { text: 'all', status: 'Default' },
              open: {
                text: 'unsolved',
                status: 'Error',
              },
              closed: {
                text: 'solved',
                status: 'Success',
              },
            },
          },
          {
            title: 'State 2',
            key: 'state2',
            dataIndex: 'state2',
          },
          {
            title: 'time',
            key: 'date',
            dataIndex: 'date',
            valueType: 'date',
          },
          {
            title: 'time',
            key: 'date',
            dataIndex: 'date',
            valueType: 'date',
            fieldProps: {
              format: 'DD.MM.YYYY',
            },
          },
          {
            title: 'switch',
            key: 'switch',
            dataIndex: 'switch',
            valueType: 'switch',
          },
          {
            title: 'money',
            key: 'money',
            dataIndex: 'money',
            valueType: 'money',
            fieldProps: {
              moneySymbol: '$',
            },
          },
          {
            title: 'Money non -symbol',
            key: 'money',
            dataIndex: 'money',
            valueType: 'money',
            fieldProps: {
              moneySymbol: false,
            },
          },
          {
            title: 'MONEY negative number is not symbol',
            key: 'money2',
            dataIndex: 'money2',
            valueType: 'money',
            fieldProps: {
              moneySymbol: false,
            },
          },
        ]}
      >
        <ProDescriptions.Item dataIndex="percent" label="percentage" valueType="percent">
          100
        </ProDescriptions.Item>
        <div>Surgery DOM</div>
      </DescriptionsDesign>
      <DividerDesign />
      <StatusDesign text="done" />
    </PageContainer>
  );
};

export default Welcome;
