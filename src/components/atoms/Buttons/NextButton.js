import React from "react";
import { IconButton, ChevronRightIcon } from "native-base";

export const NextButton = (props) => (
  <IconButton icon={<ChevronRightIcon />} {...props} />
);
