import { Box } from '@chakra-ui/react';
import { type Header } from '@tanstack/react-table';

export type ColumnResizerProps<T> = Header<T, unknown>;

export default function ColumnResizer<T>({
  column,
  getResizeHandler,
}: ColumnResizerProps<T>) {
  return (
    <Box
      position='absolute'
      role='group'
      right={0}
      top='50%'
      rounded='lg'
      bg={column.getIsResizing() ? 'slate.200' : 'transparent'}
      transform='translateY(-50%)'
      height={6}
      p={1}
      cursor='col-resize'
      userSelect='none'
      style={{
        touchAction: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }}
      _hover={{
        bg: 'slate.200',
      }}
      {...{
        onDoubleClick: () => column.resetSize(),
        onMouseDown: getResizeHandler(),
        onTouchStart: getResizeHandler(),
      }}
    >
      <Box
        w='1px'
        h='full'
        bg={column.getIsResizing() ? 'slate.800' : 'slate.300'}
        _groupHover={{ bg: 'slate.800' }}
      />
    </Box>
  );
}
