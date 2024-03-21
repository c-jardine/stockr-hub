import { CategoryTags } from "@/components/CategoryTags";
import { DrawerHeader } from "@/components/DrawerHeader";
import { getIsLowStock } from "@/utils";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeft } from "tabler-icons-react";
import { DeleteMaterial, UpdateMaterialDrawer } from "..";
import { useMaterial } from "../../hooks";
import MaterialViewerDrawerBody from "./MaterialViewerDrawerBody";

export default function MaterialViewerDrawer() {
  const material = useMaterial();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { stockLevel } = material;
  const stock = Number(stockLevel.stock);
  const minStock = Number(stockLevel.minStock);

  const isLowStock = getIsLowStock(stock, minStock);

  return (
    <>
      <Link
        onClick={onOpen}
        color={isLowStock ? "red.500" : "unset"}
        fontWeight="semibold"
      >
        {material.name}
      </Link>
      <Drawer isOpen={isOpen} onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader.Base>
            <DrawerHeader.CloseButton icon={ChevronLeft} />
            <DrawerHeader.Content>
              <DrawerHeader.Title>{material.name}</DrawerHeader.Title>
              <DrawerHeader.Details>
                <CategoryTags
                  categories={material.categories}
                  routePrefix="/materials"
                />
              </DrawerHeader.Details>
            </DrawerHeader.Content>
          </DrawerHeader.Base>
          <DrawerBody>
            <MaterialViewerDrawerBody />
          </DrawerBody>
          <DrawerFooter gap={4}>
            <DeleteMaterial />
            <UpdateMaterialDrawer buttonLabel="Edit details" />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
