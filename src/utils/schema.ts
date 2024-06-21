import { object, string } from 'yup';

export const testSchema = () =>
  object().shape({
    name: string().trim().required('aaaaaaaaaaaaaaaaa'),
  });
