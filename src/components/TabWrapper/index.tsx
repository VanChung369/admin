import React from 'react';
import { Tabs } from 'antd';
import classNames from 'classnames';
import styleLess from './index.less';
import { TabsProps } from './typings';

interface Tab {
  key: string;
  tab: string;
  content: any;
  className?: string;
  [key: string]: any;
}

const TabWapper = ({ listTab, onChangeTab, className, ...props }: TabsProps) => {
  return (
    <Tabs
      className={classNames(styleLess.tab, className)}
      onChange={onChangeTab}
      items={listTab.map(({ content, key, tab }: Tab) => {
        return {
          label: tab,
          key: key,
          children: content,
        };
      })}
      {...props}
    />
  );
};

export default TabWapper;
