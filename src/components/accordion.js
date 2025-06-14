import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomizedSelect from "./customizedSelect";
import Divider from "@mui/material/Divider";
import CustomColorPicker from "./customColorPicker";
import { useAppDispatch, useAppSelector } from "../lib/store/hooks";
import {
  handleFloorDimensionChange,
  handleTileAttributesChange,
  handleTileDimensionChange,
} from "../lib/store/features/building/floorSlice/floorSlice";
import { actionTypes } from "../lib/store/features/building/actionTypes";

const widthOptions = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "30", value: "30" },
  { label: "40", value: "40" },
  { label: "50", value: "50" },
  { label: "60", value: "60" },
  { label: "70", value: "70" },
];
const lengthOptions = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "30", value: "30" },
  { label: "40", value: "40" },
  { label: "50", value: "50" },
  { label: "60", value: "60" },
  { label: "70", value: "70" },
];

const tileWidthOptions = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
];

const tileLengthOptions = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
];

const tileThicknessOptions = [
  { label: "0.1", value: "0.1" },
  { label: "0.2", value: "0.2" },
  { label: "0.3", value: "0.3" },
  { label: "0.4", value: "0.4" },
  { label: "0.5", value: "0.5" },
  { label: "0.6", value: "0.6" },
  { label: "0.7", value: "0.7" },
];

export default function CustomAccordion() {
  const [expanded, setExpanded] = React.useState(false);
  const floor = useAppSelector((state) => state.floor);

  const dispatch = useAppDispatch();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFloorWidthChange = (event) => {
    dispatch(
      handleFloorDimensionChange({
        key: actionTypes.WIDTH,
        value: event.target.value,
      })
    );
  };

  const handleFloorLengthChange = (event) => {
    dispatch(
      handleFloorDimensionChange({
        key: actionTypes.LENGTH,
        value: event.target.value,
      })
    );
  };

  const handleFloorTileWidthChange = (event) => {
    dispatch(
      handleTileDimensionChange({
        key: actionTypes.TILE_WIDTH,
        value: event.target.value,
      })
    );
  };

  const handleFloorTileLengthChange = (event) => {
    dispatch(
      handleTileDimensionChange({
        key: actionTypes.TILE_LENGTH,
        value: event.target.value,
      })
    );
  };

  const handleFloorTileThicknessChange = (event) => {
    dispatch(
      handleTileDimensionChange({
        key: actionTypes.TILE_THICKNESS,
        value: event.target.value,
      })
    );
  };

  const handleFloorFillingColorChange = (value) => {
    dispatch(
      handleTileAttributesChange({
        key: actionTypes.TILE_FILLING_COLOR,
        value: value,
      })
    );
  };

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography component="span" sx={{ width: "100%", flexShrink: 0 }}>
            Floor
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <div style={{ display: "flex" }}>
            <CustomizedSelect
              label="Floor width"
              data={widthOptions}
              value={floor?.width}
              onChange={handleFloorWidthChange}
            />
            <CustomizedSelect
              label="Floor length"
              data={lengthOptions}
              value={floor?.length}
              onChange={handleFloorLengthChange}
            />
          </div>
          <div style={{ margin: "8px", marginBottom: "20px" }}>
            <Typography
              component="span"
              sx={{ width: "100%", flexShrink: 0, fontSize: "14px" }}
            >
              Tile Configuration:
            </Typography>
            <div style={{ display: "flex" }}>
              <CustomizedSelect
                label="Tile width"
                data={tileWidthOptions}
                value={floor?.tileWidth}
                onChange={handleFloorTileWidthChange}
                width="110px"
              />
              <CustomizedSelect
                label="Tile length"
                data={tileLengthOptions}
                value={floor?.tileLength}
                onChange={handleFloorTileLengthChange}
                width="110px"
              />
            </div>
            <CustomizedSelect
              label="Tile Thickness"
              data={tileThicknessOptions}
              value={floor?.tileThickness}
              onChange={handleFloorTileThicknessChange}
              width="110px"
            />
            <Typography
              component="span"
              sx={{
                width: "100%",
                flexShrink: 0,
                fontSize: "13px",
                color: "rgba(0, 0, 0, 0.6)",
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                fontWeight: "400",
                lineHeight: "23px",
                margin: "8px",
                marginBottom: "16px",
              }}
            >
              Tile filling color
            </Typography>
            <div style={{ margin: "8px" }}>
              <CustomColorPicker
                value={floor?.tileFillingColor}
                onChangeColor={handleFloorFillingColorChange}
              />
            </div>
          </div>
          <Divider />
        </AccordionDetails>
        <Divider />
      </Accordion>
    </div>
  );
}
