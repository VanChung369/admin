import ItemWithLabel from '@/components/ItemWithLabel';
import React from 'react';
import styleLess from './index.less';

const Item = ({ title, helpText, children }: ItemProps) => {
  return (
    <div className={styleLess.overview_item}>
      <ItemWithLabel label={title} helpText={helpText} />
      {children}
    </div>
  );
};

export default Item;
