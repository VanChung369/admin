import { date, object } from 'yup';

export const getExportModalSchema = (intl: any) => {
  return object({
    from: date()
      .nullable()
      .required(
        intl.formatMessage({
          id: 'revenue.export.start.date,error.required',
        }),
      ),
    until: date()
      .nullable()
      .required(
        intl.formatMessage({
          id: 'revenue.export.end.date,error.required',
        }),
      ),
  });
};
