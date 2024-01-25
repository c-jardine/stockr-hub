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
