export const formatPhoneNumber = (phone: string) => {
  const cleanedPhone = phone.replace(/\D/g, "");

  if (cleanedPhone.length <= 2) {
    return `(${cleanedPhone}`;
  } else if (cleanedPhone.length <= 6) {
    return `(${cleanedPhone.slice(0, 2)}) ${cleanedPhone.slice(2)}`;
  } else if (cleanedPhone.length <= 10) {
    return `(${cleanedPhone.slice(0, 2)}) ${cleanedPhone.slice(
      2,
      6
    )}-${cleanedPhone.slice(6)}`;
  } else {
    return `(${cleanedPhone.slice(0, 2)}) ${cleanedPhone.slice(
      2,
      7
    )}-${cleanedPhone.slice(7, 11)}`;
  }
};

export const unformatPhoneNumber = (formatted: string): string => {
  return formatted.replace(/\D/g, "");
};
