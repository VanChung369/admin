type FormatInputValueFunction = (inputValue: string) => string;

export function noop() {}
export function returnTrue() {
  return true;
}

export function charIsNumber(char?: string) {
  return !!(char || '').match(/\d/);
}

export function isNil(val: any) {
  return val === null || val === undefined;
}

export function escapeRegExp(str: string) {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}

export function getThousandsGroupRegex(thousandsGroupStyle: string) {
  switch (thousandsGroupStyle) {
    case 'lakh':
      return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;
    case 'wan':
      return /(\d)(?=(\d{4})+(?!\d))/g;
    case 'thousand':
    default:
      return /(\d)(?=(\d{3})+(?!\d))/g;
  }
}

export function applyThousandSeparator(
  str: string,
  thousandSeparator: string,
  thousandsGroupStyle: string,
) {
  const thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle);
  let index = str.search(/[1-9]/);
  index = index === -1 ? str.length : index;
  return (
    str.substring(0, index) +
    str.substring(index, str.length).replace(thousandsGroupRegex, '$1' + thousandSeparator)
  );
}

export function splitDecimal(numStr: string, allowNegative = true) {
  const hasNagation = numStr[0] === '-';
  const addNegation = hasNagation && allowNegative;
  numStr = numStr.replace('-', '');

  const parts = numStr.split('.');
  const beforeDecimal = parts[0];
  const afterDecimal = parts[1] || '';

  return {
    beforeDecimal,
    afterDecimal,
    hasNagation,
    addNegation,
  };
}

export function fixLeadingZero(numStr?: string) {
  if (!numStr) return numStr;
  const isNegative = numStr[0] === '-';
  if (isNegative) numStr = numStr.substring(1, numStr.length);
  const parts = numStr.split('.');
  const beforeDecimal = parts[0].replace(/^0+/, '') || '0';
  const afterDecimal = parts[1] || '';

  return `${isNegative ? '-' : ''}${beforeDecimal}${afterDecimal ? `.${afterDecimal}` : ''}`;
}

export function limitToScale(numStr: string, scale: number, fixedDecimalScale: boolean) {
  let str = '';
  const filler = fixedDecimalScale ? '0' : '';
  for (let i = 0; i <= scale - 1; i++) {
    str += numStr[i] || filler;
  }
  return str;
}

function repeat(str: any, count: any) {
  return Array(count + 1).join(str);
}

export function toNumericString(num: any) {
  num += '';

  const sign = num[0] === '-' ? '-' : '';
  if (sign) num = num.substring(1);

  let [coefficient, exponent] = num.split(/[eE]/g);

  exponent = Number(exponent);

  if (!exponent) return sign + coefficient;

  coefficient = coefficient.replace('.', '');

  const decimalIndex = 1 + exponent;

  const coffiecientLn = coefficient.length;

  if (decimalIndex < 0) {
    coefficient = '0.' + repeat('0', Math.abs(decimalIndex)) + coefficient;
  } else if (decimalIndex >= coffiecientLn) {
    coefficient = coefficient + repeat('0', decimalIndex - coffiecientLn);
  } else {
    coefficient =
      (coefficient.substring(0, decimalIndex) || '0') + '.' + coefficient.substring(decimalIndex);
  }

  return sign + coefficient;
}

export function roundToPrecision(numStr: string, scale: number, fixedDecimalScale: boolean) {
  if (['', '-'].indexOf(numStr) !== -1) return numStr;

  const shoudHaveDecimalSeparator = numStr.indexOf('.') !== -1 && scale;
  const { beforeDecimal, afterDecimal, hasNagation } = splitDecimal(numStr);
  const floatValue = parseFloat(`0.${afterDecimal || '0'}`);
  const floatValueStr =
    afterDecimal.length <= scale ? toNumericString(floatValue) : floatValue.toFixed(scale);
  const roundedDecimalParts = floatValueStr.split('.');
  const intPart = beforeDecimal
    .split('')
    .reverse()
    .reduce((roundedStr, current, idx) => {
      if (roundedStr.length > idx) {
        return (
          (Number(roundedStr[0]) + Number(current)).toString() +
          roundedStr.substring(1, roundedStr.length)
        );
      }
      return current + roundedStr;
    }, roundedDecimalParts[0]);

  const decimalPart = limitToScale(
    roundedDecimalParts[1] || '',
    Math.min(scale, afterDecimal.length),
    fixedDecimalScale,
  );
  const negation = hasNagation ? '-' : '';
  const decimalSeparator = shoudHaveDecimalSeparator ? '.' : '';
  return `${negation}${intPart}${decimalSeparator}${decimalPart}`;
}

export function omit(obj: any, keyMaps: any) {
  const filteredObj = {} as any;
  Object.keys(obj).forEach((key) => {
    if (!keyMaps[key]) filteredObj[key] = obj[key];
  });
  return filteredObj;
}

export function setCaretPosition(el: any, caretPos: number) {
  el.value = el.value;

  if (el !== null) {
    if (el.createTextRange) {
      const range = el.createTextRange();
      range.move('character', caretPos);
      range.select();
      return true;
    }

    if (el.selectionStart || el.selectionStart === 0) {
      el.focus();
      el.setSelectionRange(caretPos, caretPos);
      return true;
    }

    el.focus();
    return false;
  }
}

export function findChangedIndex(prevValue: string, newValue: string) {
  let i = 0,
    j = 0;
  const prevLength = prevValue.length;
  const newLength = newValue.length;
  while (prevValue[i] === newValue[i] && i < prevLength) i++;

  while (
    prevValue[prevLength - 1 - j] === newValue[newLength - 1 - j] &&
    newLength - j > i &&
    prevLength - j > i
  ) {
    j++;
  }

  return { start: i, end: prevLength - j };
}

export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function getCurrentCaretPosition(el: any) {
  return Math.max(el.selectionStart, el.selectionEnd);
}

export function addInputMode(format: string | FormatInputValueFunction) {
  return format || !(navigator.platform && /iPhone|iPod/.test(navigator.platform));
}
