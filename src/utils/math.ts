/**
 * Utility function that will round the given number to two decimal places if
 * it isn't a whole number.
 *
 * @param num The number to be rounded.
 * @returns The number rounded to two decimal places if it isn't whole,
 * otherwise returns the whole number.
 */
export function roundTwoDecimals(num: number) {
  if (num % 1 !== 0) {
    return parseFloat(num.toFixed(2));
  }
  return num;
}
