export const formatCPF = (cpf?: string) => {
  if (!cpf) return "";
  
  const cleanedCPF = cpf.replace(/\D/g, "");

  if (cleanedCPF.length <= 3) {
    return cleanedCPF;
  } else if (cleanedCPF.length <= 6) {
    return `${cleanedCPF.slice(0, 3)}.${cleanedCPF.slice(3)}`;
  } else if (cleanedCPF.length <= 9) {
    return `${cleanedCPF.slice(0, 3)}.${cleanedCPF.slice(3, 6)}.${cleanedCPF.slice(6)}`;
  } else {
    return `${cleanedCPF.slice(0, 3)}.${cleanedCPF.slice(3, 6)}.${cleanedCPF.slice(6, 9)}-${cleanedCPF.slice(9, 11)}`;
  }
};

export const removeCPFFormatting = (cpf: string) => cpf.replace(/\D/g, "");
