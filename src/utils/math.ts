export function round(num: number) {
  if (num % 1 !== 0) {
    return parseFloat(num.toFixed(2));
  }
  return num;
}
