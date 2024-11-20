import { mixed, number, object, string } from 'yup';
import { SALE_ORDER_CREATE_FIELD, SALE_ORDER_CREATE_METHOD } from '../constants';
import moment from 'moment';

const { QUANTITY, UNIT_PRICE, METHOD, NFT_ID, START_DATE, END_DATE } = SALE_ORDER_CREATE_FIELD;

export const saleOrderSchema = (
  intl: any,
  maxQuantity: number,
  setStartDate: any,
  setEndDate: any,
  setErrorStartDate: any,
  setErrorEndDate: any,
  errorStartDate: boolean,
  errorEndDate: boolean,
) => {
  return object({
    [METHOD]: number()
      .nullable()
      .required(
        intl.formatMessage({
          id: 'sale.order.method.error.required',
        }),
      ),
    [QUANTITY]: number()
      .required(
        intl.formatMessage({
          id: 'sale.order.quantity.error.required',
        }),
      )
      .positive(
        intl.formatMessage({
          id: 'sale.order.quantity.error.positive',
        }),
      )
      .max(
        maxQuantity,
        intl.formatMessage(
          {
            id: 'sale.order.quantity.error.max',
          },
          { max: maxQuantity },
        ),
      ),
    [UNIT_PRICE]: number()
      .required(
        intl.formatMessage({
          id: 'sale.order.unit.price.error.required',
        }),
      )
      .positive(
        intl.formatMessage({
          id: 'sale.order.unit.price.error.positive',
        }),
      ),
    [NFT_ID]: string()
      .nullable()
      .required(
        intl.formatMessage({
          id: 'sale.order.method.nft.required',
        }),
      ),
    [START_DATE]: mixed().when(`${METHOD}`, {
      is: (value: number) => value !== SALE_ORDER_CREATE_METHOD[0].value,
      then: (schema) =>
        mixed()
          .test({
            name: 'required',
            test(value, ctx) {
              if (value) return true;
              return ctx.createError({
                message: intl.formatMessage({
                  id: 'sale.order.start.date.error.required',
                }),
              });
            },
          })
          .test({
            name: 'greaterNow',
            test(value, ctx) {
              if (moment(value) >= moment()) return true;
              return ctx.createError({
                message: intl.formatMessage({
                  id: 'sale.order.start.date.error.greater.now',
                }),
              });
            },
          })
          .when({
            is: (value: any) => {
              setStartDate(value);
              if (!value) {
                setErrorEndDate(false);
              }

              return errorStartDate;
            },
            then: (schema) =>
              mixed().test({
                name: 'greaterEndDate',
                test(value, ctx) {
                  if (ctx.parent?.[END_DATE]) {
                    if (moment(value).isSameOrBefore(moment(ctx.parent?.[END_DATE]))) return true;
                    return ctx.createError({
                      message: intl.formatMessage({
                        id: 'sale.order.start.date.error.earlier.end.date',
                      }),
                    });
                  }
                  return true;
                },
              }),
          }),
    }),
    [END_DATE]: mixed().when(`${METHOD}`, {
      is: (value: number) => value !== SALE_ORDER_CREATE_METHOD[0].value,
      then: (schema) =>
        mixed()
          .test({
            name: 'required',
            test(value, ctx) {
              if (value) return true;
              return ctx.createError({
                message: intl.formatMessage({
                  id: 'sale.order.end.date.error.required',
                }),
              });
            },
          })
          .test({
            name: 'greaterNow',
            test(value, ctx) {
              if (moment(value) >= moment()) return true;
              return ctx.createError({
                message: intl.formatMessage({
                  id: 'sale.order.end.date.error.greater.now',
                }),
              });
            },
          })
          .when({
            is: (value: any) => {
              setEndDate(value);
              if (!value) {
                setErrorStartDate(false);
              }
              return errorEndDate;
            },
            then: (schema) =>
              mixed().test({
                name: 'laterStartDate',
                test(value, ctx) {
                  if (ctx.parent?.[START_DATE]) {
                    if (moment(value).isSameOrAfter(moment(ctx.parent?.[START_DATE]))) return true;
                    return ctx.createError({
                      message: intl.formatMessage({
                        id: 'sale.order.end.date.error.later.start.date',
                      }),
                    });
                  }
                  return true;
                },
              }),
          }),
    }),
  });
};
