import { type ProductGetAllOutputSingle } from '@/types';
import { getStockUnitTextAbbrev, round } from '@/utils';
import { Box, Text } from '@chakra-ui/react';

export default function MaterialsUsed(props: ProductGetAllOutputSingle) {
  return (
    <>
      {props.materials.map(({ material, ...rest }) => (
        <Box key={material.id} fontSize='sm'>
          <Text fontWeight='semibold'>{material.name}</Text>
          <Text color='slate.500' letterSpacing='wide'>
            {round(Number(rest.quantity) / props.batchSize)}{' '}
            {getStockUnitTextAbbrev(
              round(Number(rest.quantity) / props.batchSize),
              material.stockLevel.stockUnit
            )}{' '}
            used &bull; {Number(material.stockLevel.stock)}{' '}
            {getStockUnitTextAbbrev(
              Number(material.stockLevel.stock),
              material.stockLevel.stockUnit
            )}{' '}
            available &bull; $
            {round(
              (Number(material.costPerUnit) * Number(rest.quantity)) /
                props.batchSize
            )}{' '}
            per unit
          </Text>
        </Box>
      ))}
    </>
  );
}
