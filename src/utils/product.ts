import { type ProductGetAllOutputSingle } from '@/types';
import { roundTwoDecimals } from '.';

export function getCostPerUnit(product: ProductGetAllOutputSingle) {
  return roundTwoDecimals(
    product.materials.reduce((total, { material, ...rest }) => {
      return (
        total +
        (Number(material.costPerUnit) * Number(rest.quantity)) /
          product.batchSize
      );
    }, 0)
  );
}

export function getNetProfit(product: ProductGetAllOutputSingle) {
  const retailProfit = roundTwoDecimals(Number(product.retailPrice) - getCostPerUnit(product));
  const wholesaleProfit = roundTwoDecimals(Number(product.wholesalePrice) - getCostPerUnit(product));

  return { retailProfit, wholesaleProfit };
}

export function getProfitMargin(product: ProductGetAllOutputSingle) {
  const { retailPrice, wholesalePrice } = product;
  const { retailProfit, wholesaleProfit } = getNetProfit(product);

  const retailMargin = roundTwoDecimals(
    (retailProfit / Number(retailPrice)) * 100
  );
  const wholesaleMargin = roundTwoDecimals(
    (wholesaleProfit / Number(wholesalePrice)) * 100
  );

  return { retailMargin, wholesaleMargin };
}
