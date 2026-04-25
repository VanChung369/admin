import React from 'react';
import styleLess from './index.less';
import General from './General';
import SaleOrder from './SaleOrder';
import Attribute from './Attribute';

const Info = () => {
  return (
    <div className={styleLess.nft_detail_info}>
      <General />
      <SaleOrder />
      <Attribute />
    </div>
  );
};

export default Info;
