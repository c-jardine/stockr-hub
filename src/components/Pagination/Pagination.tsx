import { ButtonGroup, Icon, IconButton } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'tabler-icons-react';

type PaginationProps = {
  page: number;
  totalPages: number;
  prevPage: () => void;
  nextPage: () => void;
};

export default function Pagination(props: PaginationProps) {
  const { page, totalPages, prevPage, nextPage } = props;

  return (
    <ButtonGroup isAttached variant='outline'>
      <IconButton
        icon={<Icon as={ChevronLeft} />}
        aria-label='Previous page'
        onClick={prevPage}
        isDisabled={page === 1}
      />
      <IconButton
        icon={<Icon as={ChevronRight} />}
        aria-label='Next page'
        onClick={nextPage}
        isDisabled={page >= totalPages}
      />
    </ButtonGroup>
  );
}
