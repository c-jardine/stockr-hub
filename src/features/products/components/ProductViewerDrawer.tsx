import { type ProductGetAllOutputSingle } from '@/types';
import { getIsLowStock, getStockUnitTextAbbrev, round } from '@/utils';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import { ChevronLeft } from 'tabler-icons-react';
import { MaterialsUsed } from '.';
import { useViewProduct } from '../hooks';

export default function ProductViewerDrawer(props: ProductGetAllOutputSingle) {
  const {
    disclosure: { isOpen, onOpen, onClose },
  } = useViewProduct();

  const isLowStock = getIsLowStock(
    Number(props.stockLevel.stock),
    Number(props.stockLevel.minStock)
  );

  return (
    <>
      <Link
        onClick={onOpen}
        color={isLowStock ? 'red.500' : 'unset'}
        fontWeight='semibold'
      >
        {props.name}
      </Link>
      <Drawer isOpen={isOpen} onClose={onClose} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader display='flex' alignItems='flex-start'>
            <DrawerCloseButton position='relative'>
              <Icon
                as={ChevronLeft}
                boxSize={8}
                color='slate.400'
                strokeWidth={1.5}
              />
            </DrawerCloseButton>
            <Stack mt={2}>
              <Text as='h2' fontSize='xl' fontWeight='bold'>
                {props.name}
              </Text>
              <Flex gap={1}>
                {props.categories.map(({ category }) => (
                  <Tag key={category.id}>{category.name}</Tag>
                ))}
              </Flex>
            </Stack>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              <SimpleGrid columns={3} gap={4}>
                <Stack spacing={0}>
                  <Text color='slate.500' fontSize='sm'>
                    Stock Level
                  </Text>
                  <Text
                    fontSize='sm'
                    fontWeight={isLowStock ? 'semibold' : '500'}
                    color={isLowStock ? 'red.500' : 'unset'}
                  >
                    {Number(props.stockLevel.stock)}{' '}
                    {getStockUnitTextAbbrev(
                      Number(props.stockLevel.stock),
                      props.stockLevel.stockUnit
                    )}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text color='slate.500' fontSize='sm'>
                    Batch Size
                  </Text>
                  <Text fontSize='sm' fontWeight='500'>
                    {props.batchSize}{' '}
                    {getStockUnitTextAbbrev(
                      Number(props.batchSize),
                      props.stockLevel.stockUnit
                    )}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text color='slate.500' fontSize='sm'>
                    Unit Cost
                  </Text>
                  <Text fontSize='sm' fontWeight='500'>
                    $
                    {round(
                      props.materials.reduce((total, { material, ...rest }) => {
                        return (
                          total +
                          (Number(material.costPerUnit) *
                            Number(rest.quantity)) /
                            props.batchSize
                        );
                      }, 0)
                    )}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text color='slate.500' fontSize='sm'>
                    Min. Stock
                  </Text>
                  <Text fontSize='sm' fontWeight='500'>
                    {props.stockLevel.minStock
                      ? `${Number(
                          props.stockLevel.minStock
                        )} ${getStockUnitTextAbbrev(
                          Number(props.stockLevel.minStock),
                          props.stockLevel.stockUnit
                        )}`
                      : '-'}
                  </Text>
                </Stack>
              </SimpleGrid>
              <Flex gap={4}>
                {/* <UpdateMaterialDrawer {...props} buttonLabel='Edit details' /> */}
                {/* <DeleteMaterial {...props} /> */}
              </Flex>
              <Stack spacing={4}>
                <Text fontSize='lg' fontWeight='bold'>
                  Materials Used
                </Text>
                <MaterialsUsed {...props} />
              </Stack>
            </Stack>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
