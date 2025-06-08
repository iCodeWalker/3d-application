import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomizedSelect from "./customizedSelect";
import Divider from "@mui/material/Divider";
import CustomColorPicker from "./customColorPicker";

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

export default function CustomAccordion() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
            <CustomizedSelect label="Floor width" data={widthOptions} />
            <CustomizedSelect label="Floor length" data={lengthOptions} />
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
                data={widthOptions}
                width="110px"
              />
              <CustomizedSelect
                label="Tile length"
                data={lengthOptions}
                width="110px"
              />
            </div>
            <CustomizedSelect
              label="Tile depth"
              data={lengthOptions}
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
              <CustomColorPicker />
            </div>
          </div>
          <Divider />
        </AccordionDetails>
        <Divider />
      </Accordion>
    </div>
  );
}
