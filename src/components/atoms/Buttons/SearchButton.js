import React from "react";
import { IconButton, SearchIcon } from "native-base";

export const SearchButton = (props) => (
  <IconButton icon={<SearchIcon />} {...props} />
);
