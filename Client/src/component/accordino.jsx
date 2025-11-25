// AccordionItem.jsx
import React from "react";
import Accordion, { accordionClasses } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";

const AccordionItem = ({ id, title, content, expanded, onChange }) => {
  const isOpen = expanded === id;

  return (
    <Accordion
      expanded={isOpen}
      onChange={onChange(id)}
      slots={{ transition: Fade }}
      slotProps={{ transition: { timeout: 400 } }}
      sx={[
        isOpen
          ? {
              [`& .${accordionClasses.region}`]: { height: "auto" },
              [`& .${accordionDetailsClasses.root}`]: { display: "block" },
            }
          : {
              [`& .${accordionClasses.region}`]: { height: 0 },
              [`& .${accordionDetailsClasses.root}`]: { display: "none" },
            },
      ]}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Typography>{content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionItem;
