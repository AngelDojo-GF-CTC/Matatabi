import React from "react";
import { IconButton, DeleteIcon } from "native-base";

export const DeleteButton = (props) => (
  <IconButton icon={<DeleteIcon />} {...props} />
);
