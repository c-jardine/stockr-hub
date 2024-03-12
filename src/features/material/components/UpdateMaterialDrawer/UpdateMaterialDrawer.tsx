import { DrawerHeader } from "@/components/DrawerHeader";
import { useAppStateContext } from "@/contexts/AppStateContext/AppStateContext";
import { UpdateMaterialForm } from "@/features/material";
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
import { useMaterial } from "../../hooks";
import { useUpdateMaterial } from "./hooks";

export default function UpdateMaterialDrawer({
  buttonLabel,
}: {
  buttonLabel?: string;
}) {
  const appState = useAppStateContext();
  const material = useMaterial();

  const {
    form,
    onSubmit,
    disclosure: { isOpen, onOpen, onClose },
  } = useUpdateMaterial(material);

  const isLowStock = getIsLowStock(
    Number(material.stockLevel.stock),
    Number(material.stockLevel.minStock)
  );

  return (
    <>
      {buttonLabel ? (
        appState?.auditState.inProgress ? (
          <Tooltip label="Audit in progress">
            <Button
              isDisabled
              variant="outline"
              colorScheme="black"
              width="fit-content"
              onClick={onOpen}
            >
              {buttonLabel}
            </Button>
          </Tooltip>
        ) : (
          <Button
            variant="outline"
            colorScheme="black"
            width="fit-content"
            onClick={onOpen}
          >
            {buttonLabel}
          </Button>
        )
      ) : (
        <Link
          onClick={onOpen}
          color={isLowStock ? "red.500" : "unset"}
          fontWeight="semibold"
        >
          {material.name}
        </Link>
      )}
      <Drawer isOpen={isOpen} onClose={onClose} size="md">
        <DrawerContent>
          <DrawerHeader.Base>
            <DrawerHeader.CloseButton />
            <DrawerHeader.Content>
              <DrawerHeader.Title>Edit {material.name}</DrawerHeader.Title>
            </DrawerHeader.Content>
          </DrawerHeader.Base>
          <DrawerBody>
            <FormProvider {...form}>
              <form
                id="update-material-form"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <UpdateMaterialForm {...material} />
              </form>
            </FormProvider>
          </DrawerBody>
          <DrawerFooter>
            <Button type="submit" form="update-material-form">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
