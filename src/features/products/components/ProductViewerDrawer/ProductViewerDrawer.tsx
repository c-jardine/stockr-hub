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
import { useProduct } from "../../hooks";
import { DeleteProduct } from "../DeleteProduct";
import { UpdateProductDrawer } from "../UpdateProductDrawer";
import ProductViewerDrawerBody from "./ProductViewerDrawerBody";

/**
 * A component that renders a drawer that provides information about a product.
 */
export default function ProductViewerDrawer() {
  const product = useProduct();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { stockLevel } = product;
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
        {product.name}
      </Link>
      <Drawer isOpen={isOpen} onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader.Base>
            <DrawerHeader.CloseButton icon={ChevronLeft} />
            <DrawerHeader.Content>
              <DrawerHeader.Title>{product.name}</DrawerHeader.Title>
              <DrawerHeader.Details>
                <CategoryTags
                  categories={product.categories}
                  routePrefix="/products"
                />
              </DrawerHeader.Details>
            </DrawerHeader.Content>
          </DrawerHeader.Base>
          <DrawerBody>
            <ProductViewerDrawerBody />
          </DrawerBody>
          <DrawerFooter gap={4}>
            <DeleteProduct />
            <UpdateProductDrawer buttonLabel="Edit details" />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
