import { useToast } from "@chakra-ui/react";
import React from "react";
import { MaterialContext } from "../contexts";

export default function useMaterial() {
  const material = React.useContext(MaterialContext);

  const toast = useToast();

  if (material === null) {
    toast({
      title: "Unable to load material",
      description:
        "There was an error loading the material. Try refreshing the page.",
      status: "error",
    });

    throw new Error(
      "useMaterial must be used within MaterialContext.Provider."
    );
  }

  return material;
}
