// GenericCategoriesInput.jsx
import { Box, Button, ScaleFade } from '@chakra-ui/react';

interface DeleteRowsProps {
  isVisible: boolean;
  onDeleteRows: () => void;
}

/**
 * A reusable component for creating and selecting categories.
 */
export function DeleteRows({ isVisible, onDeleteRows }: DeleteRowsProps) {
  return (
    <Box position='fixed' bottom={4} right={4}>
      <ScaleFade initialScale={0.8} in={isVisible}>
        <Button onClick={onDeleteRows}>Delete</Button>
      </ScaleFade>
    </Box>
  );
}
