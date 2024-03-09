import { Input } from "@/components/Input";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus } from "tabler-icons-react";
import { z } from "zod";
import StockAdjustmentTypesTabs from "./StockAdjustmentTypesTabs";

export default function StockAdjustmentTypesHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const newAdjustmentTypeSchema = z.object({
    inventoryType: z.string(),
    name: z.string(),
    description: z.string(),
    adjustmentType: z.string(),
  });

  const form = useForm<z.infer<typeof newAdjustmentTypeSchema>>({
    resolver: zodResolver(newAdjustmentTypeSchema),
  });

  return (
    <>
      <Flex mt={12} justifyContent="space-between" alignItems="center">
        <Text as="h2" fontSize="lg" fontWeight="semibold">
          Stock adjustment types
        </Text>
        <IconButton
          variant="outline"
          size="sm"
          icon={<Plus size={16} />}
          aria-label="New stock adjustment type"
          onClick={onOpen}
        />
      </Flex>
      <Text mt={-4} color="slate.500" fontSize="sm">
        These types are used to keep log stock changes. Add or remove types to
        help you keep better track of your products and materials.
      </Text>
      <StockAdjustmentTypesTabs />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New stock adjustment type</ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Inventory item</FormLabel>
                <RadioGroup defaultValue="material">
                  <Stack spacing={4} direction="row">
                    <Radio value="material" {...form.register("inventoryType")}>
                      <Text fontSize="sm">Material</Text>
                    </Radio>
                    <Radio value="product" {...form.register("inventoryType")}>
                      <Text fontSize="sm">Product</Text>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <Input
                label="Name"
                name="name"
                register={form.register}
                error={form.formState.errors.name}
              />
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea {...form.register("description")} />
              </FormControl>
              <FormControl>
                <FormLabel>Adjustment type</FormLabel>
                <RadioGroup defaultValue="increase">
                  <Stack spacing={2}>
                    <Radio
                      value="increase"
                      {...form.register("adjustmentType")}
                    >
                      <Text fontSize="sm">Increase - Add to inventory</Text>
                    </Radio>
                    <Radio
                      value="decrease"
                      {...form.register("adjustmentType")}
                    >
                      <Text fontSize="sm">
                        Decrease - Remove from inventory
                      </Text>
                    </Radio>
                    <Radio value="set" {...form.register("adjustmentType")}>
                      <Text fontSize="sm">Set - Set custom inventory</Text>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter gap={4}>
            <Button variant="outline" colorScheme="black" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="emerald">Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
