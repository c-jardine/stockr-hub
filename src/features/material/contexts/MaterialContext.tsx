import { type MaterialGetAllOutputSingle } from "@/types";
import React from "react";

const MaterialContext = React.createContext<MaterialGetAllOutputSingle | null>(
  null
);

export default MaterialContext;
