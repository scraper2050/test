import moment from 'moment';

export const formatDate = (date: string): string | undefined => {
  if (typeof date !== undefined && date !== null) {
    return moment.utc(date).format('MM/DD/YYYY');
  }
};

export const formatDateMMMDDYYYY = (date: string, isLocal?: boolean): string | undefined => {
  if (typeof date !== undefined && date !== null) {
    if (isLocal) {
      return moment(date).format('MMM DD, YYYY');
    }
    return moment.utc(date).format('MMM DD, YYYY');
  } else {
    return 'N/A'
  }
};

export const fromNow = (date: Date) => moment(date).subtract('seconds', 60)
  .fromNow();

export const formatReportDate = (date: Date) => moment(date).format('MMM. DD, YYYY');

export const formatDateYMD = (date: Date | string) => moment(date).format('YYYY-MM-DD');

export const formatDateTimeYMD = (date: Date | string) => moment(date).format('YYYY-MM-DDTHH:mm:ss');

export const formatYMDDateTime = (date: Date | string) => moment(date).format('YYYY-MM-DD HH:mm:ss');

export const formatShortDate = (date: Date) => moment(date).format('ddd, MMM. DD, YYYY');

export const formatShortDateNoDay = (date: Date | string) => moment(date).format('MMM. DD, YYYY');

export const formatShortDateNoYear = (date: Date) => moment(date).format('dddd, MMMM D');

export const formatTime = (time: Date) => moment(time).utc().format('hh:mm a');

export const formatToMilitaryTime = (time: Date) => moment(time).format('HH:mm:ss');

export const formatToMilitaryTimeWithOffset = (time: Date) => moment(time).subtract(6, 'hours').format('HH:mm:ss');

export const formatDatTimelll = (time: Date) => moment.utc(time).format('lll');

export const formatDatTimell = (time: Date) => moment.utc(time).format('ll');

export const formatISOToDateString = (date: string): string => moment(moment.utc(date).format('YYYY-MM-DDTHH:mm:ss')).toDate()
  .toString();

export const formatISOToDateStringFixedDate = (date: string): string => moment(moment.utc(date).set('date', new Date().getDate()).format('YYYY-MM-DDTHH:mm:ss')).toDate()
  .toString();

export const formatToUTC = (date: string): string => {
  if (date) {
    const timeZone = moment.parseZone().utcOffset();
    const dateObj = moment(date).subtract(timeZone, 'minutes');
    return dateObj.format('YYYY-MM-DDTHH:mm:ss');
  }
  return '';
};

export const parseISOMoment = (date: string) => {
  const offset = moment.parseZone().utcOffset();
  const dateObj = moment(date).subtract(offset, 'minutes');
  return dateObj;
}

export const parseISODate = (date: string) => {
  if (!date) return date;
  const offset = moment.parseZone().utcOffset();
  const dateObj = moment(date).subtract(offset, 'minutes').add(1, 'hours').hour(0).toDate();
  return dateObj;
  /*  const dateObj = new Date(date)
    const userTimezoneOffset = dateObj.getTimezoneOffset() * 60000;
    return new Date(dateObj.getTime() + userTimezoneOffset);*/
}

export const formatCurrency = (value: number | null | undefined, nullValue?: string) => {
  if (!value && nullValue !== undefined) return nullValue;

  const tempValue = value ? value : 0;
  const hasFrac = Math.ceil(tempValue) !== tempValue

  const formatted = (tempValue ?? 0).toLocaleString('en-US', {
    minimumFractionDigits: hasFrac ? 2 : 0,
    maximumFractionDigits: hasFrac ? 2 : 0,
    useGrouping: true,
    currency: 'USD',
    style: 'currency',
  });

  return formatted;
}

// export const formatNumber = (number: number) => {
//   return number.toLocaleString('en-US', {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//     useGrouping: true,
//   })
// }

export const formatNumber=(number : number) => {
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '\$1,')
}


export const convertMilitaryTime = (time: string) => {
  let timeAr = time.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  if (timeAr.length > 1) {
    timeAr = timeAr.slice(1); // Remove full string match value.
    timeAr[3] = Number(timeAr[0]) < 12 ? ' AM' : ' PM'; // Set AM/PM
    const hoursAsInt = parseInt(timeAr[0]);
    const hours = hoursAsInt % 12 || 12;
    timeAr[0] = hours.toString(); // Adjust hours
  }
  return timeAr.join('');
};

export const phoneNumberFormatter = (phoneNumber: string) => {
  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  return phoneNumber.replace(re, '$1-$2-$3');
};

export const phoneNumberValidator = (phoneNumber: string) => {
  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return re.test(phoneNumber);
};

export const phoneMaskedRegExp = /^\([0-9]{3}\) ?[0-9]{3}-?[0-9]{4}$/;
export const phoneRegExp = /^([0-9]{3})[0-9]{3}[0-9]{4}$/;
export const zipCodeRegExp = /^[0-9]{5}(?:-[0-9]{4})?$/;
//export const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
export const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export const digitsOnly = /^\d+$/;

export const shortenStringWithElipsis = (input: string, targetLength = 24): string => {
  if (input.length < targetLength) {
    return input
  } else {
    return `${input.slice(0, targetLength)}...`
  }
}


export const abbreviateNumber = (value: number, decimals = 2) => {

  const SYMBOLS = ['', 'K', 'M', 'B', 'T'];
  if (!value) {
    return '0';
  }

  const num = Math.abs(value);

  const p = Math.floor(Math.log10(num));
  const sym = Math.floor(p / 3);
  const smallNum = Math.abs(value / (1000 ** sym));

  const formattedNum = parseFloat(smallNum.toFixed(smallNum < 10 ? decimals : 0));

  return `${value < 0 ? '-' : ''}${formattedNum}${SYMBOLS[sym]}`;
}
