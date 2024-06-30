import WalletService from './walletService';

let instance: any;

export default class MetamaskService extends WalletService {
  constructor(props?: any) {
    super(props);
  }

  getInstance = () => {
    if (instance == null) {
      instance = new MetamaskService();
      instance.constructor = null;
    }
    return instance;
  };

  removeInstance = () => {
    instance = null;
  };
}
