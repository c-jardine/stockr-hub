import {
  type MaterialGetAllOutputSingle,
  type MaterialGetHistoryOutput,
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
import HistoryItem from './HistoryItem';
import { useMaterialHistory } from './hooks';

export default function MaterialHistory(props: MaterialGetAllOutputSingle) {
  const { query } = useMaterialHistory(props.id);

  function getUpdatedStock(history: MaterialGetHistoryOutput[0]) {
    const logType = history.type.name;

    if (logType === 'Supply Order') {
      return (
        Number(history.stockLogData.prevStock) +
        Number(history.stockLogData.stock)
      );
    } else if (logType === 'Audit') {
      return Number(history.stockLogData.stock);
    } else if (logType === 'Product Testing') {
      return (
        Number(props.stockLevel.stock) - Number(history.stockLogData.stock)
      );
    } else return Number(props.stockLevel.stock);
  }

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
                <Box position='relative' fontSize='sm' pb={4}>
                  <Decoration />
                  <HistoryItem.Base>
                    <HistoryItem.Message>{event.type.name}</HistoryItem.Message>
                    <HistoryItem.StockLevel
                      previous={`${Number(
                        event.stockLogData.prevStock
                      )} ${getStockUnitTextAbbrev(
                        Number(props.stockLevel.stock),
                        props.stockLevel.stockUnit
                      )}
                      .`}
                      new={`${getUpdatedStock(event)} ${getStockUnitTextAbbrev(
                        Number(props.stockLevel.stock),
                        props.stockLevel.stockUnit
                      )}
                      .`}
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
                <Text fontWeight='semibold'>Material created</Text>
                <Text color='slate.500' fontSize='xs'>
                  {formatDistanceToNowStrict(props.createdAt)} ago
                </Text>
              </Box>
            </Stack>
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
          bg='slate.500'
        />
      )}
      <Circle
        position='absolute'
        left='50%'
        transform='translateX(-50%)'
        size={3}
        bg='slate.400'
        borderWidth={2}
        borderColor='white'
      />
    </Flex>
  );
}
