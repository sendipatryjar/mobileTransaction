export const convertYears = dateStr => {
  //  Convert a string like '2020-10-04T00:00:00' into '4/Oct/2020'
  let months = [
    'January',
    'Februari',
    'Maret',
    'April',
    'May',
    'Juni',
    'July',
    'Agustus',
    'September',
    'October',
    'November',
    'Desember',
  ];
  let date = new Date(dateStr.substring(0, 10));
  let str =
    date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
  return str;
};

export const currencyFormat = (num) => {
    return `Rp${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
 };
