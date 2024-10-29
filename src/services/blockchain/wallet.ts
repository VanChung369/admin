import { WALLET_STATUS } from '@/constants/wallet';
import { NFT_TRANSACTION_STATUS } from '@/pages/nft/constants';
import { ThirdwebSDK, TransactionError } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';

const sdk = new ThirdwebSDK(Number(process.env.UMI_APP_CHAIN_ID));

export default class Wallet {
  address: string | null;

  constructor(props: any) {
    this.address = props?.address;
  }

  isAdmin = async (_account: string) => {
    try {
      const contract = await sdk.getContract(process.env.UMI_APP_PROXY_ADDRESS!);

      return await contract.call('isAdmin', [_account]);
    } catch (error) {
      return false;
    }
  };

  verifyLoginSignature = async ({
    signer,
    creator,
    cancelMetamask,
  }: {
    signer: any;
    creator: string;
    cancelMetamask: () => void;
  }) => {
    let signVerify: any = null;
    let hasnVerify = null;

    try {
      hasnVerify = ethers.utils.solidityKeccak256(['address'], [creator]);

      const signHashBytes = ethers.utils.arrayify(hasnVerify);

      if (!signer) {
        throw new Error('No signer found');
      }

      signVerify = await signer.signMessage(signHashBytes);

      return signVerify;
    } catch (error: any) {
      console.log('error : ', error);
      if (WALLET_STATUS.CANCEL_METAMASK === error?.code) {
        cancelMetamask && cancelMetamask();
      } else {
      }
    }
  };

  mintNFT = async ({
    signer,
    data,
    onCancelMetamask,
    onCallback,
    onError,
  }: {
    signer?: any;
    data?: Array<any> | any;
    onCancelMetamask?: () => void;
    onCallback?: (hash?: any) => void;
    onError?: () => void;
  }) => {
    const sdkSigner = ThirdwebSDK.fromSigner(signer, Number(process.env.UMI_APP_CHAIN_ID));
    const contract = await sdkSigner.getContract(process.env.UMI_APP_PROXY_ADDRESS!);

    try {
      const response = await contract.call('handleMintRequestByAdmin', [...data]);

      if (response?.receipt?.blockHash) {
        if (response?.receipt?.status) {
          onCallback &&
            onCallback({
              hash: response?.receipt?.transactionHash,
              status: NFT_TRANSACTION_STATUS.SUCCESS,
            });
        } else {
          onError && onError();
        }
      }
    } catch (error: any) {
      console.log('Execution reverted with reason:', error);
      if (WALLET_STATUS.CANCEL_METAMASK === error?.code) {
        onCancelMetamask && onCancelMetamask();
      } else {
        onError && onError();
      }
    }
  };
}
