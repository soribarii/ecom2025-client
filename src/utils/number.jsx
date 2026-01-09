import numeral from "numeral";

numeral.register('locale', 'th', {
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  currency: {
    symbol: '฿',
  },
});

numeral.locale('th');

export const numberformat = (num) => {
  return numeral(num).format('$0,0');
};
