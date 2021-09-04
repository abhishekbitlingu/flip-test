export const toTitleCase = (value: string): string => {
  let camelCaseString = '';
  if (value === '' || value === undefined) {
    return '';
  } else {
    for (let i = 0, len = value.length; i < len; i++) {
      const currentStr = value[i];
      let tempStr = currentStr.toUpperCase();
      if (i !== 0) {
        // convert first letter to upper case (the word is in lowercase)
        tempStr = tempStr.substr(0, 1).toLowerCase() + tempStr.substr(1);
      }
      camelCaseString += tempStr;
    }
    return camelCaseString;
  }
};

const getMonth = (monthIndex: number): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[monthIndex];
};

export const getFormatteddate = (dateString: string): string => {
  const dateComponents = dateString.split(' ');
  const date = new Date(dateComponents[0]);
  if (Object.prototype.toString.call(date) === '[object Date]') {
    if (!isNaN(date.getTime())) {
      return (
        date.getDate() +
        ' ' +
        getMonth(date.getMonth()) +
        ' ' +
        date.getFullYear()
      );
    }
  }
  return 'Date not available';
};

export const compare = (
  param1: string | number,
  param2: string | number,
): number => {
  const first = typeof param1 === 'string' ? param1.toLowerCase() : param1;
  const second = typeof param2 === 'string' ? param2.toLowerCase() : param2;
  if (first < second) {
    return -1;
  } else if (first > second) {
    return 1;
  }
  return 0;
};

export const getDatesForCompare = (
  dateStr1: string,
  dateStr2: string,
): [Date, Date] => {
  const arr1 = dateStr1.split(' ');
  const dateArr1 = arr1[0].split('-');
  const timeArr1 = arr1[1].split('-');
  const date1 = new Date(
    Number(dateArr1[0]),
    Number(dateArr1[1]) + 1,
    Number(dateArr1[2]),
    Number(timeArr1[0]),
    Number(timeArr1[1]),
    Number(timeArr1[2]),
  );
  const arr2 = dateStr2.split(' ');
  const dateArr2 = arr2[0].split('-');
  const timeArr2 = arr2[1].split('-');
  const date2 = new Date(
    Number(dateArr2[0]),
    Number(dateArr2[1]) + 1,
    Number(dateArr2[2]),
    Number(timeArr2[0]),
    Number(timeArr2[1]),
    Number(timeArr2[2]),
  );
  return [date1, date2];
};
