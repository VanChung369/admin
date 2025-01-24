import { NFT_MARKET_CHANNEL } from '@/pages/nft/constants';
import ExcelJS from 'exceljs';
import moment from 'moment';

export const exportExcel = async ({ from, until, result, saleOrderType, intl }: any) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Export Data');
  const getWidthByChannel = saleOrderType == NFT_MARKET_CHANNEL[2].value ? 30 : 50;

  worksheet.columns = [
    { width: 15 },
    { width: 35 },
    { width: 25 },
    { width: 15 },
    { width: 45 },
    { width: getWidthByChannel },
    { width: 35 },
    { width: 35 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 30 },
    { width: 15 },
  ];

  const fontHeader = {
    name: 'Arial',
    bold: true,
    size: 20,
  };
  const commonFontBold = {
    name: 'Arial',
    bold: true,
    size: 16,
  };
  const commonFontNormal = {
    name: 'Arial',
    size: 14,
  };
  NFT_MARKET_CHANNEL;

  const typeSaleOrder = (saleOrderType: any) => {
    switch (saleOrderType) {
      case NFT_MARKET_CHANNEL[0].value:
        return intl.formatMessage({ id: NFT_MARKET_CHANNEL[0].name });
      case NFT_MARKET_CHANNEL[1].value:
        return intl.formatMessage({ id: NFT_MARKET_CHANNEL[1].name });
      case NFT_MARKET_CHANNEL[2].value:
        return intl.formatMessage({ id: NFT_MARKET_CHANNEL[2].name });
      default: {
        return null;
      }
    }
  };

  // create label
  worksheet.getCell('E2').value = intl.formatMessage({ id: 'revenue.export.statement' });
  worksheet.getCell('E2').font = fontHeader;

  worksheet.getCell('A4').value = intl.formatMessage({ id: 'revenue.export.marketplace' });
  worksheet.getCell('A4').font = commonFontBold;
  worksheet.getCell('A5').value = `${intl.formatMessage({ id: 'revenue.export.network' })}:`;
  worksheet.getCell('A5').font = commonFontBold;
  worksheet.getCell('A6').value = `${intl.formatMessage({ id: 'revenue.export.date' })}:`;
  worksheet.getCell('A6').font = commonFontBold;

  worksheet.getCell('B5').value = intl.formatMessage({ id: 'revenue.export.polygon.smart.chain' });
  worksheet.getCell('B5').font = commonFontNormal;
  worksheet.getCell('B6').value = moment(new Date()).format('DD-MM-YYYY');
  worksheet.getCell('B6').font = commonFontNormal;

  worksheet.getCell('E5').value = `${intl.formatMessage({ id: 'revenue.export.start.date' })}:`;
  worksheet.getCell('E5').font = commonFontBold;
  worksheet.getCell('E6').value = `${intl.formatMessage({ id: 'revenue.export.end.date' })}:`;
  worksheet.getCell('E6').font = commonFontBold;

  worksheet.getCell('F5').value = moment(from).format('DD-MM-YYYY');
  worksheet.getCell('F5').font = commonFontNormal;
  worksheet.getCell('F6').value = moment(until).format('DD-MM-YYYY');
  worksheet.getCell('F6').font = commonFontNormal;

  worksheet.getCell('H5').value = `${intl.formatMessage({ id: 'revenue.export.market.channel' })}:`;
  worksheet.getCell('H5').font = commonFontBold;

  worksheet.getCell('I5').value = typeSaleOrder(saleOrderType);
  worksheet.getCell('I5').font = commonFontNormal;

  const listData = [];
  for (let i = 0; i < result?.length; i++) {
    const isPrimarySale = result[i]?.saleOrder?.type == NFT_MARKET_CHANNEL[1].value;
    const rawData = [
      i + 1,
      moment(result[i]?.createdAt).format('DD-MM-YYYY HH:mm:ss'),
      isPrimarySale
        ? intl.formatMessage({ id: NFT_MARKET_CHANNEL[1].name })
        : intl.formatMessage({ id: NFT_MARKET_CHANNEL[2].name }),
      result[i]?.nft.code,
      result[i]?.nft?.name,
      isPrimarySale ? result[i]?.tokenIds.join(', ') : result[i]?.saleOrder?.tokenId,
      result[i]?.fromAddress,
      result[i]?.toAddress,
      result[i]?.quantity,
      result[i]?.saleOrder?.currency?.symbol,
      result[i]?.saleOrder?.unitPrice,
      result[i]?.subTotal,
      isPrimarySale ? '' : result[i]?.revenue,
      result[i]?.revenue,
    ];

    listData.push(rawData);
  }

  const columns = [
    { name: intl.formatMessage({ id: 'revenue.export.no' }) },
    { name: intl.formatMessage({ id: 'revenue.export.sale.date' }) },
    { name: intl.formatMessage({ id: 'revenue.export.market.channel.captain' }) },
    { name: intl.formatMessage({ id: 'revenue.export.nft.id' }) },
    { name: intl.formatMessage({ id: 'revenue.export.nft.name' }) },
    { name: intl.formatMessage({ id: 'revenue.export.token.id' }) },
    { name: intl.formatMessage({ id: 'revenue.export.seller.address' }) },
    { name: intl.formatMessage({ id: 'revenue.export.buyer.address' }) },
    { name: intl.formatMessage({ id: 'revenue.export.quantity' }) },
    { name: intl.formatMessage({ id: 'revenue.export.currency' }) },
    { name: intl.formatMessage({ id: 'revenue.export.price' }) },
    { name: intl.formatMessage({ id: 'revenue.export.subtotal' }) },
    { name: intl.formatMessage({ id: 'revenue.export.royalty.amount' }) },
    { name: intl.formatMessage({ id: 'revenue.export.revenue' }) },
  ];

  worksheet.addTable({
    name: 'MyTable',
    ref: 'A10',
    columns,
    rows: listData,
  });

  worksheet.eachRow(function (row: any, rowNumber: number) {
    row.eachCell((cell: any, colNumber: number) => {
      if (rowNumber == 10) {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        cell.font = {
          bold: true,
          size: 16,
        };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'd9e2f3' },
        };
        row.height = 25;
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      }

      if (rowNumber > 10) {
        if (colNumber === 6 || colNumber === 7 || colNumber === 8) {
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'left',
            wrapText: true,
          };
        } else {
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
          };
        }
        cell.font = {
          bold: false,
          size: 14,
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      }
    });
    row.commit();
  });

  return workbook.xlsx.writeBuffer();
};
