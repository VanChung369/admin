import { boolean, number, object, string } from 'yup';
import { TAG_CREATE_FIELD } from '../constants';
import { MEDIA } from '@/constants/file';

const { NAME, STATUS, FILE, FILE_PREVIEW } = TAG_CREATE_FIELD;
export const tagSchema = (intl: any) => {
  return object({
    [FILE]: object().shape({
      previewContent: string().required(
        intl.formatMessage({
          id: 'tag.file.error.required',
        }),
      ),
    }),

    [FILE_PREVIEW]: object().when(FILE, {
      is: (val: any) => val?.fileList?.[0]?.type?.split('/')?.[0] !== MEDIA.IMAGE,
      then: (schema) =>
        object().shape({
          previewContent: string().required(
            intl.formatMessage({
              id: 'tag.file.preview.error.required',
            }),
          ),
        }),
    }),
    [NAME]: string()
      .trim()
      .required(
        intl.formatMessage({
          id: 'tag.name.error.required',
        }),
      ),
    [STATUS]: boolean().required(
      intl.formatMessage({
        id: 'tag.status.error.required',
      }),
    ),
  });
};
