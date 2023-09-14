import React from "react";
import { IconButton, ChevronLeftIcon } from "native-base";

export const BackButton = (props) => (
  <IconButton icon={<ChevronLeftIcon />} {...props} />
);
