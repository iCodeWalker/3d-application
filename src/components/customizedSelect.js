import * as React from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";
import { handleFloorDimensionChange } from "../lib/store/features/building/floorSlice/floorSlice";
import { useAppDispatch, useAppSelector } from "../lib/store/hooks";
import { actionTypes } from "../lib/store/features/building/actionTypes";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2.5),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: (theme.vars ?? theme).palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 14,
    padding: "5px 26px 5px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export default function CustomizedSelect({
  label,
  data,
  onChange,
  value,
  width = "125px",
}) {
  const floor = useAppSelector((state) => state.floor);

  const dispatch = useAppDispatch();
  const handleChange = (event) => {
    onChange(event);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, width: width }} variant="standard">
        <InputLabel id="demo-customized-select-label">{label}</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={value}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {data.map((item, index) => {
            return (
              <MenuItem value={item.value} key={index}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
