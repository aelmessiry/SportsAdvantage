import React from "react";
import { Tooltip } from "@mui/material";

//shared tooltip component
const WalletTooltip = ({ children, title }) => {
  return (
    <Tooltip className="" arrow placement="top" title={title}>
      {children}
    </Tooltip>
  );
};
export default WalletTooltip;
