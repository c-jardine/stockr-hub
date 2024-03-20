import { DrawerHeader } from "@/components/DrawerHeader";
import { useAppStateContext } from "@/contexts/AppStateContext/AppStateContext";
import { getIsLowStock } from "@/utils";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  Link,
  Tooltip,
} from "@chakra-ui/react";
import { FormProvider } from "react-hook-form";
import { useProduct } from "../../hooks";
import { UpdateProductForm } from "../UpdateProductForm";
import { useUpdateProduct } from "./hooks";

export default function UpdateProductDrawer(props: { buttonLabel?: string }) {
  const appState = useAppStateContext();

  const product = useProduct();

  const {
    form,
    onSubmit,
    disclosure: { isOpen, onOpen, onClose },
  } = useUpdateProduct();

  const isLowStock = getIsLowStock(
    Number(product.stockLevel.stock),
    Number(product.stockLevel.minStock)
  );

  return (
    <>
      {props.buttonLabel ? (
        appState?.auditState.inProgress ? (
          <Tooltip label="Audit in progress">
            <Button
              isDisabled
              variant="outline"
              colorScheme="black"
              width="fit-content"
              onClick={onOpen}
            >
              {props.buttonLabel}
            </Button>
          </Tooltip>
        ) : (
          <Button
            variant="outline"
            colorScheme="black"
            width="fit-content"
            onClick={onOpen}
          >
            {props.buttonLabel}
          </Button>
        )
      ) : (
        <Link
          onClick={onOpen}
          color={isLowStock ? "red.500" : "unset"}
          fontWeight="semibold"
        >
          {product.name}
        </Link>
      )}
      <Drawer isOpen={isOpen} onClose={onClose} size="md">
        <DrawerContent>
          <DrawerHeader.Base>
            <DrawerHeader.CloseButton />
            <DrawerHeader.Content>
              <DrawerHeader.Title>Edit {product.name}</DrawerHeader.Title>
            </DrawerHeader.Content>
          </DrawerHeader.Base>
          <DrawerBody>
            <FormProvider {...form}>
              <form
                id="update-product-form"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <UpdateProductForm />
              </form>
            </FormProvider>
          </DrawerBody>
          <DrawerFooter>
            <Button type="submit" form="update-product-form">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
