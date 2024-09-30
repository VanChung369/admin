import { useIntl } from '@umijs/max';
import styleLess from './index.less';
import ButtonWrapper from '@/components/ButtonWrapper';

type NFTCreationButtonProps = {
  isSubmit: boolean;
  onDiscard: () => void;
  id?: string;
};

const NFTButton = ({ isSubmit, onDiscard, id }: NFTCreationButtonProps) => {
  const intl = useIntl();

  return (
    <div className={styleLess.nft_creation_button}>
      <ButtonWrapper
        className={styleLess.nft_creation_button__discard}
        text={intl.formatMessage({ id: 'NFT.create.button.discard' })}
        onClick={onDiscard}
        disabled={isSubmit}
      />
      <ButtonWrapper
        className={styleLess.nft_creation_button__create}
        text={
          id
            ? intl.formatMessage({ id: 'NFT.create.button.save' })
            : intl.formatMessage({ id: 'NFT.create.button.create' })
        }
        htmlType="submit"
        disabled={isSubmit}
        loading={isSubmit}
        variant="primary"
      />
    </div>
  );
};
export default NFTButton;
