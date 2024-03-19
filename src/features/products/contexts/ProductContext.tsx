import { type ProductGetAllOutputSingle } from "@/types";
import React from "react";

const ProductContext = React.createContext<ProductGetAllOutputSingle | null>(
  null
);

export default ProductContext;
