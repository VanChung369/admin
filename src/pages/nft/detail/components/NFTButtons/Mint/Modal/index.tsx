import ModalWrapper from '@/components/ModalWrapper';
import { useAppSelector } from '@/hooks';
import { useGetConfig } from '@/hooks/hook-customs/useGetConfig';
import { NFT_MINTED_FIELD, NFT_STANDARD } from '@/pages/nft/constants';
import selectedAddress from '@/redux/address/selector';
import { getNumber, limitMaxlengNumber } from '@/utils/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl, useParams } from '@umijs/max';
import React, { useMemo } from 'react';
import styleLess from './index.less';
import { Form, Formik } from 'formik';
import FormWrapper from '@/components/FormWrapper';
import {
  MAX_LENGTH_TOTAL_SUPPLY,
  MAX_VALUE_TOTAL_COPIES,
  TYPE_INPUT,
  ZERO_VALUE,
} from '@/constants/input';
import ButtonWrapper from '@/components/ButtonWrapper';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { WarningFilled } from '@ant-design/icons';
import { nftMintSchema } from '@/pages/nft/schema';

type MintNFTModalProps = {
  visible: boolean;
  onClose?: () => void;
  title?: string;
  onSubmit: (values?: any) => void;
};

const { QUANTITY, TO_ADDRESS } = NFT_MINTED_FIELD;

const MintNFTModal = ({ visible, onClose, title, onSubmit, ...props }: MintNFTModalProps) => {
  const intl = useIntl();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const query: any = queryClient.getQueryData(['getNFT', id]);

  const { mintingQuantityMax } = useGetConfig();
  const { address } = useAppSelector(selectedAddress.getAddress);

  const is721Standard = NFT_STANDARD[0].value === query?.token?.standard;
  const totalMinted = getNumber(query?.token?.totalMinted);
  const totalSupply = getNumber(query?.token?.totalSupply);
  const onSaleQuantity = getNumber(query?.saleOrder?.quantity);
  const maxLimit = totalSupply - totalMinted - onSaleQuantity;

  const limitMinted = useMemo(() => {
    if (is721Standard && maxLimit > mintingQuantityMax) {
      return mintingQuantityMax;
    }

    return maxLimit;
  }, [totalSupply, totalMinted, onSaleQuantity, is721Standard, mintingQuantityMax]);

  const handleSetMaxQuantity = (setFieldValue: any) => () => {
    setFieldValue(QUANTITY, limitMinted);
  };

  return (
    <ModalWrapper open={visible} width={550} onClose={onClose} {...props}>
      <div className={styleLess.mint_nft_modal}>
        <div className={styleLess.mint_nft_modal__title}>{title}</div>
        <Formik
          initialValues={{
            [QUANTITY]: '',
            [TO_ADDRESS]: address,
          }}
          onSubmit={onSubmit}
          validationSchema={nftMintSchema(intl, limitMinted)}
        >
          {({ setFieldValue, values }) => {
            const isShowWarning =
              is721Standard &&
              (values?.[QUANTITY] > mintingQuantityMax || maxLimit > mintingQuantityMax);

            return (
              <Form className={styleLess.mint_nft_modal__form}>
                <FormWrapper
                  containerClassName={styleLess.mint_nft_modal__form__input}
                  labelClassName={styleLess.mint_nft_modal__form__label}
                  typeInput={TYPE_INPUT.NUMBER}
                  label={intl.formatMessage({ id: 'NFT.mint.quantity' })}
                  decimalScale={ZERO_VALUE}
                  maxLength={MAX_VALUE_TOTAL_COPIES}
                  required
                  thousandSeparator
                  name={QUANTITY}
                  placeholder={intl.formatMessage({ id: 'NFT.mint.enter.quantity' })}
                  appendInput={
                    <ButtonWrapper
                      text={intl.formatMessage({ id: 'NFT.mint.max' })}
                      className={styleLess.mint_nft_modal__form__button_max}
                      onClick={handleSetMaxQuantity(setFieldValue)}
                      variant="primary"
                    />
                  }
                  isAllowed={limitMaxlengNumber(MAX_LENGTH_TOTAL_SUPPLY)}
                />

                <div className={styleLess.mint_nft_modal__form__sub_content}>
                  {intl.formatMessage({ id: 'NFT.mint.limit' }, { number: limitMinted })}
                  <Tooltip title={intl.formatMessage({ id: 'NFT.mint.tooltip' })}>
                    <QuestionCircleOutlined
                      className={styleLess.mint_nft_modal__form__sub_content__icon}
                    />
                  </Tooltip>
                </div>

                <FormWrapper
                  name={TO_ADDRESS}
                  label={intl.formatMessage({ id: 'NFT.mint.recipient.wallet.address' })}
                  placeholder={intl.formatMessage({
                    id: 'NFT.mint.recipient.wallet.address.placeholder',
                  })}
                  labelClassName={styleLess.mint_nft_modal__form__label}
                  containerClassName={styleLess.mint_nft_modal__form__input}
                  required
                />

                {isShowWarning && (
                  <div className={styleLess.mint_nft_modal__form__note}>
                    <WarningFilled className={styleLess.mint_nft_modal__form__note__icon} />
                    <p
                      className={styleLess.mint_nft_modal__form__note__text}
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage(
                          { id: 'NFT.mint.note' },
                          { number: mintingQuantityMax },
                        ),
                      }}
                    />
                  </div>
                )}

                <ButtonWrapper
                  htmlType="submit"
                  className={styleLess.mint_nft_modal__form__button_mint}
                  text={intl.formatMessage({ id: 'NFT.mint.proceed' })}
                  variant="primary"
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </ModalWrapper>
  );
};

export default MintNFTModal;
