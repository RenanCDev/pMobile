export function isValidBirthDate(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();

  if (isNaN(date.getTime()) || date >= today) {
    return false;
  }

  const diffInYears = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  const dayDiff = today.getDate() - date.getDate();

  const isTooOld =
    diffInYears > 120 ||
    (diffInYears === 120 &&
      (monthDiff > 0 || (monthDiff === 0 && dayDiff > 0)));

  return !isTooOld;
}
