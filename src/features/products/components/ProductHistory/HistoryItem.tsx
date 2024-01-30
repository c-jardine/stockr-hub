import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { ArrowRight } from 'tabler-icons-react';

function MaterialHistoryItem({ children }: { children: React.ReactNode }) {
  return (
    <Box
      p={2}
      rounded='lg'
      outline='1px solid'
      outlineColor='transparent'
      transition='150ms ease-in-out'
      _hover={{
        bg: 'slate.100',
        outlineColor: 'slate.200',
      }}
    >
      {children}
    </Box>
  );
}
function Message({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function StockLevel(props: { previous: string; new: string }) {
  return (
    <Flex alignItems='center' gap={2}>
      <Text>{props.previous}</Text>
      <Icon as={ArrowRight} strokeWidth={3} color='slate.500' />
      <Text fontWeight='semibold'>{props.new}</Text>
    </Flex>
  );
}

function Date({ children }: { children: string | string[] }) {
  return (
    <Text color='slate.500' fontSize='xs'>
      {children}
    </Text>
  );
}

const HistoryItem = {
  Base: MaterialHistoryItem,
  Message,
  StockLevel,
  Date,
};

export default HistoryItem;
