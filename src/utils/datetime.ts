const getDateString = (date: number | Date) => {
  if (typeof date !== 'number' && Number.isNaN(date.getTime())) {
    return new Date();
  }

  if (typeof date === 'number') {
    return new Date(date);
  }

  return date;
};

export const formatForInputDate = (date?: number | Date) => {
  return getDateString(date || new Date())
    .toISOString()
    .slice(0, 10);
};

export const formatForInputTime = (date: number | Date) => {
  return getDateString(date || new Date())
    .toISOString()
    .slice(11, 16);
};
