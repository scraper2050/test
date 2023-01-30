export const validateDecimalAmount = (amount: string) => {
  return (/^[0-9]*(\.)?([0-9]{1,2})?$/.test(amount)) 
}

export const replaceAmountToDecimal = (amount: string) => {
  return Number(amount.replace(/[^0-9.]/g, '')).toFixed(2)
}