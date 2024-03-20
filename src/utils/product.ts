import { type ProductGetAllOutputSingle } from "@/types";

export function getCostPerUnit(product: ProductGetAllOutputSingle) {
  return product.materials.reduce((total, { material, ...rest }) => {
    return (
      total +
      (Number(material.costPerUnit) * Number(rest.quantity)) / product.batchSize
    );
  }, 0);
}

export function getNetProfit(product: ProductGetAllOutputSingle) {
  const retailProfit = Number(product.retailPrice) - getCostPerUnit(product);
  const wholesaleProfit =
    Number(product.wholesalePrice) - getCostPerUnit(product);

  return { retailProfit, wholesaleProfit };
}

export function getProfitMargin(product: ProductGetAllOutputSingle) {
  const { retailPrice, wholesalePrice } = product;
  const { retailProfit, wholesaleProfit } = getNetProfit(product);

  const retailMargin = retailProfit / Number(retailPrice);
  const wholesaleMargin = wholesaleProfit / Number(wholesalePrice);

  return { retailMargin, wholesaleMargin };
}
