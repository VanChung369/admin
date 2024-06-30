import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';
import WALLET_STATUS from '@/constants/walletStatus';

const sdk = new ThirdwebSDK(Number(process.env.UMI_APP_CHAIN_ID));

export default class WalletService {
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
}
