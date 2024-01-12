import { type StockUnit } from '@prisma/client';

export function getStockUnitText(stockLevel: number, stockUnit: StockUnit) {
  return Number(stockLevel) === 1
    ? stockUnit.nameSingular
    : stockUnit.namePlural;
}

export function getStockUnitTextAbbrev(
  stockLevel: number,
  stockUnit: StockUnit
) {
  return Number(stockLevel) === 1
    ? stockUnit.abbreviationSingular
    : stockUnit.abbreviationPlural;
}
