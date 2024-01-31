import {
  type ProductGetAllOutputSingle,
  type ProductGetHistoryOutput,
} from '@/types';
import { getStockUnitTextAbbrev } from '@/utils';
import {
  Box,
  Circle,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { formatDistanceToNowStrict } from 'date-fns';
import React from 'react';
import HistoryItem from './HistoryItem';
import { useProductHistory } from './hooks';

export default function ProductHistory(props: ProductGetAllOutputSingle) {
  const { query } = useProductHistory(props.id);

  const getStockDifference = (stock1: number, stock2: number): number =>
    Math.abs(stock1 - stock2);

  const renderText = (message: string, logType: string): JSX.Element => (
    <Text>
      {message}
      <Text as='span' fontWeight='semibold'>
        {logType}
      </Text>
    </Text>
  );

  const getUnit = (stock: number): string =>
    getStockUnitTextAbbrev(stock, props.stockLevel.stockUnit);

  const getMessage = (history: ProductGetHistoryOutput[0]): React.ReactNode => {
    const logType = history.type.name;
    const adjustedStock = Number(history.stockLogData.stock);
    const previousStock = Number(history.stockLogData.prevStock);

    switch (logType) {
      case 'Production':
        return renderText(
          `You created ${adjustedStock} ${getUnit(adjustedStock)}. in a `,
          'production run'
        );

      case 'Return/Restock':
        return renderText(
          `You marked ${adjustedStock} ${getUnit(adjustedStock)}. as `,
          'returned or restocked'
        );

      case 'Audit':
        if (previousStock === adjustedStock) {
          return renderText('No stock change in an ', 'audit');
        }

        const stockDifference = getStockDifference(
          previousStock,
          adjustedStock
        );
        const action = previousStock > adjustedStock ? 'removed' : 'added';

        return renderText(
          `You ${action} ${stockDifference} ${getUnit(
            stockDifference
          )}. in an `,
          'audit'
        );

      case 'Sale':
        const stockUsed = adjustedStock;
        return (
          <Text>
            You sold {stockUsed} {getUnit(stockUsed)}.
          </Text>
        );

      case 'Damage, Theft, or Loss':
        return renderText(
          `You marked ${adjustedStock} ${getUnit(adjustedStock)}. as `,
          'damaged, stolen, or lost'
        );

      default:
        return <Text>{adjustedStock}</Text>;
    }
  };

  const getUpdatedStock = (history: ProductGetHistoryOutput[0]): number => {
    const logType = history.type.name;
    const adjustedStock = Number(history.stockLogData.stock);
    const previousStock = Number(history.stockLogData.prevStock);

    switch (logType) {
      case 'Supply Order':
        return previousStock + adjustedStock;

      case 'Audit':
        return adjustedStock;

      case 'Product Testing':
        return previousStock - adjustedStock;

      default:
        return Number(props.stockLevel.stock);
    }
  };

  return (
    <Stack>
      <Tabs>
        <TabList>
          <Tab>History</Tab>
          <Tab>Supply Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack spacing={0} pl={5}>
              {query.data?.map((event) => (
                <Box role='group' position='relative' fontSize='sm' pb={4}>
                  <Decoration />
                  <HistoryItem.Base>
                    <HistoryItem.Message>
                      {getMessage(event)}
                    </HistoryItem.Message>
                    <HistoryItem.StockLevel
                      previous={`${Number(
                        event.stockLogData.prevStock
                      )} ${getStockUnitTextAbbrev(
                        Number(event.stockLogData.prevStock),
                        props.stockLevel.stockUnit
                      )}.`}
                      new={`${getUpdatedStock(event)} ${getStockUnitTextAbbrev(
                        Number(getUpdatedStock(event)),
                        props.stockLevel.stockUnit
                      )}.`}
                    />
                    <HistoryItem.Date>
                      {formatDistanceToNowStrict(event.stockLogData.createdAt)}{' '}
                      ago
                    </HistoryItem.Date>
                  </HistoryItem.Base>
                </Box>
              ))}
              <Box position='relative' fontSize='sm'>
                <Decoration hideBar />
                <Text>Created by you</Text>
                <Text color='slate.500' fontSize='xs'>
                  {formatDistanceToNowStrict(props.createdAt)} ago
                </Text>
              </Box>
            </Stack>
          </TabPanel>
          <TabPanel>
            <Text fontSize='sm' fontStyle='italic' textAlign='center'>
              Feature coming soon!
            </Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}

function Decoration({ hideBar = false }) {
  return (
    <Flex position='absolute' top={3} left={-5} h='full'>
      {!hideBar && (
        <Box
          position='absolute'
          left='50%'
          transform='translateX(-50%)'
          w='2px'
          h='full'
          bg='slate.300'
        />
      )}
      <Circle
        position='absolute'
        left='50%'
        transform='translateX(-50%)'
        size={3}
        bg='white'
        borderWidth={2}
        borderColor='slate.400'
        transition='200ms ease-in-out'
        _groupHover={{
          transform: 'translateX(-50%) scale(1.2)',
        }}
      />
    </Flex>
  );
}
