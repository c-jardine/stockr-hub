import { useAppStateContext } from "@/contexts/AppStateContext/AppStateContext";
import { getStockUnitTextAbbrev } from "@/utils";
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
  Tooltip,
  type UseDisclosureProps,
} from "@chakra-ui/react";
import { type StockLevel, type StockUnit } from "@prisma/client";
import {
  useFormContext,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { Edit } from "tabler-icons-react";
import { type Option } from "../Select";
import EditStockPopoverForm from "./EditStockPopoverForm";

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
  const appState = useAppStateContext();

  const disclosure = props.disclosure;

  const form = useFormContext<T>();

  const value = Number(props.stockLevel.stock);
  const unit = getStockUnitTextAbbrev(value, props.stockLevel.stockUnit);

  const label = `${value} ${unit}.`;

  return (
    <Popover
      isLazy
      placement="auto"
      isOpen={disclosure.isOpen}
      onClose={() => disclosure.onClose!()}
    >
      <PopoverTrigger>
        {appState?.auditState.inProgress ? (
          <Tooltip label="Audit in progress">
            <Button
              isDisabled
              variant="outline"
              size="xs"
              leftIcon={<Icon as={Edit} />}
              onClick={() => disclosure.onOpen!()}
            >
              {label}
            </Button>
          </Tooltip>
        ) : (
          <Button
            variant="outline"
            size="xs"
            leftIcon={<Icon as={Edit} />}
            onClick={() => disclosure.onOpen!()}
          >
            {label}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent shadow="xl">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Text fontSize="md" fontWeight="semibold">
            Update stock
          </Text>
          <Text color="slate.600" fontSize="xs">
            {props.name}
          </Text>
        </PopoverHeader>
        <PopoverBody>
          <form
            id="update-stock-form"
            onSubmit={form.handleSubmit(props.onSubmit)}
          >
            <EditStockPopoverForm {...props} />
          </form>
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outline" onClick={() => disclosure.onClose!()}>
            Cancel
          </Button>
          <Button type="submit" form="update-stock-form">
            Update
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
