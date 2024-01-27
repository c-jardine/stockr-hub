import { getStockUnitTextAbbrev } from '@/utils';
import {
  Button,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  type UseDisclosureProps,
} from '@chakra-ui/react';
import { type StockLevel, type StockUnit } from '@prisma/client';
import {
  useFormContext,
  type FieldValues,
  type SubmitHandler,
} from 'react-hook-form';
import { Edit } from 'tabler-icons-react';
import { type Option } from '../Select';
import EditStockPopoverForm from './EditStockPopoverForm';

interface EditStockPopoverProps<T extends FieldValues> {
  disclosure: UseDisclosureProps;
  name: string;
  stockLevel: StockLevel & { stockUnit: StockUnit };
  logTypeOptions: Option[];
  getUpdatedStock: () => number;
  onSubmit: SubmitHandler<T>;
}

export default function EditStockPopover<T extends FieldValues>(
  props: EditStockPopoverProps<T>
) {
  const disclosure = props.disclosure;

  const form = useFormContext<T>();

  const renderLabel = `${Number(
    props.stockLevel.stock
  )} ${getStockUnitTextAbbrev(
    Number(props.stockLevel.stock),
    props.stockLevel.stockUnit
  )}`;

  return (
    <Popover
      placement='auto'
      isOpen={disclosure.isOpen}
      onClose={() => disclosure.onClose!()}
    >
      <PopoverTrigger>
        <Button
          variant='outline'
          size='xs'
          leftIcon={<Icon as={Edit} />}
          onClick={() => disclosure.onOpen!()}
        >
          {renderLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent shadow='xl'>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Text fontSize='md' fontWeight='semibold'>
            Update stock
          </Text>
          <Text color='slate.600' fontSize='xs'>
            {props.name}
          </Text>
        </PopoverHeader>
        <PopoverBody>
          <form
            id='update-stock-form'
            onSubmit={form.handleSubmit(props.onSubmit)}
          >
            <EditStockPopoverForm {...props} />
          </form>
        </PopoverBody>
        <PopoverFooter display='flex' justifyContent='flex-end' gap={2}>
          <Button variant='outline' onClick={() => disclosure.onClose!()}>
            Cancel
          </Button>
          <Button type='submit' form='update-stock-form'>
            Update
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
