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
