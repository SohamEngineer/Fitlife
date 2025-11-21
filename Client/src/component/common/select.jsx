import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

const MuiSelect = ({
  name,
  value,
  onChange,
  options = [],
  size = "small",
  
  fullWidth = true,
}) => {
  return (
    <FormControl size={size} fullWidth={fullWidth}>
      <Select
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MuiSelect;
