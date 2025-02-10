import { boolean, number, object, string } from 'yup';
import { MEDIA } from '@/constants/file';
import { COLLECTION_CREATE_FIELD } from '../constants';

const { NAME, STATUS, STANDARD, PROPERTIES, DESCRIPTION } = COLLECTION_CREATE_FIELD;
export const collectionSchema = (intl: any) => {
  return object({
    [NAME]: string()
      .trim()
      .required(
        intl.formatMessage({
          id: 'collection.name.error.required',
        }),
      ),
    [STATUS]: boolean().required(
      intl.formatMessage({
        id: 'collection.status.error.required',
      }),
    ),
    [STANDARD]: string().required(
      intl.formatMessage({
        id: 'collection.standard.error.required',
      }),
    ),
    [DESCRIPTION]: string().required(
      intl.formatMessage({
        id: 'collection.description.error.required',
      }),
    ),
    [PROPERTIES]: object()
      .test(
        'is-not-empty',
        intl.formatMessage({ id: 'collection.property.error.required' }),
        (value) => {
          return value && Object.keys(value).length > 0;
        },
      )
      .test(
        'is-valid-properties',
        intl.formatMessage({ id: 'collection.property.error.invalid' }),
        (value) => {
          if (!value || typeof value !== 'object') return false;

          return Object.values(value).every((prop: any) => {
            const isDisplayValid = typeof prop.display === 'string' && prop.display.trim() !== '';
            const isTypeValid = ['text', 'select'].includes(prop.type);
            const isRequiredValid = typeof prop.required === 'boolean';

            let isValueValid = true;
            if (prop.type === 'select') {
              isValueValid =
                Array.isArray(prop.value) &&
                prop.value.length > 0 &&
                prop.value.every((v: any) => typeof v.text === 'string');
            }

            return isDisplayValid && isTypeValid && isValueValid && isRequiredValid;
          });
        },
      )
      .required(intl.formatMessage({ id: 'collection.property.error.required' })),
  });
};
