import { useToast } from "@chakra-ui/react";
import React from "react";
import { ProductContext } from "../contexts";

export default function useProduct() {
  const product = React.useContext(ProductContext);

  const toast = useToast();

  if (product === null) {
    toast({
      title: "Unable to load product",
      description:
        "There was an error loading the product. Try refreshing the page.",
      status: "error",
    });

    throw new Error("useProduct must be used within ProductContext.Provider.");
  }

  return product;
}
