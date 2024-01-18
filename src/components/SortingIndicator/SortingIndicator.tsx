import { Box, Icon } from '@chakra-ui/react';
import { type Column } from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'tabler-icons-react';

export type SortingIndicatorProps<T> = Column<T, unknown>;

export default function SortingIndicator<T>(column: SortingIndicatorProps<T>) {
  return (
    <Box
      {...{
        onClick: column.getToggleSortingHandler(),
      }}
    >
      {{
        asc: (
          <Icon
            as={ChevronUp}
            boxSize={4}
            strokeWidth={3}
            p={0.5}
            bg='slate.200'
            color='slate.700'
            rounded='md'
            transition='150ms ease-in-out'
            _groupHover={{ bg: 'slate.300' }}
          />
        ),
        desc: (
          <Icon
            as={ChevronDown}
            boxSize={4}
            strokeWidth={3}
            p={0.5}
            bg='slate.200'
            color='slate.700'
            rounded='md'
            transition='150ms ease-in-out'
            _groupHover={{ bg: 'slate.300' }}
          />
        ),
      }[column.getIsSorted() as string] ?? null}
    </Box>
  );
}
