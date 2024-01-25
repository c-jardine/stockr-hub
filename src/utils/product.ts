import { type ProductGetAllOutputSingle } from '@/types';
import { roundTwoDecimals } from '.';

export function getCostPerUnit(
  materials: ProductGetAllOutputSingle['materials'],
  batchSize: number
) {
  return roundTwoDecimals(
    materials.reduce((total, { material, ...rest }) => {
      return (
        total +
        (Number(material.costPerUnit) * Number(rest.quantity)) / batchSize
      );
    }, 0)
  );
}
