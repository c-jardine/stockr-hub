import { UpdateMaterialDrawer } from '@/features/material';
import { type ProductGetAllOutputSingle } from '@/types';
import { getStockUnitTextAbbrev, round } from '@/utils';
import {
  Box,
  HStack,
  StackDivider,
  Text,
  Tooltip,
  type TextProps,
} from '@chakra-ui/react';
import React from 'react';

export default function MaterialsUsed(props: ProductGetAllOutputSingle) {
  return (
    <>
      {props.materials.map(({ material, ...rest }) => (
        <Box key={material.id} fontSize='sm'>
          <UpdateMaterialDrawer {...material} />
          <HStack
            divider={<StackDivider border='none'>&bull;</StackDivider>}
            alignItems='flex-start'
          >
            <Text color='slate.500' letterSpacing='wide'>
              {round(Number(rest.quantity) / props.batchSize)}{' '}
              {getStockUnitTextAbbrev(
                round(Number(rest.quantity) / props.batchSize),
                material.stockLevel.stockUnit
              )}{' '}
              used
            </Text>
            <Tooltip
              label={`Enough for ${Math.floor(
                Number(material.stockLevel.stock) /
                  (Number(rest.quantity) / props.batchSize)
              )} ${getStockUnitTextAbbrev(
                Math.floor(
                  Number(material.stockLevel.stock) /
                    (Number(rest.quantity) / props.batchSize)
                ),
                props.stockLevel.stockUnit
              )}`}
            >
              <CustomTooltip color='slate.500' letterSpacing='wide'>
                {Number(material.stockLevel.stock)}{' '}
                {getStockUnitTextAbbrev(
                  Number(material.stockLevel.stock),
                  material.stockLevel.stockUnit
                )}{' '}
                available
              </CustomTooltip>
            </Tooltip>
            <Text color='slate.500' letterSpacing='wide'>
              {round(
                (Number(material.costPerUnit) * Number(rest.quantity)) /
                  props.batchSize
              )}{' '}
              per unit
            </Text>
          </HStack>
        </Box>
      ))}
    </>
  );
}

const CustomTooltip = React.forwardRef<HTMLDivElement, TextProps>(
  ({ children, ...rest }, ref) => (
    <Text ref={ref} {...rest}>
      {children}
    </Text>
  )
);
