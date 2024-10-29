import React from 'react';
import NFTAction from './Action';
import styleLess from './index.less';
import { ZERO_VALUE } from '@/constants/input';
import { useParams } from '@umijs/max';
import { useQueryClient } from '@tanstack/react-query';
import { getNumber } from '@/utils/utils';
import MintNFTButton from './Mint';

const NFTButtons = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const query: any = queryClient.getQueryData(['getNFT', id]);

  const totalMinted = getNumber(query?.token?.totalMinted);
  const totalSupply = getNumber(query?.token?.totalSupply);
  const onSaleQuantity = getNumber(query?.saleOrder?.quantity);
  const limitMinted = totalSupply - totalMinted - onSaleQuantity;

  return (
    <div className={styleLess.nft_buttons}>
      <MintNFTButton visiblity={limitMinted > ZERO_VALUE} />
      <NFTAction />
    </div>
  );
};

export default NFTButtons;
