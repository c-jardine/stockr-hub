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

export function getStockDifference(initialStock: number, finalStock: number) {
  // Calculate the difference in units
  const unitDifference = finalStock - initialStock;

  // Calculate the percentage difference
  const percentageDifference = (unitDifference / initialStock) * 100;

  return {
    unitDifference: isNaN(unitDifference) ? 0 : unitDifference,
    percentageDifference: isNaN(percentageDifference)
      ? 0
      : Number(percentageDifference.toFixed(2)), // Rounds the percentage difference to 2 decimal places
  };
}
