import { number, object, string, ref, date, mixed, array } from 'yup';
import {
  MAX_LENGTH_DESCRIPTION,
  MAX_VALUE_ROYALTY_FEE,
  MAX_VALUE_TOTAL_SUPPLY,
  MIN_VALUE_TOTAL_SUPPLY,
  NFT_ATTRIBUTE_CREATED_FIELD,
  NFT_CREATE_FIELD,
  NFT_MINTED_FIELD,
} from '../constants';
import { MEDIA } from '@/constants/file';
import { isAddress } from '@/utils/utils';

const { NAME, ROYALTYFEE, TOTAL_SUPPLY, DESCRIPTION, FILE, FILE_PREVIEW, TYPE } = NFT_CREATE_FIELD;

const { QUANTITY, TO_ADDRESS } = NFT_MINTED_FIELD;

export const nftSchema = (intl: any) => {
  return object({
    [FILE]: object().shape({
      previewContent: string().required(
        intl.formatMessage({
          id: 'NFT.file.error.required',
        }),
      ),
    }),

    [FILE_PREVIEW]: object().when(FILE, {
      is: (val: any) => val?.fileList?.[0]?.type?.split('/')?.[0] !== MEDIA.IMAGE,
      then: (schema) =>
        object().shape({
          previewContent: string().required(
            intl.formatMessage({
              id: 'NFT.file.preview.error.required',
            }),
          ),
        }),
    }),
    [NAME]: string()
      .trim()
      .required(
        intl.formatMessage({
          id: 'NFT.name.error.required',
        }),
      ),
    [TYPE]: string()
      .nullable()
      .required(
        intl.formatMessage({
          id: 'NFT.type.error.required',
        }),
      ),
    [TOTAL_SUPPLY]: number()
      .required(
        intl.formatMessage({
          id: 'NFT.total.supply.error.required',
        }),
      )
      .min(
        MIN_VALUE_TOTAL_SUPPLY,
        intl.formatMessage(
          {
            id: 'NFT.total.supply.error.min',
          },
          { min: MIN_VALUE_TOTAL_SUPPLY },
        ),
      )
      .max(
        MAX_VALUE_TOTAL_SUPPLY,
        intl.formatMessage(
          {
            id: 'NFT.total.supply.error.max',
          },
          { max: MAX_VALUE_TOTAL_SUPPLY },
        ),
      ),
    [ROYALTYFEE]: number()
      .required(
        intl.formatMessage({
          id: 'NFT.royalty.fee.error.required',
        }),
      )
      .positive(
        intl.formatMessage({
          id: 'NFT.royalty.fee.error.positive',
        }),
      )
      .max(
        MAX_VALUE_ROYALTY_FEE,
        intl.formatMessage(
          {
            id: 'NFT.royalty.fee.error.max',
          },
          { max: MAX_VALUE_ROYALTY_FEE },
        ),
      ),
    [DESCRIPTION]: string()
      .max(
        MAX_LENGTH_DESCRIPTION,
        intl.formatMessage(
          {
            id: 'NFT.decription.error.max',
          },
          { max: MAX_LENGTH_DESCRIPTION },
        ),
      )
      .required(
        intl.formatMessage({
          id: 'NFT.decription.error.required',
        }),
      ),
    // [MYTHOLOGY]: string()
    //   .nullable()
    //   .required(
    //     intl.formatMessage({
    //       id: 'NFT.mythology.error.required',
    //     }),
    //   ),
    // [GOD]: string()
    //   .trim()
    //   .required(
    //     intl.formatMessage({
    //       id: 'NFT.god.error.required',
    //     }),
    //   ),
    // [LEVEL]: string()
    //   .nullable()
    //   .required(
    //     intl.formatMessage({
    //       id: 'NFT.level.error.required',
    //     }),
    //   ),
    // [CLASS]: string()
    //   .nullable()
    //   .required(
    //     intl.formatMessage({
    //       id: 'NFT.class.error.required',
    //     }),
    //   ),
  });
};

export const nftMintSchema = (intl: any, maxQuantity: number) => {
  return object().shape({
    [QUANTITY]: number()
      .positive(intl.formatMessage({ id: 'NFT.mint.quantity.positive' }))
      .required(intl.formatMessage({ id: 'NFT.mint.quantity.required' }))
      .max(
        maxQuantity,
        intl.formatMessage({ id: 'NFT.mint.quantity.max' }, { number: maxQuantity }),
      ),
    [TO_ADDRESS]: string()
      .trim()
      .required(intl.formatMessage({ id: 'NFT.mint.to.address.required' }))
      .test('isAddress', intl.formatMessage({ id: 'NFT.mint.is.address' }), (value: any) => {
        return isAddress(value);
      }),
  });
};
