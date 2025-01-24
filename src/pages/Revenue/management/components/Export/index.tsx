import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import moment from 'moment';
import debounce from 'lodash/debounce';
import FileSaver from 'file-saver';
import { LENGTH_CONSTANTS } from '@/constants';
import { ExportModalProps } from '../../typings';
import { useIntl } from '@umijs/max';
import { FORMAT_EXPORT_DATA_DATE, REVENUE_MANAGEMENT_FIELD } from '@/pages/Revenue/constants';
import { NFT_MARKET_CHANNEL } from '@/pages/nft/constants';
import { exportExcel } from '@/pages/Revenue/hooks/export';
import ModalWrapper from '@/components/ModalWrapper';
import EllipsisText from '@/components/EllipsisText';
import styleLess from './index.less';
import { useGetExportRevenues } from '@/pages/Revenue/hooks';
import { disabledFromDate, disabledUntilDate } from '@/utils/utils';
import { isString, trim } from 'lodash';
import { TYPE_INPUT } from '@/constants/input';
import FormWrapper from '@/components/FormWrapper';
import ButtonWrapper from '@/components/ButtonWrapper';
import { getExportModalSchema } from '@/pages/Revenue/schema';

const { MAX_LIMIT } = LENGTH_CONSTANTS;

const { FROM, UNTIL, TYPE, LIMIT } = REVENUE_MANAGEMENT_FIELD;

const initialValues = {
  [FROM]: null,
  [UNTIL]: null,
  [TYPE]: null,
  [LIMIT]: MAX_LIMIT,
};

const ExportModal = ({ visible, onClose }: ExportModalProps) => {
  const intl = useIntl();
  const [params, setParams] = useState(initialValues);
  const [exportData, setExportData] = useState(false);
  const { loadingExport, successExport, dataExport } = useGetExportRevenues(
    params,
    visible,
    exportData,
  );

  const optionSelect = NFT_MARKET_CHANNEL.map((type) => ({
    ...type,
    name: intl.formatMessage({ id: type?.name }),
  }));

  const handleExecutionExport = (data: Array<any>, values: any) => {
    try {
      exportExcel({
        [FROM]: values?.[FROM],
        [UNTIL]: values?.[UNTIL],
        [TYPE]: values?.[TYPE],
        result: data,
        intl,
      })
        .then((buffer: any) => {
          FileSaver.saveAs(
            new Blob([buffer], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            }),
            `${intl.formatMessage({ id: 'revenue.management.revenue' })}_${moment(new Date()).format(FORMAT_EXPORT_DATA_DATE)}.xlsx`,
          );
        })
        .catch((err) => {});
    } catch (error) {
    } finally {
      setExportData(false);
      onClose();
    }
  };

  const handleExportData = debounce((values: any) => {
    const params = {
      [FROM]: values?.[FROM],
      [UNTIL]: values?.[UNTIL],
      [TYPE]: values?.[TYPE],
      [LIMIT]: MAX_LIMIT,
    };
    setParams({ ...initialValues, ...params });
    setExportData(true);
    if (successExport) {
      handleExecutionExport(dataExport, values);
    }
  }, 1000);

  const handleChangeField =
    (setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void, field: string) =>
    (value: string) => {
      setFieldValue(field, isString(value) ? trim(value) : value);
    };

  return (
    <ModalWrapper open={visible} width={409} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleExportData}
        validationSchema={getExportModalSchema(intl)}
      >
        {({ setFieldValue, values }) => {
          return (
            <Form>
              <div className={styleLess.export_modal}>
                <EllipsisText
                  className={styleLess.export_modal__title}
                  text={intl.formatMessage({ id: 'revenue.export.date' })}
                />
                <div className={styleLess.export_modal__body}>
                  <div className={styleLess.export_modal__body__market_channel}>
                    <EllipsisText
                      className={styleLess.export_modal__body__market_channel__text}
                      text={intl.formatMessage({ id: 'revenue.export.market.channel' })}
                    />
                    <FormWrapper
                      name={TYPE}
                      className={styleLess.export_modal__body__market_channel__type}
                      placeholder={intl.formatMessage({ id: 'revenue.management.type' })}
                      typeInput={TYPE_INPUT.SELECT}
                      options={optionSelect}
                    />
                  </div>
                  <div className={styleLess.export_modal__body__date}>
                    <EllipsisText
                      className={styleLess.export_modal__body__date__text}
                      text={intl.formatMessage({ id: 'revenue.export.date' })}
                    />
                    <div className={styleLess.export_modal__body__date__picker}>
                      <FormWrapper
                        name={FROM}
                        placeholder={intl.formatMessage({ id: 'revenue.management.start.date' })}
                        onChange={handleChangeField(setFieldValue, FROM)}
                        disabledDate={disabledFromDate(values?.[UNTIL])}
                        typeInput={TYPE_INPUT.DATE}
                      />
                      <FormWrapper
                        name={UNTIL}
                        placeholder={intl.formatMessage({ id: 'revenue.management.end.date' })}
                        onChange={handleChangeField(setFieldValue, UNTIL)}
                        disabledDate={disabledUntilDate(values?.[FROM])}
                        typeInput={TYPE_INPUT.DATE}
                      />
                    </div>
                  </div>
                </div>

                <ButtonWrapper
                  className={styleLess.export_modal__button}
                  text={intl.formatMessage({ id: 'revenue.management.export.data' })}
                  htmlType="submit"
                  variant="primary"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </ModalWrapper>
  );
};

export default ExportModal;
