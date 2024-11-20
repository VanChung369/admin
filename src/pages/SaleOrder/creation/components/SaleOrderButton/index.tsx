import { useIntl } from '@umijs/max';
import styleLess from './index.less';
import ButtonWrapper from '@/components/ButtonWrapper';

type SaleOrderCreationButtonProps = {
  isSubmit: boolean;
  onDiscard: () => void;
};

const SaleOrderButton = ({ isSubmit, onDiscard }: SaleOrderCreationButtonProps) => {
  const intl = useIntl();

  return (
    <div className={styleLess.sale_order_button}>
      <ButtonWrapper
        className={styleLess.sale_order_button__discard}
        text={intl.formatMessage({ id: 'sale.order.create.button.discard' })}
        onClick={onDiscard}
        disabled={isSubmit}
      />
      <ButtonWrapper
        className={styleLess.sale_order_button__create}
        text={intl.formatMessage({ id: 'sale.order.create.button.create' })}
        htmlType="submit"
        disabled={isSubmit}
        loading={isSubmit}
        variant="primary"
      />
    </div>
  );
};
export default SaleOrderButton;
