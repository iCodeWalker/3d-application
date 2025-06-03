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

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
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
            <CustomizedSelect label="Width" data={widthOptions} />
            <CustomizedSelect label="Length" data={lengthOptions} />
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
      {/* <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography component="span" sx={{ width: "33%", flexShrink: 0 }}>
            Users
          </Typography>
          <Typography component="span" sx={{ color: "text.secondary" }}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography component="span" sx={{ width: "33%", flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography component="span" sx={{ color: "text.secondary" }}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography component="span" sx={{ width: "33%", flexShrink: 0 }}>
            Personal data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
