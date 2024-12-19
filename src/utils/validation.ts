export const isValidExpirationDate = (expirationDate: string): boolean => {
  const [month, year] = expirationDate.split('/').map(num => parseInt(num));
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month <= currentMonth) return false;
  return true;
};
